import FlowEditor from '@/components/flow/FlowEditor';
import DashboardLayout from '@/components/layouts/dashboard';

export default function WorkflowPage() {
  return (
    <DashboardLayout>
      <main className="relative h-[calc(100vh-10rem)] py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="border mx-auto w-full min-w-0 h-full">
          <div style={{ width: '100%', height: '100%' }}>
            <FlowEditor />
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
