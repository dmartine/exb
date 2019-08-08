import { LayoutJson, IMAppConfig, IMLayoutJson, IMSizeModeLayoutJson, IMLayoutItemJson, AppConfig } from '../types/app-config';
import { LayoutItemType, LayoutInfo } from '../types/layout';
import { BrowserSizeMode } from '../types/common';
export declare function fixLayoutIds(appConfig: AppConfig): void;
/**
 * Create the layout structure from layout configuration, assign content for each layout
 * @param layoutId
 * @param layoutJson
 */
export declare function generateLayoutStructure(layoutId: string, layoutJson: LayoutJson): LayoutJson;
export declare function cleanupRuntimeLayouts(layouts: {
    [layoutId: string]: LayoutJson;
}): {
    [layoutId: string]: LayoutJson;
};
export declare function getLayoutItemIds(appConfig: IMAppConfig, layoutId: string, withPending?: boolean): string[];
/**
 * return the widget ids in the layout. Do not consider the embedded layouts
 * @param layoutJson
 */
export declare function getWidgetsOrSectionsInLayout(layoutJson: IMLayoutJson, type: LayoutItemType, withPending?: boolean): string[];
export declare function getLayoutItemsInLayoutByType(layoutJson: IMLayoutJson, type: LayoutItemType, withPending?: boolean): LayoutInfo[];
/**
 * Return the widget/section ids in a layout, consider the layout widget only in the layout,
 * do not consider the normal widget that has embed layout,
 * do not consider the views in the section
 * @param appConfig
 * @param layoutId
 * @param type
 */
export declare function getWidgetsOrSectionsInLayoutWithLayoutWidgetOnly(appConfig: IMAppConfig, layoutId: string, type: LayoutItemType, sizeMode: BrowserSizeMode, withPending?: boolean): string[];
/**
 * Return the widget/section ids in a layout, consider the layout widget, the normal widget that has embed layout, and views
 * @param appConfig
 * @param layoutId
 * @param type
 */
export declare function getAllWidgetsOrSectionsInLayout(appConfig: IMAppConfig, layoutId: string, type: LayoutItemType, sizeMode: BrowserSizeMode, withPending?: boolean): string[];
/**
 * Return the pending widgets/sections.
 * The pending means: the widgets/sections are in layout's other mode but are not in the current mode (passed in).
 * @param appConfig
 * @param pageId
 * @param type
 * @param sizeMode
 */
export declare function getPendingLayoutItemsFromOtherSizeMode(appConfig: IMAppConfig, layout: IMSizeModeLayoutJson, sizeMode: BrowserSizeMode, thisWidgetIds?: any, thisSectionIds?: any): LayoutInfo[];
export declare function getPendingLayoutItemsInLayoutWithDeep(appConfig: IMAppConfig, layoutId: string, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Return the layout item that holds the widget. A widget is not allowed to be put in multiple items.
 * @param layoutJson
 * @param widgetId
 */
export declare function getWidgetOrSectionLayoutItem(layoutJson: IMLayoutJson, id: string, type: LayoutItemType): IMLayoutItemJson;
