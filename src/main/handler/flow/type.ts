import Store from 'electron-store';
import { OptionalIb } from "../../types";
import { BrowserWindow } from "electron";
import FlowNode from './node';

export interface NodeRunnerArgs {
  store: Store;
  mainWindow: BrowserWindow;
  getIb: () => OptionalIb;
}

export interface HandleNodeProps {
  flowNode: FlowNode;
  nodeRunnerArgs: NodeRunnerArgs;
}

export interface HandleNodeResponse {
  nextSourceHandle?: string;
  nodeOutput: any;
}
