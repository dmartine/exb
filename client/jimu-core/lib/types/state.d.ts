import { IMAppConfig, IMSizeModeLayoutJson } from './app-config';
import { ImmutableObject, ImmutableArray } from 'seamless-immutable';
import { UrlParameters } from './url-parameters';
import { DataSourceStatus } from '../data-source/ds-base-types';
import { AppMode, WidgetState, LayoutItemConstructorProps, BrowserSizeMode, PagePart } from './common';
import { Selection } from './layout';
import { IUser } from '@esri/arcgis-rest-types';
import { I18nMessages } from '../i18n';
import JimuConfig from './jimu-config';
import { IMThemeVariables } from './theme';
export interface RuntimeInfo {
    isClassLoaded?: boolean;
    isItemClassLoaded?: boolean;
    isInlineEditing?: boolean;
    isReadyInjectDataSource?: boolean;
    state?: WidgetState;
    windowState?: 'normal' | 'minimized' | 'maximized';
}
export declare type IMRuntimeInfo = ImmutableObject<RuntimeInfo>;
export declare type IMRuntimeInfos = ImmutableObject<{
    [id: string]: IMRuntimeInfo;
}>;
export declare type IMI18nMessages = ImmutableObject<I18nMessages>;
export declare type IMLayoutState = ImmutableObject<{
    [clazz: string]: boolean;
}>;
/** these properties are not changed after app loaded */
export interface AppContext {
    isInPortal: boolean;
    locale: string;
    isRTL: boolean;
    isTouchDevice: boolean;
    isBuilder: boolean;
    isInBuilder: boolean;
    jimuConfig: JimuConfig;
}
/**
 * we use these 3 properties to manage data source state. any of these 3 properties change will cause a widget the use the data source re-render.
 */
export interface DataSourceInfo {
    isCreated: boolean;
    status: DataSourceStatus;
    saveStatus?: DataSourceStatus;
    selectedIndexes?: ImmutableArray<number>;
    selectedIds?: ImmutableArray<string>;
    /**
     * whenever a data source is changed on the client side, the version need +1, the version will be 1 when the data is loaded firstly.
     */
    version: number;
}
export declare type IMDataSourceInfo = ImmutableObject<DataSourceInfo>;
export declare type IMUser = ImmutableObject<IUser>;
export declare type IMSelection = ImmutableObject<Selection>;
export interface AppRuntimeInfo {
    appMode: AppMode;
    currentPageId: string;
    currentDialogId: string;
    currentViewIds: string[];
    activeLayout?: IMSizeModeLayoutJson;
    currentViewId: string;
    activePagePart: PagePart;
    inSelectMode?: boolean;
    selection: IMSelection;
    draggingWidget?: LayoutItemConstructorProps & {
        uid: number;
    };
    hasWaitingServiceWorker: boolean;
}
export declare type IMAppRuntimeInfo = ImmutableObject<AppRuntimeInfo>;
export interface State {
    /**
     * the portal url that the app will connect to. The portalUrl dost not have the ending slash, looks like this:
     *  http://esridevbeijing.maps.arcgis.com
     *  http://abc.com/portal
     *
     * If appConfig has portalUrl, it will be copied to this property, or we'll
     * get portalUrl through other logic, such as from browser URL, from user Input, etc.
     *
     * portalUrl can be null although the portalUrl in app config will always be set in builder for now.
     */
    portalUrl?: string;
    clientId?: string;
    portalSelf: any;
    isNetworkOffLine: boolean;
    browserSizeMode: BrowserSizeMode;
    appConfig: IMAppConfig;
    appContext: ImmutableObject<AppContext>;
    appRuntimeInfo: IMAppRuntimeInfo;
    appPath: string;
    appId: string;
    widgetsRuntimeInfo: IMRuntimeInfos;
    /**
     * The props returned by getPreloadPros.
     * We put the props in state because when widget is rendened in server, we need to pass these props to client.
     */
    widgetsPreloadProps: {
        [widgetId: string]: ImmutableObject<any>;
    };
    /**
     * the data here use jimuFieldName as key
     */
    dataSourcesPreloadData: {
        [dsId: string]: ImmutableObject<any[]>;
    };
    queryObject: ImmutableObject<UrlParameters>;
    appI18nMessages: IMI18nMessages;
    dataSourcesInfo: ImmutableObject<{
        [dsId: string]: IMDataSourceInfo;
    }>;
    widgetsState: ImmutableObject<{
        [widgetId: string]: any;
    }>;
    widgetsMutableStateVersion: ImmutableObject<{
        [widgetId: string]: number;
    }>;
    token?: string;
    user?: IMUser;
    dynamicModules: ImmutableObject<{
        [moduleId: string]: boolean;
    }>;
    theme: IMThemeVariables;
}
export declare type IMState = ImmutableObject<State>;
interface StateHistory {
    past: IMState[];
    future: IMState[];
}
export declare type IMHistoryState = ImmutableObject<StateHistory>;
export {};
