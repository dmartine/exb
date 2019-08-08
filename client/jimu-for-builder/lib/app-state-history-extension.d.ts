/// <reference types="seamless-immutable" />
import { IMState } from 'jimu-core';
import { extensionSpec, ImmutableObject } from 'jimu-core';
declare enum ActionKeys {
    InBuilderPutAppConfigIntoHistory = "IN_BUILDER_PUT_APPCONFIG_INTO_HISTORY",
    InBuilderAppConfigUndo = "IN_BUILDER_APPCONFIG_UNDO",
    InBuilderAppConfigRedo = "IN_BUILDER_APPCONFIG_REDO",
    InBuilderAppConfigRedoClear = "IN_BUILDER_APPCONFIG_REDOCLEAR",
    InBuilderAppConfigClear = "IN_BUILDER_APPCONFIG_CLEAR"
}
declare module 'jimu-core/lib/types/state' {
    interface State {
        appStateHistory?: IMHistoryState;
    }
}
declare module 'jimu-core' {
    interface State {
        appStateHistory?: IMHistoryState;
    }
}
interface StateHistory {
    past: IMState[];
    future: IMState[];
}
export declare type IMHistoryState = ImmutableObject<StateHistory>;
declare let actions: {
    InBuilderAppConfigUndo: () => {
        type: ActionKeys;
    };
    InBuilderAppConfigRedo: () => {
        type: ActionKeys;
    };
    InBuilderPutAppConfigIntoHistory: (appState: any) => {
        type: ActionKeys;
        appState: any;
    };
    InBuilderAppConfigRedoClear: () => {
        type: ActionKeys;
    };
    InBuilderAppConfigClear: () => {
        type: ActionKeys;
    };
};
export { actions as appStateHistoryActions, ActionKeys as AppStateHistoryActionKeys };
export default class AppStateHistoryExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): ActionKeys[];
    getInitLocalState(): {
        past: any[];
        future: any[];
    };
    getReducer(): (historyState: import("seamless-immutable").ImmutableObject<StateHistory>, action: any, builderState: import("seamless-immutable").ImmutableObject<import("jimu-core/lib/types/state").State>) => any;
    handleAppStateUndo(state: any): any;
    handleAppStateRedo(state: any): any;
    handleAppStateAdd(state: any, appState: any): any;
    handleAppStateRedoClear(state: any): any;
    handleAppStateClear(state: any): any;
    getStoreKey(): string;
}
