/// <reference types="react-intl" />
import { DataSource, IMDataSourceJson, InjectedIntl } from 'jimu-core';
export declare enum GeoType {
    Point = "POINT",
    Polyline = "POLYLINE",
    Polygon = "POLYGON"
}
export declare function getDsIcon(ds: DataSource | IMDataSourceJson, geoTypeInLayerDefinition?: string): any;
export declare function getDsTypeString(dsType: string, intl: InjectedIntl): string;
export declare function isFeatureLayerUrl(url: string): boolean;
export declare const FEATURE_LAYER_TYPE = "Feature Layer";
export declare function getDsJsonUrl(url: any, layer: any, addIdToEnd: any): string;
export declare function getSingleDsJsonFromLayer(url: any, dsJsonId: any, layer: any, addIdToEndOfUrl: any): IMDataSourceJson;
