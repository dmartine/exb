/// <reference types="react-intl" />
import { DataSource, IMDataSourceJson, ImmutableArray, InjectedIntl } from 'jimu-core';
import { AllDataSourceTypes } from './ds-types';
export declare function traverseGetToUseDss(parentDs: DataSource, toUseDss: DataSource[], toUseTypes: ImmutableArray<string>): void;
export declare function getWhetherUseDataSource(dsJson: IMDataSourceJson, toUseTypes: ImmutableArray<string>): boolean;
export declare function getToUseChildDss(rootDss: DataSource[], toUseTypes: ImmutableArray<string>): Promise<{
    [rootDsId: string]: DataSource[];
}>;
export declare enum GeoType {
    Point = "POINT",
    Polyline = "POLYLINE",
    Polygon = "POLYGON"
}
export declare function getGeoType(ds: DataSource): GeoType;
export declare function getDsIconType(dsType: any, geoType?: GeoType): string;
export declare function getDsIcon(ds: DataSource | IMDataSourceJson): any;
export declare function getDsTypeString(dsType: AllDataSourceTypes, intl: InjectedIntl): string;
export declare function getSortedKeys(obj: object): string[];
export declare function getSortedArrayByLabel<T extends {
    label: string;
}>(arr: T[]): T[];
export declare function getSortedLabels(labels: string[]): string[];
