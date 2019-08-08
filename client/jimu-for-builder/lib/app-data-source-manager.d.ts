/// <reference types="seamless-immutable" />
import { DataSourceManager } from 'jimu-core';
export default class AppDataSourceManager extends DataSourceManager {
    static _instance: AppDataSourceManager;
    static getInstance(): AppDataSourceManager;
    protected getAppConfig(): import("seamless-immutable").ImmutableObject<import("jimu-core").AppConfig>;
}
