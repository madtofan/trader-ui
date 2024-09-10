import FileManager from '@/components/file/FileManager';
import FlowEditor from '@/components/flow/FlowEditor';
import DashboardLayout from '@/components/layouts/dashboard';

export default function WorkflowPage() {
  return (
    <DashboardLayout>
      <main className="flex flex-col h-[calc(100vh-10rem)] py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="px-5 h-full w-full overflow-auto">
          <FlowEditor />
          <FileManager />
        </div>
      </main>
    </DashboardLayout>
  );
}
