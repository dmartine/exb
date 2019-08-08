import { IFeature } from '@esri/arcgis-rest-types';
import { DataSource, AbstractDataRecord } from './ds-base-types';
export declare class FeatureDataRecord extends AbstractDataRecord {
    feature: IFeature;
    dataSource: DataSource;
    constructor(feature: IFeature, dataSource: DataSource, isOriginData?: boolean);
    private fillGeometry;
    getData(): {
        [key: string]: any;
    };
    getOriginData(): IFeature;
    toJson(): IFeature;
    getId(): string;
    setId(id: string): void;
    getGeometry(): import("@esri/arcgis-rest-types").IGeometry;
}
