import { ImmutableObject } from 'jimu-core';
import { ILayerDefinition } from '@esri/arcgis-rest-types';
import { LayoutItemType, LayoutInfo } from './layout';
import { WidgetManifest } from './manifest';
export interface Size {
    width: number;
    height: number;
}
export declare enum BrowserSizeMode {
    Small = "SMALL",
    Medium = "MEDIUM",
    Large = "LARGE"
}
export interface BoundingBox {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
    width?: string;
    height?: string;
}
export declare type IMBoundingBox = ImmutableObject<BoundingBox>;
export declare enum JimuFieldType {
    String = "STRING",
    Number = "NUMBER",
    Date = "DATE"
}
export declare enum AjaxState {
    Fetching = "FETCHING",
    Success = "SUCCESS",
    Error = "ERROR"
}
export declare enum AppMode {
    Design = "DESIGN",
    Run = "RUN"
}
export declare enum WidgetState {
    Opened = "OPENED",
    Active = "ACTIVE",
    Closed = "CLOSED"
}
export interface Location {
    pathname: string;
    search: string;
    hash: string;
}
export declare enum LinkType {
    None = "NONE",
    Page = "PAGE",
    Dialog = "DIALOG",
    View = "VIEW",
    WebAddress = "WEB_ADDRESS"
}
export declare type LinkResult = {
    linkType: LinkType;
    value?: string;
};
export declare type LinkTo = string | Location | LinkResult;
export interface Resource {
    url: string;
    dependencies?: Resource[];
}
export declare enum WidgetType {
    Normal = "NORMAL",
    Layout = "LAYOUT",
    Controller = "CONTROLLER"
}
export interface LayoutItemConstructorProps {
    itemType: LayoutItemType;
    id?: string;
    layoutInfo?: LayoutInfo;
    isFromCurrentSizeMode?: boolean;
    name?: string;
    manifest: Partial<WidgetManifest>;
    label: string;
    path: string;
    icon: string;
}
export declare type EsriDateFormats = 'shortDate' | 'shortDateLE' | 'longMonthDayYear' | 'dayShortMonthYear' | 'longDate' | 'shortDateShortTime' | 'shortDateLEShortTime' | 'shortDateShortTime24' | 'shortDateLEShortTime24' | 'shortDateLongTime' | 'shortDateLELongTime' | 'shortDateLongTime24' | 'shortDateLELongTime24' | 'longMonthYear' | 'shortMonthYear' | 'year';
export interface EsriDateFormat {
    datePattern: string;
    timePattern?: string;
    selector: string;
}
export interface EsriDateFormatMap {
    [x: string]: EsriDateFormat;
}
export interface ServiceInfo {
    definition: ILayerDefinition;
    isHostedInSamePortal: boolean;
}
export declare enum PagePart {
    Header = "HEADER",
    Footer = "FOOTER",
    Body = "BODY"
}
