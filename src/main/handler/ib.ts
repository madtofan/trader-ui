import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import { IBApi, EventName, ErrorCode, Contract } from '@stoqey/ib';
import { getStoreValues } from './store';
import {
  CONTEXT_KEYS,
  STORE_CHANNELS,
  Position,
  IBConnection,
  AccountSummary,
} from '../../shared-types';

export const connectIb = async (
  store: Store,
  mainWindow: BrowserWindow,
  setIb: (newIb: IBApi) => void,
) => {
  const ibConnection: IBConnection = store.get(
    CONTEXT_KEYS.connection,
  ) as IBConnection;
  const ib = new IBApi({
    clientId: 1,
    host: ibConnection.host,
    port: ibConnection.port,
  });

  let resolves: (value: unknown) => void;
  let rejects: (reason?: any) => void;
  const promise = new Promise((resolve, reject) => {
    resolves = resolve;
    rejects = reject;
  });

  ib.once(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
  })
    .once(EventName.connected, () => {
      store.set(CONTEXT_KEYS.connectionConnected, true);
      setIb(ib);
      mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
      resolves(`connected!`);
    })
    .on(EventName.connectionClosed, () => {
      store.set(CONTEXT_KEYS.connectionConnected, false);
      mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    });

  ib.connect();
  const returnValue = await promise
    .then((val) => val)
    .catch((err) => {
      throw err;
    });
  return returnValue;
};

export const disconnectIb = (
  store: Store,
  mainWindow: BrowserWindow,
  ib?: IBApi,
) => {
  if (!(ib && ib.isConnected)) {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    throw Error('IB is not connected');
  }
  ib.disconnect();
  store.set(CONTEXT_KEYS.connectionConnected, false);
  mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
};

export const getPositions = async (
  store: Store,
  mainWindow: BrowserWindow,
  ib?: IBApi,
) => {
  if (!(ib && ib.isConnected)) {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    throw Error('IB is not connected');
  }
  let resolves: (value: unknown) => void;
  let rejects: (reason?: any) => void;
  const promise = new Promise((resolve, reject) => {
    resolves = resolve;
    rejects = reject;
  });

  const positions: Position[] = [];

  ib.once(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
  })
    .on(
      EventName.position,
      (account: string, contract: Contract, pos: number, avgCost?: number) => {
        positions.push({
          symbol: contract.symbol || '',
          avgCost: avgCost || 0,
          count: pos,
        });
      },
    )
    .once(EventName.positionEnd, () => {
      store.set(CONTEXT_KEYS.accountPositions, positions);
      mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
      resolves(`position counts: ${positions.length}`);
    });
  ib.reqPositions();
  // ib.reqOpenOrders();
  // ib.reqAllOpenOrders();
  // ib.reqAccountSummary();
  // ib.cancelOrder();
  // ib.placeOrder();
  // ib.reqManagedAccts();
  const returnValue = await promise
    .then((val) => val)
    .catch((err) => {
      throw err;
    });
  return returnValue;
};

export const getOpenOrders = async (
  store: Store,
  mainWindow: BrowserWindow,
  ib?: IBApi,
) => {
  if (!(ib && ib.isConnected)) {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    throw Error('IB is not connected');
  }
  let resolves: (value: unknown) => void;
  let rejects: (reason?: any) => void;
  const promise = new Promise((resolve, reject) => {
    resolves = resolve;
    rejects = reject;
  });

  ib.once(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
  }).once(EventName.received, (...args: any) => {
    resolves(args);
  });
  ib.reqAllOpenOrders();

  const returnValue = await promise
    .then((val) => val)
    .catch((err) => {
      throw err;
    });
  return returnValue;
};

export const getManagedAccounts = async (
  store: Store,
  mainWindow: BrowserWindow,
  ib?: IBApi,
) => {
  if (!(ib && ib.isConnected)) {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    throw Error('IB is not connected');
  }
  let resolves: (value: unknown) => void;
  let rejects: (reason?: any) => void;
  const promise = new Promise((resolve, reject) => {
    resolves = resolve;
    rejects = reject;
  });

  ib.once(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
  }).once(EventName.managedAccounts, (...args: any) => {
    resolves(args);
  });
  ib.reqManagedAccts();

  const returnValue = await promise
    .then((val) => val)
    .catch((err) => {
      throw err;
    });
  return returnValue;
};

export const getAccountSummary = async (
  store: Store,
  mainWindow: BrowserWindow,
  ib?: IBApi,
) => {
  if (!(ib && ib.isConnected)) {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    throw Error('IB is not connected');
  }
  let resolves: (value: unknown) => void;
  let rejects: (reason?: any) => void;
  const promise = new Promise((resolve, reject) => {
    resolves = resolve;
    rejects = reject;
  });
  const accountSummary: Partial<AccountSummary> = {};

  ib.once(EventName.error, (err: Error, code: ErrorCode, reqId: number) => {
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
    rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
  })
    .on(EventName.accountSummary, (...args: any) => {
      const key = args[2] as keyof AccountSummary;
      const value = args[3];
      accountSummary[key] = value;
    })
    .once(EventName.accountSummaryEnd, () => {
      ib.cancelAccountSummary(1);
      store.set(CONTEXT_KEYS.accountSummary, accountSummary);
      mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
      resolves(accountSummary);
    });
  ib.reqAccountSummary(1, 'All', '$LEDGER:USD');

  const returnValue = await promise
    .then((val) => val)
    .catch((err) => {
      throw err;
    });
  return returnValue;
};
