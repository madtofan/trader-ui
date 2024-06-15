import { BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import IBApi from '@stoqey/ib';
import {
  connectIb,
  disconnectIb,
  getAccountSummary,
  getManagedAccounts,
  getOpenOrders,
  getPositions,
} from './ib';
import { getStoreValues } from './store';
import {
  CONTEXT_KEYS,
  FLOW_CHANNELS,
  IB_CHANNELS,
  STORE_CHANNELS,
} from '../../shared-types';
import { runFlow } from './flow';
import { OptionalIb } from '../types';

const store = new Store();

export const registerStore = (mainWindow: BrowserWindow) => {
  ipcMain.on(STORE_CHANNELS.Get, async (event) => {
    event.returnValue = getStoreValues(store);
  });

  ipcMain.handle(STORE_CHANNELS.Set, async (event, key, val) => {
    store.set(key, val);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
  });
};

export const registerIb = (
  mainWindow: BrowserWindow,
  getIb: () => OptionalIb,
  setIb: (newIb: IBApi) => void,
) => {
  const currentIb = getIb();
  if (currentIb) {
    store.set(CONTEXT_KEYS.connectionConnected, true);
    mainWindow.webContents.send(STORE_CHANNELS.Update, getStoreValues(store));
  }

  ipcMain.handle(IB_CHANNELS.Connect, async () => {
    return connectIb(store, mainWindow, setIb);
  });

  ipcMain.handle(IB_CHANNELS.Disconnect, async () => {
    return disconnectIb(store, mainWindow, getIb);
  });

  ipcMain.handle(IB_CHANNELS.GetPositions, async () => {
    return getPositions(store, mainWindow, getIb);
  });

  ipcMain.handle(IB_CHANNELS.GetOpenOrders, async () => {
    return getOpenOrders(store, mainWindow, getIb);
  });

  ipcMain.handle(IB_CHANNELS.GetManagedAccounts, async () => {
    return getManagedAccounts(store, mainWindow, getIb);
  });

  ipcMain.handle(IB_CHANNELS.GetAccountSummary, async () => {
    return getAccountSummary(store, mainWindow, getIb);
  });
};

export const registerFlow = (
  mainWindow: BrowserWindow,
  getIb: () => OptionalIb,
) => {
  ipcMain.handle(FLOW_CHANNELS.Run, async () => {
    return runFlow(store, mainWindow, getIb);
  });
};
