import { TemplateEndpointResponse } from '@/bindings/templating/TemplateEndpointResponse';
import { Permissions } from '@/bindings/user/Permissions';
import { Roles } from '@/bindings/user/Roles';
import { RolesListResponse } from '@/bindings/user/RolesListResponse';
import DashboardLayout from '@/components/layouts/dashboard';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/pagination';
import { useGetPermissions, useGetRoles } from '@/hooks/userApi';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function RolesPermissionsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );

  const { data: rolesList } = useGetRoles(currentPage);
  const { data: permissionsList } = useGetPermissions(currentPage);

  const roleColumns: ColumnDef<Roles>[] = [
    {
      accessorKey: 'ID',
      header: 'id',
    },
    {
      accessorKey: 'Role Name',
      header: 'name',
    },
  ];

  const permissionColumns: ColumnDef<Permissions>[] = [
    {
      accessorKey: 'ID',
      header: 'id',
    },
    {
      accessorKey: 'Permission Name',
      header: 'name',
    },
  ];

  return (
    <DashboardLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            <div className="space-y-2">
              <h1
                className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}
              >
                Roles
              </h1>
            </div>
            <DataTable
              columns={roleColumns}
              data={rolesList?.data.roles || []}
            />
            <div className="mt-4 flex justify-between items-center">
              <TablePagination
                rowCount={0}
                currentPage={currentPage}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="space-y-2">
              <h1
                className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}
              >
                Permissions
              </h1>
            </div>
            <DataTable
              columns={permissionColumns}
              data={permissionsList?.data.roles || []}
            />
            <div className="mt-4 flex justify-between items-center">
              <TablePagination
                rowCount={0}
                currentPage={currentPage}
                setSearchParams={setSearchParams}
              />
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
