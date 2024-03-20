export type IBConnection = {
  connected?: boolean;
  host?: string;
  port?: number;
};

export type Position = {
  symbol: string;
  avgCost: number;
  count: number;
};

export class AccountSummaryClass {
  Currency = '';

  CashBalance = '';

  TotalCashBalance = '';

  AccruedCash = '';

  StockMarketValue = '';

  OptionMarketValue = '';

  FutureOptionValue = '';

  FuturesPNL = '';

  NetLiquidationByCurrency = '';

  UnrealizedPnL = '';

  RealizedPnL = '';

  ExchangeRate = '';

  FundValue = '';

  NetDividend = '';

  MutualFundValue = '';

  MoneyMarketFundValue = '';

  CorporateBondValue = '';

  TBondValue = '';

  TBillValue = '';

  WarrantValue = '';

  FxCashBalance = '';

  AccountOrGroup = '';

  RealCurrency = '';

  IssuerOptionValue = '';

  Cryptocurrency = '';
}

export interface AccountSummary extends AccountSummaryClass { }

export type Account = {
  positions?: Position[];
  summary?: AccountSummary;
};

export type Config = {
  accountSummaryKeys?: Array<keyof AccountSummary>;
};

export type ElectronContextType = {
  connection?: IBConnection;
  account?: Account;
  config?: Config;
};

export enum CONTEXT_KEYS {
  connection = 'connection',
  connectionHost = 'connection.host',
  connectionPort = 'connection.port',
  connectionConnected = 'connection.connected',
  account = 'account',
  accountPositions = 'account.positions',
  accountSummary = 'account.summary',
  config = 'config',
  configAccountSummaryKeys = 'config.accountSummaryKeys',
}

export enum IB_CHANNELS {
  Connect = 'connect-ib',
  Disconnect = 'disconnect-ib',
  GetPositions = 'get-positions-ib',
  GetOpenOrders = 'get-open-orders-ib',
  GetManagedAccounts = 'get-managed-accounts-ib',
  GetAccountSummary = 'get-account-summary-ib',
}

export enum STORE_CHANNELS {
  Get = 'electron-store-get',
  Set = 'electron-store-set',
  Update = 'electron-store-update',
}
