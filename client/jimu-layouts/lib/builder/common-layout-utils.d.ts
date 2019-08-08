/// <reference types="seamless-immutable" />
import { Immutable, IMLayoutJson, LayoutInfo, IMAppLayouts, IMAppConfig, IMLayoutItemJson } from 'jimu-core';
/**
 * Remove the item id from its parent's content
 * @param layoutInfo
 * @param deleteFromLayout
 * @param layouts
 */
export declare function removeItemFromParent(layoutInfo: LayoutInfo, deleteFromLayout: boolean, layouts: IMAppLayouts): IMAppLayouts;
export declare function selectLayoutItem(layoutInfo: LayoutInfo, layouts: IMAppLayouts): Immutable.ImmutableObject<import("jimu-core").AppLayouts>;
export declare function disableSelectMode(layouts: IMAppLayouts): void;
export declare function createEmptyLayoutItem(layoutId: string, layouts: IMAppLayouts): {
    layoutInfo: LayoutInfo;
    layouts: IMAppLayouts;
};
export declare function findLayoutItem(appConfig: IMAppConfig, layoutInfo: LayoutInfo): IMLayoutItemJson;
export declare function getMaximumLayoutItemId(layoutMap: IMLayoutJson): number;
