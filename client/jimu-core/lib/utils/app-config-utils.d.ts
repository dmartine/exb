import { WidgetContext, IMAppConfig, IMWidgetJson, WidgetJson, ContainerType } from '../types/app-config';
import { WidgetManifest } from '../types/manifest';
import { LayoutItemType } from '../types/layout';
import { BrowserSizeMode } from '../types/common';
export declare function getWidgetContext(uri: string): WidgetContext;
export declare function addWidgetManifestProperties(manifest: WidgetManifest): WidgetManifest;
export declare function addWidgetDefaultLabelAndIcon(appConfig: IMAppConfig, widgetJson: WidgetJson): void;
/**
 * we use <type_number> format to generate key.
 * @param type:
 */
export declare function getUniqueId(appConfig: IMAppConfig, type: 'page' | 'view' | 'section' | 'widget' | 'layout' | 'dialog' | 'dataSource'): string;
/**
 * we use `<label> <index>` format to generate unique label.
 * @param type:
 * @param label: the i18n label
 *
 */
export declare function getUniqueLabel(appConfig: IMAppConfig, type: 'page' | 'view' | 'section' | 'widget' | 'dialog' | 'layout', label: string): string;
export declare function getAllWidgets(appConfig: IMAppConfig): IMWidgetJson[];
/**
 * find a widget id that use the layoutId
 * @param appConfig
 * @param layoutId
 */
export declare function getWidgetIdThatUseTheLayoutId(appConfig: IMAppConfig, layoutId: string): string;
/**
 * Return the container that holds the widget, consider the widgets in layout widgets
 * @param appConfig
 * @param widgetId
 */
export declare function getWidgetOrSectionContainerInfo(appConfig: IMAppConfig, id: string, type: LayoutItemType, sizeMode: BrowserSizeMode): {
    type: ContainerType;
    id: string;
};
export * from './resource-utils';
export * from './layout-utils';
