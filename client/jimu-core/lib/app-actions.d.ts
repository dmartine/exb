import { AppConfig, IMAppConfig } from './types/app-config';
import { IMState, AppContext, IMAppRuntimeInfo } from './types/state';
import { Selection } from './types/layout';
import { AppMode, LayoutItemConstructorProps, BrowserSizeMode, PagePart } from './types/common';
import { UrlParameters } from './types/url-parameters';
import { DataSourceStatus } from './data-source/ds-base-types';
import { IUser } from '@esri/arcgis-rest-types';
import { I18nMessages } from './i18n';
import { IMThemeVariables } from './types/theme';
export declare enum ActionKeys {
    InitStoreExtensionState = "INIT_STORE_EXTENSION_STATE",
    AppConfigLoaded = "APPCONFIG_LOADED",
    AppConfigChanged = "APPCONFIG_CHANGED",
    ThemeVariablesLoaded = "THEME_VARIABLES_LOADED",
    SetPortalUrl = "SET_PORTAL_URL",
    SetPortalInfo = "SET_PORTAL_INFO",
    SetPortalSelf = "SET_PORTAL_SELF",
    WidgetClassLoaded = "WIDGET_CLASS_LOADED",
    OpenWidget = "OPEN_WIDGET",
    CloseWidget = "CLOSE_WIDGET",
    SetWidgetIsInlineEditingState = "SET_WIDGET_IS_INLINE_EDITING_STATE",
    SetWidgetPreloadProps = "SET_WIDGET_PRELOAD_PROPS",
    SetWidgetReadyInjectDataSource = "SET_WIDGET_READY_INJECT_DATA_SOURCE",
    SetAppInBuilder = "SET_APP_IN_BUILDER",
    LayoutClassLoaded = "LAYOUT_CLASS_LOADED",
    AppContextInit = "APP_CONTEXT_INIT",
    I18nMessagesLoaded = "I18N_MESSAGES_LOADED",
    QueryObjectChanged = "QUERY_OBJECT_CHANGED",
    AppModeChanged = "APP_MODE_CHANGED",
    CurrentViewChanged = "CURRENT_VIEW_CHANGED",
    SelectionChanged = "SELECTION_CHANGED",
    SetSelectMode = "Set_SELECT_MODE",
    AppRuntimeInfoInit = "APP_RUNTIME_INFO_INIT",
    CurrentPageChanged = "CURRENT_PAGE_CHANGED",
    AppPathChanged = "APP_PATH_CHANGED",
    AppIdChanged = "APP_ID_CHANGED",
    NetworkStatusChanged = "NETWORK_STATUS_CHANGED",
    DataSourceStatusChanged = "DATA_SOURCE_STATUS_CHANGED",
    DataSourceInstanceStatusChanged = "DATA_SOURCE_INSTANCE_STATUS_CHANGED",
    DataSourceSaveStatusChanged = "DATA_SOURCE_SAVE_STATUS_CHANGED",
    DataSourceVersionAdded = "DATA_SOURCE_VERSION_ADDED",
    DataSourceSelectedIndexesChanged = "DATA_SOURCE_SELECTED_INDEXES_CHANGED",
    DataSourceSelectedIdsChanged = "DATA_SOURCE_SELECTED_IDS_CHANGED",
    SetDataSourcePreloadData = "SET_DATA_SOURCE_PRELOAD_DATA",
    WidgetStatePropChange = "WIDGET_STATE_PROP_CHANGE",
    WidgetMutableStatePropChange = "WIDGET_MUTABLE_STATE_PROP_CHANGE",
    SessionStart = "SESSION_START",
    UserSignIn = "USER_SIGN_IN",
    UserSignOut = "USER_SIGN_OUT",
    BrowserSizeModeChanged = "BROWSER_SIZE_MODE_CHANGED",
    DynamicModuleLoaded = "DYNAMIC_MODULE_LOADED",
    UpdateStoreState = "UPDATE_STORE_STATE",
    DragWidgetFromList = "DRAG_WIDGET_FROM_LIST",
    DropWidgetFromList = "DROP_WIDGET_FROM_LIST",
    ActivePagePartChanged = "ACTIVE_PAGE_PART_CHANGED",
    SetWaitingServiceWorkerFlag = "SET_WAITING_SERVICE_WORKER_FLAG"
}
export declare type ActionTypes = AppConfigLoadedAction | AppConfigChangedAction | AppIdChangedAction | DynamicModuleLoadedAction | SetPortalSelfAction | WidgetClassLoadedAction | OpenWidgetAction | CloseWidgetAction | AppRuntimeInfoInitAction | ThemeVariablesLoadedAction | AppContextInitAction | I18nMessagesLoadedAction | QueryObjectChangedAction | SetAppInBuilderAction | DataSourceInstanceStatusChangeAction | AppModeChangedAction | InitAction | LayoutClassLoadedAction | DataSourceStatusChangeAction | DataSourceVersionChangeAction | InitStoreExtensionStateAction | WidgetStatePropChangeAction | WidgetMutableStatePropChangeAction | SetPortalUrlAction | SetPortalInfoAction | DataSourceSelectedIndexChangeAction | DataSourceSelectedIdsChangeAction | SessionStartAction | UserSignInAction | UserSignOutAction | BrowserSizeModeChangedAction | SetWidgetIsInlineEditingStateAction | DataSourceSaveStatusChangeAction | SetWidgetPreloadPropsAction | SetDataSourcePreloadDataAction | AppPathChangedAction | NetworkStatusChangedAction | CurrentViewChangedAction | SelectionChangedAction | UpdateStoreStateAction | SetWidgetReadyInjectDataSourceAction | CurrentPageChangedAction | DragWidgetFromListAction | DropWidgetFromListAction | SetSelectModeAction | ActivePagePartChangedAction | SetWaitingServiceWorkerFlagAction;
interface InitAction {
    type: '@@INIT';
}
export interface InitStoreExtensionStateAction {
    type: ActionKeys.InitStoreExtensionState;
    extensionId: string;
}
export interface AppConfigLoadedAction {
    type: ActionKeys.AppConfigLoaded;
    appConfig: AppConfig;
}
export interface AppConfigChangedAction {
    type: ActionKeys.AppConfigChanged;
    appConfig: AppConfig;
}
export interface AppIdChangedAction {
    type: ActionKeys.AppIdChanged;
    appId: string;
}
export interface WidgetClassLoadedAction {
    type: ActionKeys.WidgetClassLoaded;
    widgetId: string;
}
export interface OpenWidgetAction {
    type: ActionKeys.OpenWidget;
    widgetId: string;
}
export interface CloseWidgetAction {
    type: ActionKeys.CloseWidget;
    widgetId: string;
}
export interface AppContextInitAction {
    type: ActionKeys.AppContextInit;
    appContext: AppContext;
}
export interface I18nMessagesLoadedAction {
    type: ActionKeys.I18nMessagesLoaded;
    key: string;
    messages: I18nMessages;
}
export interface QueryObjectChangedAction {
    type: ActionKeys.QueryObjectChanged;
    query: UrlParameters;
}
export interface SetAppInBuilderAction {
    type: ActionKeys.SetAppInBuilder;
}
export interface AppModeChangedAction {
    type: ActionKeys.AppModeChanged;
    mode: AppMode;
}
export interface AppPathChangedAction {
    type: ActionKeys.AppPathChanged;
    path: string;
}
export interface LayoutClassLoadedAction {
    type: ActionKeys.LayoutClassLoaded;
    layoutName: string;
}
export interface DataSourceStatusChangeAction {
    type: ActionKeys.DataSourceStatusChanged;
    dataSourceId: string;
    status: DataSourceStatus;
}
export interface DataSourceInstanceStatusChangeAction {
    type: ActionKeys.DataSourceInstanceStatusChanged;
    dataSourceId: string;
    isCreated: boolean;
}
export interface DataSourceSaveStatusChangeAction {
    type: ActionKeys.DataSourceSaveStatusChanged;
    dataSourceId: string;
    saveStatus: DataSourceStatus;
}
export interface DataSourceVersionChangeAction {
    type: ActionKeys.DataSourceVersionAdded;
    dataSourceId: string;
}
export interface DataSourceSelectedIndexChangeAction {
    type: ActionKeys.DataSourceSelectedIndexesChanged;
    dataSourceId: string;
    selectedIndexes: number[];
}
export interface DataSourceSelectedIdsChangeAction {
    type: ActionKeys.DataSourceSelectedIdsChanged;
    dataSourceId: string;
    selectedIds: string[];
}
export interface WidgetStatePropChangeAction {
    type: ActionKeys.WidgetStatePropChange;
    widgetId: string;
    propKey: string;
    value: any;
}
export interface WidgetMutableStatePropChangeAction {
    type: ActionKeys.WidgetMutableStatePropChange;
    widgetId: string;
    propKey: string;
    value: any;
}
export interface SetPortalUrlAction {
    type: ActionKeys.SetPortalUrl;
    portalUrl: string;
}
export interface SetPortalInfoAction {
    type: ActionKeys.SetPortalInfo;
    portalUrl: string;
    clientId?: string;
}
export interface DataSourceSelectedIndexesChangeAction {
    type: ActionKeys.DataSourceSelectedIndexesChanged;
    dataSourceId: string;
    selectedIndexes: number[];
}
export interface SessionStartAction {
    type: ActionKeys.SessionStart;
    token: string;
}
export interface UserSignInAction {
    type: ActionKeys.UserSignIn;
    user: IUser;
}
export interface UserSignOutAction {
    type: ActionKeys.UserSignOut;
}
export interface BrowserSizeModeChangedAction {
    type: ActionKeys.BrowserSizeModeChanged;
    browserSizeMode: BrowserSizeMode;
}
export interface SetWidgetIsInlineEditingStateAction {
    type: ActionKeys.SetWidgetIsInlineEditingState;
    widgetId: string;
    isInlineEditing: boolean;
}
export interface SetWidgetPreloadPropsAction {
    type: ActionKeys.SetWidgetPreloadProps;
    widgetId: string;
    props: any;
}
export interface SetDataSourcePreloadDataAction {
    type: ActionKeys.SetDataSourcePreloadData;
    dataSourceId: string;
    data: any[];
}
export interface NetworkStatusChangedAction {
    type: ActionKeys.NetworkStatusChanged;
    isOffLine: boolean;
}
export interface DynamicModuleLoadedAction {
    type: ActionKeys.DynamicModuleLoaded;
    moduleId: string;
}
export interface CurrentViewChangedAction {
    type: ActionKeys.CurrentViewChanged;
    viewId: string;
}
export interface SelectionChangedAction {
    type: ActionKeys.SelectionChanged;
    selection: Selection;
}
export interface SetSelectModeAction {
    type: ActionKeys.SetSelectMode;
    enabled: boolean;
}
export interface UpdateStoreStateAction {
    type: ActionKeys.UpdateStoreState;
    state: IMState;
}
export interface AppRuntimeInfoInitAction {
    type: ActionKeys.AppRuntimeInfoInit;
    info: Partial<IMAppRuntimeInfo>;
}
export interface SetWidgetReadyInjectDataSourceAction {
    type: ActionKeys.SetWidgetReadyInjectDataSource;
    widgetId: string;
}
export interface ThemeVariablesLoadedAction {
    type: ActionKeys.ThemeVariablesLoaded;
    theme: IMThemeVariables;
}
export interface SetPortalSelfAction {
    type: ActionKeys.SetPortalSelf;
    portalSelf: any;
}
export interface CurrentPageChangedAction {
    type: ActionKeys.CurrentPageChanged;
    pageId: string;
}
export interface DragWidgetFromListAction {
    type: ActionKeys.DragWidgetFromList;
    widgetInfo: LayoutItemConstructorProps;
}
export interface DropWidgetFromListAction {
    type: ActionKeys.DropWidgetFromList;
}
export interface ActivePagePartChangedAction {
    type: ActionKeys.ActivePagePartChanged;
    part: PagePart;
}
export interface SetWaitingServiceWorkerFlagAction {
    type: ActionKeys.SetWaitingServiceWorkerFlag;
    flag: boolean;
}
export declare function appConfigLoaded(appConfig: any): AppConfigLoadedAction;
export declare function appConfigChanged(appConfig: IMAppConfig): AppConfigChangedAction;
export declare function appPathChanged(path: string): AppPathChangedAction;
export declare function appIdChanged(appId: string): AppIdChangedAction;
export declare function widgetClassLoaded(widgetId: any): WidgetClassLoadedAction;
export declare function openWidget(widgetId: any): OpenWidgetAction;
export declare function closeWidget(widgetId: any): CloseWidgetAction;
export declare function initAppContext(appContext: AppContext): AppContextInitAction;
export declare function i18nMessagesLoaded(key: string, messages: I18nMessages): I18nMessagesLoadedAction;
export declare function queryObjectChanged(query: UrlParameters): QueryObjectChangedAction;
export declare function setAppInBuilder(): SetAppInBuilderAction;
export declare function appModeChanged(mode: AppMode): AppModeChangedAction;
export declare function layoutClassLoaded(layoutName: any): LayoutClassLoadedAction;
export declare function dataSourceStatusChanged(dataSourceId: string, status: DataSourceStatus): DataSourceStatusChangeAction;
export declare function dataSourceInstanceStatusChanged(dataSourceId: string, isCreated: boolean): DataSourceInstanceStatusChangeAction;
export declare function dataSourceSaveStatusChanged(dataSourceId: string, saveStatus: DataSourceStatus): DataSourceSaveStatusChangeAction;
export declare function dataSourceVersionAdded(dataSourceId: string): DataSourceVersionChangeAction;
export declare function initStoreExtensionState(extensionId: string): InitStoreExtensionStateAction;
export declare function widgetStatePropChange(widgetId: string, propKey: string, value: any): WidgetStatePropChangeAction;
export declare function widgetMutableStatePropChange(widgetId: string, propKey: string, value: any): WidgetMutableStatePropChangeAction;
export declare function setPortalUrl(portalUrl: string): SetPortalUrlAction;
export declare function setPortalInfo(portalUrl: string, clientId?: string): SetPortalInfoAction;
export declare function dataSourceSelectedIndexesChanged(dataSourceId: string, indexes: number[]): DataSourceSelectedIndexesChangeAction;
export declare function dataSourceSelectedIdsChanged(dataSourceId: string, ids: string[]): DataSourceSelectedIdsChangeAction;
export declare function sessionStart(token: string): SessionStartAction;
export declare function userSignIn(user: IUser): UserSignInAction;
export declare function userSignOut(): UserSignOutAction;
export declare function browserSizeModeChanged(browserSizeMode: BrowserSizeMode): BrowserSizeModeChangedAction;
export declare function setWidgetIsInlineEditingState(widgetId: string, isInlineEditing: boolean): SetWidgetIsInlineEditingStateAction;
export declare function setWidgetPreloadProps(widgetId: string, props: any): SetWidgetPreloadPropsAction;
export declare function setDataSourcePreloadData(dataSourceId: string, data: any[]): SetDataSourcePreloadDataAction;
export declare function networkStatusChanged(isOffLine: boolean): NetworkStatusChangedAction;
export declare function dynamicModuleLoaded(moduleId: string): DynamicModuleLoadedAction;
export declare function currentViewChanged(viewId: string): CurrentViewChangedAction;
export declare function currentPageChanged(pageId: string): CurrentPageChangedAction;
export declare function selectionChanged(selection: Selection): SelectionChangedAction;
export declare function setSelectMode(enabled: boolean): SetSelectModeAction;
export declare function updateStoreState(state: IMState): UpdateStoreStateAction;
export declare function appRuntimeInfoInit(info: Partial<IMAppRuntimeInfo>): AppRuntimeInfoInitAction;
export declare function setWidgetReadyInjectDataSource(widgetId: string): SetWidgetReadyInjectDataSourceAction;
export declare function themeVariablesLoaded(theme: IMThemeVariables): ThemeVariablesLoadedAction;
export declare function setPortalSelf(portalSelf: any): SetPortalSelfAction;
export declare function dragWidgetFromList(widgetInfo: LayoutItemConstructorProps): DragWidgetFromListAction;
export declare function dropWidgetFromList(): DropWidgetFromListAction;
export declare function activePagePartChanged(part: any): ActivePagePartChangedAction;
export {};
