import { TemplateEndpointResponse } from '@/bindings/templating/TemplateEndpointResponse';
import DashboardLayout from '@/components/layouts/dashboard';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/pagination';
import { useGetTemplateList } from '@/hooks/templatingApi';
import { cn } from '@/lib/utils';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TemplateInput {
  name: string;
  default_value: string;
}

function TemplateCell({ row }: CellContext<TemplateEndpointResponse, unknown>) {
  const cellValue = row.getValue('template_inputs') as TemplateInput[];
  return (
    <>
      {cellValue.map((cell) => (
        <div className="py-1" key={cell.name}>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{`Input name: `}</p>
            <p>{cell.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">{`Default value: `}</p>
            <p>{cell.default_value}</p>
          </div>
        </div>
      ))}
    </>
  );
}

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
      cell: TemplateCell,
    },
  ];

  return (
    <DashboardLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
              Templates
            </h1>
          </div>
          <DataTable columns={columns} data={data?.data.templates || []} />
          <div className="mt-4 flex justify-between items-center">
            <TablePagination
              rowCount={0}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
