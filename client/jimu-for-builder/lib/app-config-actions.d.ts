import { IMAppConfig, IMAttributesJson, IMCustomThemeJson, IMDataSourceJson, IMDialogJson, IMFooterJson, IMHeaderJson, IMLayoutJson, IMMessageJson, IMPageJson, IMViewJson, IMSectionJson, IMWidgetJson, LayoutInfo, LayoutType, IMLayoutItemJson, BrowserSizeMode, IMThemeManifest, Size } from 'jimu-core';
export declare const DEFAULT_EMBED_LAYOUT_NAME = "DEFAULT";
export declare function getAppConfigAction(appConfig?: IMAppConfig): AppConfigAction;
export declare class AppConfigAction {
    appConfig: IMAppConfig;
    constructor(appConfig: IMAppConfig);
    exec(): this;
    editWidgetConfig(widgetId: string, widgetConfig: any): this;
    createLayoutForSizeModeForHeader(sizeMode: BrowserSizeMode, fromSizeMode: BrowserSizeMode): this;
    removeSizeModeLayoutFromHeader(sizeMode: BrowserSizeMode): this;
    createLayoutForSizeModeForFooter(sizeMode: BrowserSizeMode, fromSizeMode: BrowserSizeMode): this;
    removeSizeModeLayoutFromFooter(sizeMode: BrowserSizeMode): this;
    createLayoutForSizeModeForPageBody(sizeMode: BrowserSizeMode, fromSizeMode: BrowserSizeMode, pageId: string): this;
    removeSizeModeLayoutFromPageBody(pageId: string, sizeMode: BrowserSizeMode): this;
    editWidget(widgetJson: IMWidgetJson): this;
    /**
     * Add the item into layout, return the new layout info.
     * If the item (widget/section) has embed layout, and the layout does not exist in the current sizeMode, we'll create a new one for them.
     * @param layoutId
     * @param item
     * @param insertIndex
     */
    addItemIntoLayout(layoutId: string, item: IMLayoutItemJson, insertIndex: number): LayoutInfo;
    /**
     * Return the new layout info
     * @param fromLayoutInfo
     * @param toLayoutInfo
     * @param containerRect
     * @param itemRect
     * @param insertIndex
     */
    moveLayoutItemToAnotherLayout(fromLayoutInfo: LayoutInfo, toLayoutInfo: LayoutInfo, containerRect: ClientRect, itemRect: ClientRect, insertIndex: number): LayoutInfo;
    editSubWidgetsInheritProperty(parentWidgetId: string, propertyName: string, propertyValue: any, uniqueIdField?: string, oldPropertyValue?: any): this;
    editSubWidgetsProperty(parentWidgetId: string, propertyName: string, propertyValue: any): this;
    setLayoutItemToPending(layoutInfo: LayoutInfo, value: boolean): this;
    /**
     *
     * @param layoutInfo
     * @param removeContent false, remove layout item only. true, remove the widget/section in the layout item
     * @param removeAllSizeModeContent  valid only when removeContent = true.
     *  false, remove the content in the current size mode only.
     *  true, remove the content in all size mode.
     */
    removeLayoutItem(layoutInfo: LayoutInfo, removeContent: boolean, removeAllSizeModeContent?: boolean): this;
    removeWidget(widgetId: string, removeItemsInOtherSizeMode: boolean): this;
    removeView(viewId: string, sectionId: string, removeItemsInOtherSizeMode: boolean): this;
    removeSection(sectionId: string, removeItemsInOtherSizeMode: boolean): this;
    removeLayout(layoutId: string, removeContent: boolean): this;
    /**
     * reset the layout to an empty layout
     * if a layout item's content(widget or section) has more than one ref, the content will not be remove even though removeContent is true.
     * @param layoutId
     * @param removeContent
     *
     */
    resetLayout(layoutId: string, removeContent: boolean, changeSelectionNull?: boolean): this;
    duplicateLayoutItem(originLayoutId: string, desLayoutId: string, itemId: string, duplicateContent: boolean): this;
    duplicateLayoutToLayout(originLayoutId: string, desLayoutId: string, duplicateContent: boolean): this;
    private doDuplicateLayoutItem;
    editWidgetProperty(widgetId: string, prop: string, val: any): this;
    editPage(pageJson: IMPageJson): this;
    /**
     *
     * @param pageJson
     * @param pageLayoutJsons the new page layout is from page template
     * @param widgetJsons the layout may use some layout widgets, put them here
     */
    addPage(pageJson: IMPageJson, pageLayoutJsons?: IMLayoutJson[], widgetJsons?: IMWidgetJson[], sectionJsons?: IMSectionJson[], viewJsons?: IMViewJson[]): this;
    duplicateView(viewId: string, sectionId: string): this;
    duplicatePage(pageId: string, newPageId: string): this;
    editPageProperty(pageId: string, prop: string, val: any): this;
    movePageIntoPage(subPageId: string, parentPageId: string): this;
    orderPageToPage(pageId: string, targetPageId: string, type: 'top' | 'bottom'): this;
    removePage(pageId: string): this;
    setHomePage(pageId: string): this;
    setViewportSize(browserSizeMode: BrowserSizeMode, size: Size): this;
    replaceHomePage(pageId: string): this;
    editDialog(dialogJson: IMDialogJson): this;
    addDialog(dialogJson: IMDialogJson, dialogLayoutJsons?: IMLayoutJson[]): this;
    removeDialog(dialogId: string): this;
    editSection(sectionJson: IMSectionJson): this;
    editSectionProperty(sectionId: string, prop: string, val: any): this;
    editView(viewJson: IMViewJson): this;
    addView(viewJson: IMViewJson, sectionId: string, viewLayoutJsons?: IMLayoutJson[]): this;
    addMessage(messageJson: IMMessageJson): this;
    editMessage(messageJson: IMMessageJson): this;
    removeMessage(messageJson: IMMessageJson): this;
    addDataSource(dataSourceJson: IMDataSourceJson): this;
    addDataSources(dataSourceJsons: IMDataSourceJson[]): this;
    removeDataSource(dataSourceId: string): this;
    editDataSource(dataSourceJson: IMDataSourceJson): this;
    editAttributes(attributesJson: IMAttributesJson): this;
    editTheme(themeName: string, themeManifest?: IMThemeManifest): this;
    editCustomTheme(customTheme: IMCustomThemeJson): this;
    editHeader(headerJson: IMHeaderJson, headerLayoutJsons?: IMLayoutJson[]): this;
    editFooter(footerJson: IMFooterJson, footerLayoutJsons?: IMLayoutJson[]): this;
    editLayoutSetting(layoutInfo: LayoutInfo, setting: any): this;
    editLayoutType(layoutInfo: LayoutInfo, type: LayoutType): this;
    editLayoutItemSetting(layoutInfo: LayoutInfo, setting: any): this;
    editLayoutItemBBox(layoutInfo: LayoutInfo, bbox: any): this;
    editLayoutItemIndex(layoutInfo: LayoutInfo, parentLayoutInfo: LayoutInfo, newIndex: number): this;
    editLayoutContent(layoutInfo: LayoutInfo, content: Array<string>): this;
    editLayoutBBox(layoutInfo: LayoutInfo, bbox: any): this;
    editLayoutOrder(layoutInfo: LayoutInfo, order: Array<string>): this;
    addLayout(layoutJson: IMLayoutJson): this;
    duplicateLayout(layoutId: string, duplicateContent: boolean): this;
    duplicateWidget(widgetId: string, layoutId: string): LayoutInfo;
    duplicateSection(sectionId: string, layoutId: string): LayoutInfo;
    updateWidgetPropertiesWhenAddWidgetIntoLayout(widgetId: string, toLayoutId: string): this;
    /**
     * When widget is moved between layout, widget MAY be moved into/out from another widget (like list).
     * When the widget is moved into another widget (like list), it needs to inherit the data source info from the containing widget.
     * When it's moved out, we need to remove the inherited data source.
     * @param fromLayoutInfo the layout into that holding the widget
     * @param toLayoutId the layout that the widget is moving to
     */
    private updateWidgetPropertiesBeforeChangingLayout;
    /**
     * this won't really remove a property, instead, set the 'isInherited' to false
     * @param widgetJson
     * @param propertyName
     */
    private removeInheritedProperty;
    private addInheritedProperty;
    private processPropertiesWhenAddIntoParentWidget;
    private doDuplicateLayout;
    private getDuplicateLabel;
    /**
     * create section only, does not add into layout
     */
    createSection(): string;
    createWidget(widgetJson: IMWidgetJson): this;
    clearEmptyRowInFlowLayout(removedLayoutInfo: LayoutInfo): this;
    private adjustIndexOfLayoutItem;
    /**
     * create the layout for the current size mode only
     * @param widgetJson
     * @param sizeMode
     */
    private createLayoutsForWidget;
    private removePageFromPageStructure;
    /**
     * Duplicate the container content, return the new layout that hold the duplicated contents
     * @param containerType
     * @param id
     */
    private doDuplicateContainerContent;
    private doDuplicateEmbedWidgetContent;
    private doDuplicateSectionViews;
    private createEmptyLayoutJson;
    private createLayoutForSizeModeForOneLayout;
    private movePageIntoPageForPageStructure;
    /**
     *
     * @param containerType
     * @param id
     * @param sizeMode If passed in, remove the content in the size mode only, else remove all content
     */
    private removeContainerContent;
    private getContainerJson;
    private removeSectionContent;
    private updateLayout;
    private updateLayoutItem;
    private transformLayout;
    private removeWidgetMessageAndAction;
}
