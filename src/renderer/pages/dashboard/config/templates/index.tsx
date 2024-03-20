import { TemplateEndpointResponse } from '@/bindings/templating/TemplateEndpointResponse';
import DashboardLayout from '@/components/layouts/dashboard';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/pagination';
import { useGetTemplateList } from '@/hooks/templatingApi';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TemplatesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );

  const { data } = useGetTemplateList();

  const columns: ColumnDef<TemplateEndpointResponse>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'template_inputs',
      header: 'Inputs',
    },
  ];

  return (
    <DashboardLayout>
      <main className="container flex-1 py-8">
        <DataTable columns={columns} data={data?.data.templates || []} />
        <div className="mt-4 flex justify-between items-center">
          <TablePagination
            rowCount={0}
            currentPage={currentPage}
            setSearchParams={setSearchParams}
          />
        </div>
      </main>
    </DashboardLayout>
  );
}
