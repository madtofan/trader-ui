import { BrowserWindow, app } from 'electron';
import Store from 'electron-store';
import { Flow } from '../../shared-types';

export const getFileList = async (store: Store, mainWindow: BrowserWindow) => {
  const path = app.getPath('userData');
  console.log({ path });
};

export const saveFile = async (
  store: Store,
  mainWindow: BrowserWindow,
  fileName: string,
  flow: Flow,
) => {
  const path = app.getPath('userData');
  console.log({ path });
};

export const deleteFile = async (
  store: Store,
  mainWindow: BrowserWindow,
  fileName: string,
) => {
  const path = app.getPath('userData');
  console.log({ path });
};

export const readFile = async (store: Store, mainWindow: BrowserWindow) => {
  const path = app.getPath('userData');
  console.log({ path });
};
