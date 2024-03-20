import { NotificationMessage } from '@/bindings/notification/NotificationMessage';
import DashboardLayout from '@/components/layouts/dashboard';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/pagination';
import { useGetNotificationLogs } from '@/hooks/notificationApi';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function ConfigPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = useMemo(
    () => parseInt(searchParams.get('page') || '1', 10),
    [searchParams],
  );

  const { data } = useGetNotificationLogs(currentPage);

  const columns: ColumnDef<NotificationMessage>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'datetime',
      header: 'Date',
    },
    {
      accessorKey: 'channel',
      header: 'Channel',
    },
    {
      accessorKey: 'title',
      header: 'Title',
    },
    {
      accessorKey: 'message',
      header: 'Message',
    },
  ];

  return (
    <DashboardLayout>
      <main className="container flex-1 py-8">
        <DataTable columns={columns} data={data?.data.notifications || []} />
        <div className="mt-4 flex justify-between items-center">
          <TablePagination
            rowCount={Number(data?.data.count)}
            currentPage={currentPage}
            setSearchParams={setSearchParams}
          />
        </div>
      </main>
    </DashboardLayout>
  );
}
