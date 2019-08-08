import { IField } from '@esri/arcgis-rest-types';
import { FieldSchema } from '../types/app-config';
import { CheckDoQueryOptions } from './ds-base-types';
export declare function convertFieldToJimuField(field: IField, fieldInfo: any): FieldSchema;
export declare function checkDoQuery(options: CheckDoQueryOptions): boolean;
