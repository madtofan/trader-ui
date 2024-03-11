import { BrowserWindow, ipcMain } from 'electron';
import Store from 'electron-store';
import { connectIb, disconnectIb, getPositions } from './ib';
import { getStoreValues } from './store';
import { IB_CHANNELS, STORE_CHANNELS } from '../../shared-types.ts';

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

export const registerIb = (mainWindow: BrowserWindow) => {
  ipcMain.handle(IB_CHANNELS.Connect, async () => {
    return connectIb(store, mainWindow);
  });

  ipcMain.handle(IB_CHANNELS.Disconnect, async () => {
    return disconnectIb(store, mainWindow);
  });

  ipcMain.handle(IB_CHANNELS.GetPositions, async () => {
    return getPositions(store, mainWindow);
  });
};
