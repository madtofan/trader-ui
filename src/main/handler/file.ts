import { BrowserWindow } from 'electron';
import Store from 'electron-store';
import { app } from 'electron';

export const getFileList = async (
  store: Store,
  mainWindow: BrowserWindow,
) => {
  const path = app.getPath("userData");
  console.log({ path });
}

export const saveFile = async (
  store: Store,
  mainWindow: BrowserWindow,
) => {
  const path = app.getPath("userData");
  console.log({ path });
}

export const deleteFile = async (
  store: Store,
  mainWindow: BrowserWindow,
) => {
  const path = app.getPath("userData");
  console.log({ path });
}

export const readFile = async (
  store: Store,
  mainWindow: BrowserWindow,
) => {
  const path = app.getPath("userData");
  console.log({ path });
}
