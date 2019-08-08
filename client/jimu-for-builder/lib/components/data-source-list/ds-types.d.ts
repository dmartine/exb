import { DataSourceTypes as JimuCoreDataSourceTypes, IMDataSourceJson } from 'jimu-core';
import { ArcGISDataSourceTypes } from 'jimu-arcgis/arcgis-data-source-type';
import { HubDataSourceTypes } from 'hub-common/hub-data-source-type';
export declare const AllDataSourceTypes: typeof JimuCoreDataSourceTypes & typeof ArcGISDataSourceTypes & typeof HubDataSourceTypes;
export declare type AllDataSourceTypes = JimuCoreDataSourceTypes | ArcGISDataSourceTypes | HubDataSourceTypes;
export interface DataSourceJsonWithRootId {
    dataSourceJson: IMDataSourceJson;
    rootDataSourceId?: string;
}
