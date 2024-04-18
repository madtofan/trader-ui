import { useContext } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/ui/form-input';
import {
  CONTEXT_KEYS,
  IBConnection,
  IB_CHANNELS,
  STORE_CHANNELS,
} from '../../../shared-types';
import { ElectronContext } from './providers';

const formSchema = z.object({
  host: z.string().ip({ version: 'v4' }),
  port: z.coerce.number(),
});

function ConnectForm({ ibConnection }: { ibConnection?: IBConnection }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: ibConnection?.host || '127.0.0.1',
      port: ibConnection?.port || 4001,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await window.electron.ipcRenderer.invoke(
      STORE_CHANNELS.Set,
      CONTEXT_KEYS.connection,
      {
        host: values.host,
        port: values.port,
      },
    );
    await window.electron.ipcRenderer
      .invoke(IB_CHANNELS.Connect, [])
      .catch((err) => console.error(err));
  };

  const handleDisconnect = () => {
    window.electron.ipcRenderer
      .invoke(IB_CHANNELS.Disconnect, [])
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {ibConnection?.connected ? (
        <div className="mx-auto mb-0 p-2 max-w-md space-y-4">
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

export default function SiteFooter() {
  const context = useContext(ElectronContext);
  const { connection, loggedIn } = context;

  return (
    <footer className="border-t md:px-8 md:py-0 ">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <Link
          to="/dashboard"
          className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left"
        >
          Built by {` ${siteConfig.author}`}. To execute the trade when
          notification occured.
        </Link>
        {loggedIn && <ConnectForm ibConnection={connection} />}
      </div>
    </footer>
  );
}
