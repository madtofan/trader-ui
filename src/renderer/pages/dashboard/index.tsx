import { useContext, useEffect, useMemo, useState } from 'react';
import {
  CONTEXT_KEYS,
  IB_CHANNELS,
  STORE_CHANNELS,
  Account,
  AccountSummaryClass,
  AccountSummary,
  Config,
} from '@/../shared-types';
import DashboardLayout from '@/components/layouts/dashboard';
import { ElectronContext } from '@/components/layouts/providers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { ScrollArea } from '@/components/ui/scroll-area';

function AccountContent({
  account,
  config,
}: {
  account?: Account;
  config?: Config;
}) {
  const [summaryKeys, setSummaryKeys] = useState<Array<keyof AccountSummary>>(
    config?.accountSummaryKeys || [],
  );

  useEffect(() => {
    window.electron.ipcRenderer
      .invoke(IB_CHANNELS.GetPositions, [])
      .catch((err) => console.error(err));

    window.electron.ipcRenderer
      .invoke(IB_CHANNELS.GetAccountSummary, [])
      .catch((err) => console.error(err));
  }, []);

  const accountSummaryKeys = useMemo(() => {
    return Object.keys(new AccountSummaryClass()) as Array<
      keyof AccountSummary
    >;
  }, []);

  const showAccountDetails = useMemo(() => {
    return summaryKeys.map((key) => (
      <div className="flex justify-between items-center" key={key}>
        <p className="text-sm text-muted-foreground">{`${key}`}</p>
        <p>{`${account?.summary?.[key]}`}</p>
      </div>
    ));
  }, [account?.summary, summaryKeys]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <div>Account Summary</div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Info <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <ScrollArea className="h-72 w-48 rounded-md">
                      {accountSummaryKeys.map((key) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={key}
                            className="capitalize"
                            checked={summaryKeys.includes(key)}
                            onCheckedChange={(value) => {
                              const newSummaryKeys = value
                                ? [...summaryKeys, key]
                                : summaryKeys.filter((k) => k !== key);
                              setSummaryKeys(newSummaryKeys);
                              window.electron.ipcRenderer.invoke(
                                STORE_CHANNELS.Set,
                                CONTEXT_KEYS.configAccountSummaryKeys,
                                newSummaryKeys,
                              );
                            }}
                          >
                            {key}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                    </ScrollArea>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardTitle>
            <CardDescription>{`${account?.summary?.AccountOrGroup}`}</CardDescription>
          </CardHeader>
          <CardContent>{showAccountDetails}</CardContent>
        </Card>
      </div>
      {account?.positions?.map((position) => (
        <Card key={position.symbol}>
          <CardHeader>
            <CardTitle>{position.symbol}</CardTitle>
            <CardDescription>{`Count: ${position.count}`}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{`Average Price: `}</p>
              <p>{position.avgCost}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{`Total Cost: `}</p>
              <p>{position.count * position.avgCost}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function DashboardPage() {
  const context = useContext(ElectronContext);
  const { connection, account, config } = context;

  return (
    <DashboardLayout>
      <main className="container flex-1 py-8">
        {connection?.connected ? (
          <AccountContent account={account} config={config} />
        ) : (
          <div>Interactive Broker Client is not connected</div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default DashboardPage;
