import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { FILE_CHANNELS, FLOW_CHANNELS, IB_CHANNELS, STORE_CHANNELS } from '../shared-types';

export type Channels =
  | FILE_CHANNELS.DeleteFile
  | FILE_CHANNELS.GetList
  | FILE_CHANNELS.ReadFile
  | FILE_CHANNELS.SaveFile
  | FLOW_CHANNELS.Run
  | IB_CHANNELS.Connect
  | IB_CHANNELS.Disconnect
  | IB_CHANNELS.GetAccountSummary
  | IB_CHANNELS.GetManagedAccounts
  | IB_CHANNELS.GetOpenOrders
  | IB_CHANNELS.GetPositions
  | STORE_CHANNELS.Get
  | STORE_CHANNELS.Set
  | STORE_CHANNELS.Update;

const electronHandler = {
  ipcRenderer: {
    invoke(channel: Channels, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
