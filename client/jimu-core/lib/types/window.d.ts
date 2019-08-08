import JimuConfig from './jimu-config';
import { System } from 'systemjs';
interface Pubsub {
    publish: (message: string, data?: any) => void;
    publishSync: (message: string, data?: any) => void;
    subscribe: (message: string, fun: (message: string, data?: any) => void) => void;
    unsubscribe: (any: any) => void;
}
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__: any;
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        __webpack_public_path: string;
        __karma__: any;
        _builderPubsub: Pubsub;
        _widgetManager: any;
        _widgetSettingManager: any;
        _extensionManager: any;
        _dataSourceManager: any;
        _appDataSourceManager: any;
        _messageManager: any;
        _appResourceManager: any;
        _sessionManager: any;
        _mutableStoreManager: any;
        _serviceManager: any;
        _dataActionManager: any;
        _appStore: any;
        _appState: any;
        _getCleanAppConfig: any;
        _appWindow: Window;
        initStoreState: any;
        SystemJS: System;
        jimuConfig: JimuConfig;
        env: string;
        hostEnv: 'dev' | 'qa' | 'prod';
        isNode: boolean;
        waitingServiceWorker: ServiceWorker;
    }
}
export {};
