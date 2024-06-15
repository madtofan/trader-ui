import { NotificationMessage } from '@/bindings/notification/NotificationMessage';
import DashboardLayout from '@/components/layouts/dashboard';
import { DataTable } from '@/components/ui/data-table';
import { TablePagination } from '@/components/ui/pagination';
import { useGetNotificationLogs } from '@/lib/hooks/notificationApi';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function NotificationPage() {
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
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
              Notifications
            </h1>
          </div>
          <DataTable columns={columns} data={data?.data.notifications || []} />
          <div className="mt-4 flex justify-between items-center">
            <TablePagination
              rowCount={Number(data?.data.count)}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
