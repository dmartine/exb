import { AppConfig } from '../types/app-config';
export interface ReplaceOperator {
    matchFunction: any;
    matchHandle: any;
}
export declare function appendTokenToResource(appConfig: AppConfig, token: string, portalUrl: string): Promise<AppConfig>;
export declare function cleanTokenFromResource(appConfig: AppConfig): AppConfig;
export declare function replaceAppConfigNodeValue(appConfig: AppConfig, replaceOperator: ReplaceOperator): Promise<AppConfig>;
