import { IMAppConfig, LayoutItemType, LayoutInfo, appConfigUtils, BrowserSizeMode, LayoutItemJson, PagePart } from 'jimu-core';
declare const getAllWidgetsOrSectionsInLayout: typeof appConfigUtils.getAllWidgetsOrSectionsInLayout, getPendingLayoutItemsFromOtherSizeMode: typeof appConfigUtils.getPendingLayoutItemsFromOtherSizeMode, getPendingLayoutItemsInLayoutWithDeep: typeof appConfigUtils.getPendingLayoutItemsInLayoutWithDeep, getWidgetsOrSectionsInLayoutWithLayoutWidgetOnly: typeof appConfigUtils.getWidgetsOrSectionsInLayoutWithLayoutWidgetOnly, getWidgetOrSectionContainerInfo: typeof appConfigUtils.getWidgetOrSectionContainerInfo, getWidgetOrSectionLayoutItem: typeof appConfigUtils.getWidgetOrSectionLayoutItem, cleanupRuntimeLayouts: typeof appConfigUtils.cleanupRuntimeLayouts, getLayoutItemIds: typeof appConfigUtils.getLayoutItemIds, getUniqueId: typeof appConfigUtils.getUniqueId, getUniqueLabel: typeof appConfigUtils.getUniqueLabel, getWidgetsOrSectionsInLayout: typeof appConfigUtils.getWidgetsOrSectionsInLayout, getWidgetIdThatUseTheLayoutId: typeof appConfigUtils.getWidgetIdThatUseTheLayoutId;
export { getAllWidgetsOrSectionsInLayout, getPendingLayoutItemsFromOtherSizeMode, getPendingLayoutItemsInLayoutWithDeep, getWidgetsOrSectionsInLayoutWithLayoutWidgetOnly, getWidgetOrSectionContainerInfo, getWidgetOrSectionLayoutItem, cleanupRuntimeLayouts, getLayoutItemIds, getUniqueId, getUniqueLabel, getWidgetsOrSectionsInLayout, getWidgetIdThatUseTheLayoutId };
/**
 * Return the pending widgets/sections from other size mode.
 * The pending means: the widgets/sections are in page's other mode but are not in the current mode (passed in)
 * @param appConfig
 * @param pageId
 * @param type
 * @param sizeMode
 */
export declare function getPendingLayoutItemsFromOtherSizeModeInPage(appConfig: IMAppConfig, pageId: string, sizeMode: BrowserSizeMode, pagePart: PagePart): LayoutInfo[];
/**
 * Return the pending widgets/sections in the current size mode.
 * @param appConfig
 * @param pageId
 * @param sizeMode
 * @param pagePart
 */
export declare function getPendingLayoutItemsInPage(appConfig: IMAppConfig, pageId: string, sizeMode: BrowserSizeMode, pagePart: PagePart): LayoutInfo[];
/**
 * Return the widget/section ids in the page, consider the sections/widgets in layout widget
 * @param appConfig
 * @param pageId
 */
export declare function getWidgetsOrSectionsInPageBody(appConfig: IMAppConfig, pageId: string, type: LayoutItemType): string[];
export declare function getWidgetsOrSectionsInPageHeader(appConfig: IMAppConfig, type: LayoutItemType): string[];
export declare function getWidgetsOrSectionsInPageFooter(appConfig: IMAppConfig, type: LayoutItemType): string[];
/**
 * Return the section ids in the view, consider the sections in layout widget
 * @param appConfig
 * @param viewId
 */
export declare function getWidgetsOrSectionsInView(appConfig: IMAppConfig, viewId: string, type: LayoutItemType): string[];
/**
 * Return the widget/section ids that in the same container with the widget
 * @param appConfig
 * @param widgetId
 */
export declare function getWidgetsOrSectionsInTheSameContainer(appConfig: IMAppConfig, id: string, type: LayoutItemType, retType: LayoutItemType, sizeMode: BrowserSizeMode): string[];
export declare function isFirstLevelPage(appConfig: IMAppConfig, pageId: string): boolean;
export declare function isPageHasSubPage(appConfig: IMAppConfig, pageId: string): boolean;
export declare function getRealPageCount(appConfig: IMAppConfig): number;
export declare function getSubRealPageCount(appConfig: IMAppConfig, parentPageId: string): number;
/**
 * Exclude the passed in page and it's sub pages.
 * @param appConfig
 * @param pageId the page that is excluded
 */
export declare function getRealPageCountExcludeOnePage(appConfig: IMAppConfig, pageId: string): number;
export declare function isRealPage(appConfig: IMAppConfig, pageId: string): boolean;
/**
 * Find a widget id (parent widget id) that the widget layout contains the widgetId/sectionId.
 * We dont consider the layout widget
 * Return the direct parent only.
 * @param appConfig
 * @param id
 */
export declare function getParentWidgetIdOfWidgetOrSection(appConfig: IMAppConfig, id: string, type: LayoutItemType, sizeMode: BrowserSizeMode): string;
/**
 * Return the layoutInfo for the widget/section, there may be multiple layoutInfos for the widget/section.
 *
 * One widget/section is allowed to be put in one layout only one time, but it's allowed be put in multile layouts.
 * There are 2 cases for multiple layouts:
 *    * One widget/section is allowed to be put in multiple size mode (this function is for one size mode only, so we don't consider this case)
 *    * In one size mode, one widget (i.e. List widget) may have multiple state layouts to hold the same widget.
 * @param appConfig
 * @param contentId
 * @param type
 */
export declare function getWidgetOrSectionLayoutInfosInOneSizeMode(appConfig: IMAppConfig, contentId: string, type: LayoutItemType, sizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Return the size mode of the layout. Because under one size mode.
 * Only widget may have multiple layouts, and this function is used only for widgets that have layouts, so pass widget id to make the search easy.
 * @param appConfig
 * @param layoutId
 * @param widgetId
 */
export declare function getBrowserSizeModeByLayoutIdAndWidgetId(appConfig: IMAppConfig, layoutId: string, widgetId: string): BrowserSizeMode;
/**
 * find all layoutInfos that the content id, section or widget, is equal to each other in the widget on the browserSizeMode
 *
 * @param appConfig
 * @param layoutInfo
 * @param parentWId
 * @param sizeMode
 */
export declare function getLayoutInfosInWidgetByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, parentWId: string, sizeMode: BrowserSizeMode): LayoutInfo[];
export declare function getLayoutInfosInWidgetByWidgetOrSectionId(appConfig: IMAppConfig, id: string, type: LayoutItemType, parentWId: string, browserSizeMode: BrowserSizeMode): LayoutInfo[];
/**
 * Same as `getLayoutInfosInWidgetByLayoutInfo`, but return the layout items
 * @param appConfig
 * @param layoutInfo
 * @param parentWId
 * @param browserSizeMode
 */
export declare function getLayoutItemsInWidgetByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, parentWId: string, browserSizeMode: BrowserSizeMode): LayoutItemJson[];
export declare function getCleanAppConfig(appConfig: IMAppConfig): any;
/**
 * In one layout, one widget/section is NOT allowed be put in more than one layout item.
 * However, in widget that has layouts, one widget/section may be put in multiple layouts.
 *
 * if `sizeMode` is passed in, return the items in the size mode only, else return all items
 * @param appConfig
 * @param type
 * @param id
 * @param sizeMode
 */
export declare function getLayoutItemsHoldWidgetOrSection(appConfig: IMAppConfig, type: LayoutItemType, id: string, sizeMode?: BrowserSizeMode): LayoutInfo[];
