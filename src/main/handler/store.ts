import Store from 'electron-store';
import { CONTEXT_KEYS, ElectronContextType } from '../../shared-types';

export const getStoreValues = (store: Store): ElectronContextType => {
  const electronContextType: ElectronContextType = {};
  const parentKeys = [
    CONTEXT_KEYS.connection,
    CONTEXT_KEYS.account,
    CONTEXT_KEYS.config,
  ];
  parentKeys.forEach((typeKey) => {
    electronContextType[typeKey as keyof ElectronContextType] = store.get(
      typeKey,
    ) as any;
  });
  return electronContextType;
};
