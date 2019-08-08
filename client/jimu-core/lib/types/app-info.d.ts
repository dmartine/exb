export interface AppInfo {
    appType: 'JimuApp';
    stemappName: 'stemapp';
    appPath: string;
    id: string;
    name: string;
    isPredefined: boolean;
    isTemplate: boolean;
    isTemplateApp: boolean;
}
export interface AppCreationInfo {
    template: string;
    name: string;
    description: string;
    tags?: string[];
    folder?: string;
    shareWithWebmap?: boolean;
    shareWithWebscene?: boolean;
    webmap?: string;
    webscene?: string;
}
