import { WidgetContext, IMAppConfig, IMWidgetJson, WidgetJson, AppConfig, LayoutItemJson } from '../types/app-config';
import { LayoutItemType, LayoutInfo } from '../types/layout';
import { WidgetManifest } from '../types/manifest';
import { BrowserSizeMode } from '../types/common';
export declare function getWidgetContext(uri: string): WidgetContext;
export declare function addWidgetManifestProperties(manifest: WidgetManifest): WidgetManifest;
export declare function addWidgetDefaultLabelAndIcon(appConfig: IMAppConfig, widgetJson: WidgetJson): void;
export declare function getAllWidgets(appConfig: IMAppConfig): IMWidgetJson[];
export declare function getWidgetsByName(appConfig: IMAppConfig, widgetName: string): IMWidgetJson[];
export declare function getCleanAppConfig(appConfig: IMAppConfig): any;
/**
 * we use <type_number> format to generate key.
 * @param type:
 */
export declare function getUniqueId(appConfig: IMAppConfig, type: 'page' | 'view' | 'section' | 'widget' | 'layout' | 'dialog' | 'dataSource'): string;
/**
 * find a embed widget id that the widget layouts include the layoutId
 * @param appConfig
 * @param layoutId
 */
export declare function getWidgetIdUsedLayoutId(appConfig: IMAppConfig, layoutId: string): string;
/**
 * find a embed widget id that the widget layouts content include the widgetId
 * @param appConfig
 * @param widgetId
 */
export declare function getWidgetIdUsedWidgetOrSection(appConfig: IMAppConfig, widgetId: string, type: LayoutItemType): string;
export declare function getLayoutItemInLayoutBySectionOrWidget(appConfig: IMAppConfig, contentId: string, layoutId: string, type: LayoutItemType): LayoutItemJson;
export declare function getLayoutInfosByWidgetOrSectionCurrentBrowserSizeMode(appConfig: IMAppConfig, contentId: string, type: LayoutItemType): LayoutInfo[];
/**
 * find all layout items that the content id, section or widget, is equal to each other in the  layout
 * @param appConfig
 * @param layoutInfo
 * @param embedWId
 */
export declare function getLayoutItemsInLayoutByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, layoutId: string): LayoutItemJson[];
export declare function getBrowserSizeModeInWidgetByLayoutId(appConfig: IMAppConfig, layoutId: string, widgetId: string): BrowserSizeMode;
/**
 * find all layoutInfos that the content id, section or widget, is equal to each other in the embed widget on runtime browserSizeMode
 *
 * if notSearchEmbed is false, this function will also search the pareent widget's embed widget
 *
 * if browserSizeMode is not defined, this function will search on current browserSizeMode.
 *
 * @param appConfig
 * @param layoutInfo
 * @param parentWId
 * @param notSearchEmbed
 */
export declare function getLayoutInfosInWidgetByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, parentWId: string, notSearchEmbed?: boolean, browserSizeMode?: BrowserSizeMode): LayoutInfo[];
/**
 * find all layout items that the content id, section or widget, is equal to each other in the embed widget on runtime browserSizeMode
 *
 * if notSearchEmbed is false, this function will also search the pareent widget's embed widget
 *
 * if browserSizeMode is not defined, this function will search on current browserSizeMode.
 *
 * @param appConfig
 * @param layoutInfo
 * @param parentWId
 * @param notSearchEmbed
 */
export declare function getLayoutItemsInWidgetByLayoutInfo(appConfig: IMAppConfig, layoutInfo: LayoutInfo, parentWId: string, notSearchEmbed?: boolean, browserSizeMode?: BrowserSizeMode): LayoutItemJson[];
export declare function isFirstAspectPage(appConfig: IMAppConfig, pageId: string): boolean;
export declare function hasSubPage(appConfig: IMAppConfig, pageId: string): boolean;
export declare function getRealPageCount(appConfig: IMAppConfig): number;
export declare function getSubRealPageCount(appConfig: IMAppConfig, parentPageId: string): number;
export declare function getRealPageCountAfterRemoved(appConfig: IMAppConfig, pageId: string): number;
export declare function isRealPage(appConfig: IMAppConfig, pageId: string): boolean;
export declare function getWidgetContainerInfo(appConfig: IMAppConfig, widgetId: string): {
    type: string;
    id: string;
};
export declare function getSectionIdsInPage(appConfig: IMAppConfig, pageId: string): string[];
export declare function getSectionIdsInView(appConfig: IMAppConfig, viewId: string): string[];
export declare function getViewIdsInSection(appConfig: IMAppConfig, sectionId: string): string[];
export declare function getWidgetContainerSectionIds(appConfig: IMAppConfig, widgetId: string): string[];
/**
 * we use `<label> <index>` format to generate unique label.
 * @param type:
 * @param label: the i18n label
 *
 */
export declare function getUniqueLabel(appConfig: IMAppConfig, type: 'page' | 'view' | 'section' | 'widget' | 'dialog' | 'layout', label: string): string;
export * from './layout-utils';
export interface ReplaceOperator {
    matchFunction: any;
    matchHandle: any;
}
export declare function appendTokenToResource(appConfig: AppConfig, token: string, portalUrl: string): Promise<AppConfig>;
export declare function cleanTokenFromResource(appConfig: AppConfig): AppConfig;
export declare function replaceAppConfigNodeValue(appConfig: AppConfig, replaceOperator: ReplaceOperator): Promise<AppConfig>;
