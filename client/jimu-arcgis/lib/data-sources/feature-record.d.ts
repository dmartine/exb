import { DataSource, AbstractDataRecord } from 'jimu-core';
export declare class FeatureDataRecord extends AbstractDataRecord {
    feature: __esri.Graphic;
    dataSource: DataSource;
    constructor(feature: __esri.Graphic, dataSource: DataSource, isOriginData?: boolean);
    getData(): any;
    getOriginData(): __esri.Graphic;
    toJson(): any;
    getId(): string;
    setId(id: string): void;
    getGeometry(): any;
}
