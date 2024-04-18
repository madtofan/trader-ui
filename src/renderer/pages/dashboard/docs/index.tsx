import DashboardLayout from '@/components/layouts/dashboard';
import { cn } from '@/lib/utils';

export default function DocumentationsPage() {
  return (
    <DashboardLayout>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <div className="space-y-2">
            <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
              Documentations
            </h1>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
