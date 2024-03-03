import { BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import { IBApi, EventName, ErrorCode, Contract } from '@stoqey/ib';
import {
  CONTEXT_KEYS,
  IB_CHANNELS,
  STORE_CHANNELS,
  ElectronContextType,
  Position,
} from '../shared-types.ts';

const store = new Store();
let ib: IBApi;

const getStoreValues = (): ElectronContextType => {
  const electronContextType: ElectronContextType = {};
  Object.keys(CONTEXT_KEYS).forEach((typeKey) => {
    electronContextType[typeKey] = store.get(typeKey);
  });
  return electronContextType;
};

export const registerStore = (mainWindow: BrowserWindow) => {
  ipcMain.on(STORE_CHANNELS.Get, async (event) => {
    event.returnValue = getStoreValues();
  });

  ipcMain.handle(STORE_CHANNELS.Set, async (event, key, val) => {
    store.set(key, val);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues());
  });
};

export const registerIb = (mainWindow: BrowserWindow) => {
  ipcMain.handle(IB_CHANNELS.Connect, async () => {
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
      mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues());
      rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
    })
      .once(EventName.connected, () => {
        store.set(CONTEXT_KEYS.connectionConnected, true);
        mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues());
        resolves(`connected!`);
      })
      .on(EventName.connectionClosed, () => {
        store.set(CONTEXT_KEYS.connectionConnected, false);
        mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues());
      });

    ib.connect();
    const returnValue = await promise
      .then((val) => val)
      .catch((err) => {
        throw err;
      });
    return returnValue;
  });

  ipcMain.handle(IB_CHANNELS.Disconnect, async () => {
    if (!ib) throw Error('IB is not connected');
    ib.disconnect();
    store.set(CONTEXT_KEYS.connectionConnected, false);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues());
  });

  ipcMain.handle(IB_CHANNELS.GetPositions, async () => {
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
      mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues());
      rejects(`${err.message} - code: ${code} - reqId: ${reqId}`);
    })
      .on(
        EventName.position,
        (
          account: string,
          contract: Contract,
          pos: number,
          avgCost?: number,
        ) => {
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
  });
};
