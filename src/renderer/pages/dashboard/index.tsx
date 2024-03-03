import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  CONTEXT_KEYS,
  IB_CHANNELS,
  STORE_CHANNELS,
  IBConnection,
  Portfolio,
} from '@/../shared-types';
import DashboardLayout from '@/components/layouts/dashboard';
import { ElectronContext } from '@/components/layouts/providers';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/ui/form-input';

const formSchema = z.object({
  host: z.string().ip({ version: 'v4' }),
  port: z.coerce.number(),
});

function ConnectForm({ ibConnection }: { ibConnection?: IBConnection }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: ibConnection?.host || '',
      port: ibConnection?.port || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await window.electron.ipcRenderer.invoke(
      STORE_CHANNELS.Set,
      CONTEXT_KEYS.connectionHost,
      values.host,
    );
    await window.electron.ipcRenderer.invoke(
      STORE_CHANNELS.Set,
      CONTEXT_KEYS.connectionPort,
      values.port,
    );
    await window.electron.ipcRenderer
      .invoke(IB_CHANNELS.Connect, [])
      .then((val) => console.log(val))
      .catch((err) => console.error(err));
    await window.electron.ipcRenderer
      .invoke(IB_CHANNELS.GetPositions, [])
      .then((val) => console.log(val))
      .catch((err) => console.error(err));
  };

  const handleDisconnect = () => {
    window.electron.ipcRenderer
      .invoke(IB_CHANNELS.Disconnect, [])
      .then((val) => console.log(val))
      .catch((err) => console.log(err));
  };

  return (
    <div className="border-b mb-4">
      {ibConnection?.connected ? (
        <div className="mx-auto mb-0 pb-4 max-w-md space-y-4">
          <Button variant="default" onClick={handleDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            className="mx-auto mb-0 pb-4 max-w-md space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-3 gap-4 items-end">
              <FormInput
                label="Host IP"
                control={form.control}
                name="host"
                inputType="text"
                inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <FormInput
                label="Port"
                control={form.control}
                name="port"
                inputType="number"
                inputClassName="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
              <Button type="submit">Connect</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}

function PortfolioContent({ portfolio }: { portfolio?: Portfolio }) {
  return (
    <div>
      {portfolio?.positions.length > 0 ? (
        portfolio.positions.map((position) => (
          <div>{`${position.symbol}: ${position.avgCost}`}</div>
        ))
      ) : (
        <div>no positions</div>
      )}
    </div>
  );
}

function DashboardPage() {
  const { connection, portfolio } = useContext(ElectronContext);

  return (
    <DashboardLayout>
      <main className="container flex-1 py-8">
        <ConnectForm ibConnection={connection} />
        {connection?.connected && <PortfolioContent portfolio={portfolio} />}
      </main>
    </DashboardLayout>
  );
}

export default DashboardPage;
