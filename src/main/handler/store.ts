import Store from 'electron-store';
import { CONTEXT_KEYS, ElectronContextType } from '../../shared-types.ts';

export const getStoreValues = (store: Store): ElectronContextType => {
  const electronContextType: ElectronContextType = {};
  Object.keys(CONTEXT_KEYS).forEach((typeKey) => {
    electronContextType[typeKey] = store.get(typeKey);
  });
  return electronContextType;
};
