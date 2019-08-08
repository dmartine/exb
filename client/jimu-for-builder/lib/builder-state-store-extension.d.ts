/// <reference types="seamless-immutable" />
import { IMRuntimeInfos, ImmutableObject, Immutable } from 'jimu-core';
import { extensionSpec } from 'jimu-core';
import { ToolbarConfig } from 'jimu-layouts/common';
interface BuilderState {
    templateName: string;
    showChooseWidgetPopup: boolean;
    currentAppId: string;
    widgetsSettingRuntimeInfo?: IMRuntimeInfos;
    refreshAppList: boolean;
    toolbarConfig?: ToolbarConfig;
}
declare type IMBuilderState = ImmutableObject<BuilderState>;
/**
 * To simplify the builder widgets communication, we store a shared state in store
 */
declare module 'jimu-core/lib/types/state' {
    interface State {
        builder?: IMBuilderState;
    }
}
declare module 'jimu-core' {
    interface State {
        builder?: IMBuilderState;
    }
}
declare enum ActionKeys {
    SelectTemplate = "SELECT_TEMPLATE",
    OpenChooseWidgetPopup = "OPEN_CHOOSE_WIDGET_POPUP",
    CloseChooseWidgetPopup = "CLOSE_CHOOSE_WIDGET_POPUP",
    WidgetSettingClassLoaded = "WIDGET_SETTING_CLASS_LOADED",
    WidgetItemSettingClassLoaded = "WIDGET_ITEM_SETTING_CLASS_LOADED",
    WidgetRemoved = "WIDGET_REMOVED",
    ChangeCurrentApp = "CHANGE_CURRENT_APP",
    RefreshAppList = "REFRSH_APPLIST",
    SetLayoutTools = "SET_LAYOUT_TOOLS"
}
export interface SelectTemplateAction {
    type: ActionKeys.SelectTemplate;
    templateName: string;
}
export interface ShowChooseWidgetPopupAction {
    type: ActionKeys.OpenChooseWidgetPopup;
    layoutId: string;
    layoutItemId: string;
}
export interface CloseChooseWidgetPopupAction {
    type: ActionKeys.CloseChooseWidgetPopup;
}
export interface WidgetSettingClassLoadedAction {
    type: ActionKeys.WidgetSettingClassLoaded;
    widgetId: string;
}
export interface WidgetItemSettingClassLoadedAction {
    type: ActionKeys.WidgetItemSettingClassLoaded;
    widgetId: string;
}
export interface WidgetRemovedAction {
    type: ActionKeys.WidgetRemoved;
    widgetId: string;
}
export interface ChangeCurrentAppAction {
    type: ActionKeys.ChangeCurrentApp;
    appId: string;
}
export interface RefreshAppListAction {
    type: ActionKeys.RefreshAppList;
    isRefresh: boolean;
}
export interface SetLayoutToolsAction {
    type: ActionKeys.SetLayoutTools;
    tools: ToolbarConfig;
}
declare type ActionTypes = SelectTemplateAction | ShowChooseWidgetPopupAction | CloseChooseWidgetPopupAction | WidgetSettingClassLoadedAction | WidgetRemovedAction | RefreshAppListAction | ChangeCurrentAppAction | WidgetItemSettingClassLoadedAction | SetLayoutToolsAction;
export { ActionKeys as BuilderStateActionTypes };
declare let actions: {
    selectTemplate: (templateName: string) => SelectTemplateAction;
    refreshAppListAction: (isRefresh: boolean) => RefreshAppListAction;
    openChooseWidgetPopup: (layoutId: string, layoutItemId: string) => ShowChooseWidgetPopupAction;
    closeChooseWidgetPopup: () => CloseChooseWidgetPopupAction;
    widgetSettingClassLoaded: (widgetId: string) => {
        type: ActionKeys;
        widgetId: string;
    };
    widgetItemSettingClassLoaded: (widgetId: string) => {
        type: ActionKeys;
        widgetId: string;
    };
    widgetRemoved: (widgetId: string) => {
        type: ActionKeys;
        widgetId: string;
    };
    changeCurrentApp: (appId: string) => ChangeCurrentAppAction;
    setLayoutTools: (tools: (import("../../jimu-layouts/common").ToolItemConfig | import("../../jimu-layouts/common").ToolItemConfig[])[]) => SetLayoutToolsAction;
};
export { actions as builderActions, ActionKeys as builderActionKeys };
export default class BuilderStateReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): any[];
    getInitLocalState(): IMBuilderState;
    getReducer(): (builderState: Immutable.ImmutableObject<BuilderState>, action: ActionTypes, builderFullState: Immutable.ImmutableObject<import("jimu-core/lib/types/state").State>) => Immutable.ImmutableObject<BuilderState>;
    getStoreKey(): string;
}
