import { AbstractDataAction } from '../base-data-action';
import { DataSource, DataRecord } from '../data-source/ds-base-types';
export default class ExportJson extends AbstractDataAction {
    name: string;
    isSupported(dataSource: DataSource, records: DataRecord[]): boolean;
    onExecute(dataSource: DataSource, records: DataRecord[]): Promise<boolean>;
}
