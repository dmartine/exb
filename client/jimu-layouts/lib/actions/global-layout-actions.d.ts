import { LayoutInfo } from 'jimu-core';
export declare enum GlobalLayoutActions {
    Select = "GLOBAL_SELECT_ELEMENT",
    DisableSelectMode = "GLOBAL_DISABLE_SELECT_MODE"
}
export declare function selectItem(selection: LayoutInfo): {
    selection: LayoutInfo;
    type: GlobalLayoutActions;
};
export declare function disableSelectMode(): {
    type: GlobalLayoutActions;
};
