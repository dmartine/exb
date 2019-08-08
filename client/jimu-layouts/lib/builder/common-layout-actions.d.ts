import { LayoutItemConstructorProps, LayoutInfo, IMAppConfig, LayoutItemJson } from 'jimu-core';
export declare function pendLayoutItem(layoutInfo: LayoutInfo): void;
export declare function deleteWidget(widgetId: string): void;
export declare function deleteSection(sectionId: string): void;
export declare function findCorespondingLayoutItem(appConfig: IMAppConfig, target: LayoutItemJson, anotherLayoutId: string): LayoutInfo;
/**
 * Add widget or section to a layout, either dragging from the widget list or dragging an existing one.
 */
export declare function addItemToLayout(appConfig: IMAppConfig, item: LayoutItemConstructorProps | LayoutInfo, parentLayoutInfo: LayoutInfo, containerRect: ClientRect, itemRect: ClientRect, insertIndex?: number): Promise<{
    layoutInfo: LayoutInfo;
    updatedAppConfig: IMAppConfig;
}>;
