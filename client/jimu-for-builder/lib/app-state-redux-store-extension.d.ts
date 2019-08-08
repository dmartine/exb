/// <reference types="seamless-immutable" />
import { extensionSpec } from 'jimu-core';
import { IMState } from 'jimu-core';
declare module 'jimu-core/lib/types/state' {
    interface State {
        appStateInBuilder?: IMState;
    }
}
declare module 'jimu-core' {
    interface State {
        appStateInBuilder?: IMState;
    }
}
export declare enum ExtActionKeys {
    InAppAppStateChanged = "IN_APP_APP_STATE_CHANGED"
}
export interface InAppAppStateChangeAction {
    type: ExtActionKeys.InAppAppStateChanged;
    appState: IMState;
}
declare const actions: {
    inAppAppStateChanged: (appState: import("seamless-immutable").ImmutableObject<import("jimu-core/lib/types/state").State>) => {
        type: ExtActionKeys;
        appState: import("seamless-immutable").ImmutableObject<import("jimu-core/lib/types/state").State>;
    };
};
declare type ActionTypes = InAppAppStateChangeAction;
export { ActionTypes as AppStateActionTypes, actions as appStateActions };
export default class BuilderAppStateReduxStoreExtension implements extensionSpec.ReduxStoreExtension {
    id: string;
    getActions(): any[];
    getInitLocalState(): any;
    getReducer(): (appState: import("seamless-immutable").ImmutableObject<import("jimu-core/lib/types/state").State>, action: InAppAppStateChangeAction, builderState: import("seamless-immutable").ImmutableObject<import("jimu-core/lib/types/state").State>) => import("seamless-immutable").ImmutableObject<import("jimu-core/lib/types/state").State>;
    getStoreKey(): string;
}
