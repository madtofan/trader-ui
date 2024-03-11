export type IBConnection = {
  connected?: boolean;
  host?: string;
  port?: number;
};

export type Position = {
  symbol: string;
  avgCost: number;
};

export type Portfolio = {
  positions?: Position[];
};

export type ElectronContextType = {
  connection?: IBConnection;
  portfolio?: Portfolio;
};

export enum CONTEXT_KEYS {
  connection = 'connection',
  connectionHost = 'connection.host',
  connectionPort = 'connection.port',
  connectionConnected = 'connection.connected',
  portfolio = 'portfolio',
  portfolioPosition = 'portfolio.positions',
}

export enum IB_CHANNELS {
  Connect = 'connect-ib',
  Disconnect = 'disconnect-ib',
  GetPositions = 'get-positions-ib',
}

export enum STORE_CHANNELS {
  Get = 'electron-store-get',
  Set = 'electron-store-set',
  Update = 'electron-store-update',
}
