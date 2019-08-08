import { ImmutableObject, ImmutableArray } from 'seamless-immutable';
import { IMWidgetManifest, IMThemeManifest } from './manifest';
import { JimuFieldType, BoundingBox, Size, BrowserSizeMode } from './common';
import { LayoutItemType, LayoutType } from './layout';
import { IMAnalytics } from './tracking-manager';
import { ILayerDefinition, FieldType } from '@esri/arcgis-rest-types';
import { IMThemeVariables } from './theme';
/**
 * This is an internal concept. A container has a layout object (size mode layout) to hold widget/widget.
 *
 * A widget has layout/layout widget is not a container, it's a parent widget of the widget in it's layout
 */
export declare enum ContainerType {
    Page = "pages",
    View = "views",
    Dialog = "dialogs",
    Header = "header",
    Footer = "footer"
}
export interface WidgetContext {
    /**
    * absolute URL point to widget folder, like this: http://.../widgets/abc/
    *
    * If you need to use fetch to load something in widget, you can use this *folderUrl*.
    * If you need to use systemjs to load some modules, please use *uri*.
    */
    folderUrl: string;
    isRemote: boolean;
}
export interface LayoutItemJson {
    id?: string;
    bbox?: BoundingBox;
    type?: LayoutItemType;
    setting?: any;
    widgetId?: string;
    sectionId?: string;
    isPlaceholder?: boolean;
    isPending?: boolean;
}
export declare type IMLayoutItemJson = ImmutableObject<LayoutItemJson>;
export interface LayoutJson {
    id: string;
    order?: string[];
    type?: LayoutType;
    content?: {
        [layoutItemId: string]: IMLayoutItemJson;
    };
    setting?: any;
}
export interface AppLayouts {
    [layoutId: string]: LayoutJson;
}
export declare type IMAppLayouts = ImmutableObject<AppLayouts>;
export declare type IMLayoutJson = ImmutableObject<LayoutJson>;
export declare type IMWidgetContext = ImmutableObject<WidgetContext>;
export interface UseDataSource {
    dataSourceId: string;
    /**
     * the data source a widget uses may be a sub data source of another data source,
     * so we save the root data source id here so we can create data source easily.
     */
    rootDataSourceId?: string;
    /**
     * jimu field name array.
     * If no fields, means the widget can work with any field.
     */
    fields?: ImmutableArray<string>;
    /**
     * key is used in the expression, such as {$key.fieldName}
     */
    key?: string;
    /**
     * inherit means will get the data source from context
     */
    isInherited?: boolean;
    inheritFromWidgetId?: string;
}
export declare type IMUseDataSource = ImmutableObject<UseDataSource>;
export interface WidgetJsonWithoutConfig {
    id: string;
    icon: string;
    label: string;
    visible: boolean;
    index?: number;
    uri: string;
    itemId?: string;
    context: IMWidgetContext;
    manifest: IMWidgetManifest;
    _originManifest: IMWidgetManifest;
    version: string;
    useDataSources?: ImmutableArray<IMUseDataSource>;
    useDataSourcesEnabled?: boolean;
    outputDataSources?: ImmutableArray<string>;
    widgets?: ImmutableArray<string>;
    /**
     * for widget that has embedded layout, the name is declared in manifest.json.
     * If there is not layouts declared in manifest, the name is default.
     */
    layouts?: ImmutableObject<{
        [name: string]: IMSizeModeLayoutJson;
    }>;
}
export declare const DEFAULT_EMBED_LAYOUT_NAME = "DEFAULT";
export interface WidgetJson extends WidgetJsonWithoutConfig {
    config: any;
}
export declare type IMWidgetJson = ImmutableObject<WidgetJson>;
export interface SizeModeLayoutJson {
    [sizeMode: string]: string;
}
export declare type IMSizeModeLayoutJson = ImmutableObject<SizeModeLayoutJson>;
export interface AbstractContainerJson {
    layout: IMSizeModeLayoutJson;
    backgroundColor?: string;
    backgroundIMage?: string;
    backgroundPosition?: string;
}
export declare type IMAbstractContainerJson = ImmutableObject<AbstractContainerJson>;
export interface SectionJson {
    id: string;
    visible?: boolean;
    label: string;
    icon: string;
    views: ImmutableArray<string>;
}
export declare type IMSectionJson = ImmutableObject<SectionJson>;
export interface ViewJson extends AbstractContainerJson {
    id: string;
    label: string;
    mobileTheresholdSize?: {
        width?: number;
        height?: number;
    };
    desktopThresholdSize?: {
        width?: number;
        height?: number;
    };
    mobileLayoutCompact?: string;
    desktopLayoutCompact?: string;
}
export declare type IMViewJson = ImmutableObject<ViewJson>;
export interface SizeModePageHeightInBuilder {
    [sizeMode: string]: number;
}
export declare enum PageType {
    Normal = "NORMAL",
    Folder = "FOLDER",
    Link = "LINK"
}
export declare enum PageMode {
    /**
     * width, height = 100%
     */
    FitWindow = "FIT_WINDOW",
    /**
     * width = <>px | 100%,
     * height = auto
     */
    AutoScroll = "AUTO_SCROLL"
}
export interface PageJson extends AbstractContainerJson {
    id: string;
    label: string;
    type: PageType;
    icon: string;
    header: boolean;
    footer: boolean;
    mode: PageMode;
    maxWidth?: number;
    heightInBuilder?: SizeModePageHeightInBuilder;
    linkUrl?: string;
    openTarget?: string;
    isVisible: boolean;
    isDefault: boolean;
    bodyBackgroundColor?: string;
    bodyBackgroundIMage?: string;
    bodyBackgroundPosition?: string;
}
export declare type IMPageJson = ImmutableObject<PageJson>;
export interface DialogJson extends AbstractContainerJson {
    id: string;
    label: string;
    icon: string;
    width?: number | string;
    height?: number | string;
}
export declare type IMDialogJson = ImmutableObject<DialogJson>;
export interface HeaderJson extends AbstractContainerJson {
    height: {
        [sizeMode: string]: number | string;
    };
}
export declare type IMHeaderJson = ImmutableObject<HeaderJson>;
export interface FooterJson extends AbstractContainerJson {
    height: {
        [sizeMode: string]: number | string;
    };
}
export declare type IMFooterJson = ImmutableObject<FooterJson>;
export declare type DateFormat = 'shortDate' | 'shortDateLE' | 'longMonthDayYear' | 'dayShortMonthYear' | 'longDate' | 'shortDateShortTime' | 'shortDateLEShortTime' | 'shortDateShortTime24' | 'shortDateLEShortTime24' | 'shortDateLongTime' | 'shortDateLELongTime' | 'shortDateLongTime24' | 'shortDateLELongTime24' | 'longMonthYear' | 'shortMonthYear' | 'year';
export interface FieldFormatSchema {
    dateFormat?: DateFormat;
    digitSeparator?: boolean;
    places?: number;
}
export declare type IMFieldFormatSchema = ImmutableObject<FieldFormatSchema>;
export interface FieldSchema {
    /**
     * widget should use this name to read data.
     * In fact, the jimuName is the field name when the first mapping is configured.
     */
    jimuName: string;
    type: JimuFieldType;
    esriType: FieldType;
    /**
     * this is the actual field name of the current data service.
     */
    name: string;
    alias?: string;
    description?: string;
    format?: IMFieldFormatSchema;
}
export declare type IMFieldSchema = ImmutableObject<FieldSchema>;
export interface DataSourceSchema {
    label?: string;
    childId?: string;
    jimuChildId?: string;
    fields?: {
        [jimuName: string]: FieldSchema;
    };
    /** for ds set
     * In fact, the jimuChildId is the child id when the first mapping is configured.
     */
    childSchemas?: {
        [jimuChildId: string]: DataSourceSchema;
    };
    query?: any;
    layerDefinition?: ILayerDefinition;
}
export declare type IMDataSourceSchema = ImmutableObject<DataSourceSchema>;
export interface ReversedDataSourceSchema {
    label?: string;
    childId?: string;
    jimuChildId?: string;
    fields?: {
        [fieldName: string]: FieldSchema[];
    };
    childSchemas?: {
        [childId: string]: ReversedDataSourceSchema[];
    };
    layerDefinition?: ILayerDefinition;
}
export interface DataSourceJson {
    id: string;
    label: string;
    type: string;
    isOutputFromWidget?: boolean;
    url?: string;
    portalUrl?: string;
    itemId?: string;
    layerId?: string;
    layers?: ImmutableArray<IMDataSourceLayerJson>;
    originDataSourceId?: string;
    /**
     * If no mapping is configured, we dont' save DS schema here, the reason is: we can fetch the updated schema when schema is changed in other place, such as mapviewer, server
     *
     * After mapping is configured:
     *    * For data source, we save the mapped fields info only, this means, for non-mapped fields, we still can fetch updating.
     *    * for data source set, we save the mapped layers only, this means, for non-mapped layers, we still can fetch updating.
    */
    schema?: IMDataSourceSchema;
    data?: object[];
    [key: string]: any;
}
export declare type IMDataSourceJson = ImmutableObject<DataSourceJson>;
export interface DataSourceLayerJson {
    id: string;
    title: string;
    url: string;
}
export declare type IMDataSourceLayerJson = ImmutableObject<DataSourceLayerJson>;
export interface ActionJson {
    actionId: string;
    description: string;
    widgetId: string;
    messageWidgetId: string;
    actionName: string;
    config: any;
}
export declare type IMActionJson = ImmutableObject<ActionJson>;
export interface MessageJson {
    widgetId: string;
    messageType: String;
    actions: ImmutableArray<IMActionJson>;
}
export declare type IMMessageJson = ImmutableObject<MessageJson>;
export interface AttributesJson {
    title?: string;
    description?: string;
    tags?: string[];
    /**
     * These attributes are for arcgis only, so they should be defined in jimu-arcgis.
     * The reason that We put them here is: we can see a full app config in one place.
     */
    portalUrl?: string;
    clientId?: string;
    geometryService?: string;
}
export declare type IMAttributesJson = ImmutableObject<AttributesJson>;
export interface HubJson {
    community: {
        portalUrl: string;
        orgId?: string;
    };
    initiative?: string;
}
export declare type IMHubJson = ImmutableObject<HubJson>;
export declare type CustomThemeJson = Partial<IMThemeVariables>;
export declare type IMCustomThemeJson = ImmutableObject<CustomThemeJson>;
export interface ForBuilderAttributes {
    viewPortSize: ImmutableObject<{
        [browserSizeMode: string]: ImmutableObject<Size>;
    }>;
}
export declare type IMForBuilderAttributes = ImmutableObject<ForBuilderAttributes>;
export interface AppConfig {
    template: string;
    mainSizeMode: BrowserSizeMode;
    pages: ImmutableObject<{
        [pageId: string]: IMPageJson;
    }>;
    pageStructure: ImmutableArray<ImmutableObject<{
        [pageId: string]: ImmutableArray<string>;
    }>>;
    dialogs: ImmutableObject<{
        [dialogId: string]: IMDialogJson;
    }>;
    layouts: ImmutableObject<{
        [layoutId: string]: IMLayoutJson;
    }>;
    sections?: ImmutableObject<{
        [sectionId: string]: IMSectionJson;
    }>;
    views?: ImmutableObject<{
        [viewId: string]: IMViewJson;
    }>;
    widgets: ImmutableObject<{
        [widgetId: string]: IMWidgetJson;
    }>;
    header: IMHeaderJson;
    footer: IMFooterJson;
    theme: string;
    customTheme?: IMCustomThemeJson;
    dataSources?: ImmutableObject<{
        [dsId: string]: IMDataSourceJson;
    }>;
    messages?: ImmutableArray<IMMessageJson>;
    hub?: IMHubJson;
    attributes: IMAttributesJson;
    analytics: IMAnalytics;
    widgetsManifest: ImmutableObject<{
        [widgetUri: string]: IMWidgetManifest;
    }>;
    themeManifest?: IMThemeManifest;
    preloadWidgets?: ImmutableArray<string>;
    exbVersion: string;
    __not_publish: boolean;
    forBuilderAttributes: IMForBuilderAttributes;
}
export declare type IMAppConfig = ImmutableObject<AppConfig>;
