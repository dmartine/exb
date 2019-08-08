import {React} from 'jimu-core';

export const AppListContext = React.createContext({
  deleteApp: (appId: string) => {},
  refreshList: () => {},
  duplicateApp: (appId: string) => {}
});