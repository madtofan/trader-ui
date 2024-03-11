import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import { IBApi, EventName, ErrorCode, Contract } from '@stoqey/ib';
import { getStoreValues } from './store';
import { CONTEXT_KEYS, STORE_CHANNELS, Position } from '../../shared-types.ts';

let ib: IBApi;

export const connectIb = async (store: Store, mainWindow: BrowserWindow) => {
  const ibConnection = store.get(CONTEXT_KEYS.connection);
  ib = new IBApi({
    clientId: 1,
    host: ibConnection.host,
    port: ibConnection.port,
  });

  let resolves;
  let rejects;
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

export const disconnectIb = (store: Store, mainWindow: BrowserWindow) => {
  if (!ib) throw Error('IB is not connected');
  ib.disconnect();
  store.set(CONTEXT_KEYS.connectionConnected, false);
  mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
};

export const getPositions = async (store: Store, mainWindow: BrowserWindow) => {
  if (!ib) throw new Error('IB is not connected');
  let resolves;
  let rejects;
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
          symbol: contract.symbol,
          avgCost: avgCost || 0,
        });
      },
    )
    .once(EventName.positionEnd, () => {
      resolves(`position counts: ${positions.length}`);
    });
  ib.reqPositions();

  const returnValue = await promise
    .then((val) => val)
    .catch((err) => {
      throw err;
    });
  return returnValue;
};
