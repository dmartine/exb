import * as appInBuilderModules from 'jimu-for-builder/for-app-inbuilder';
export declare function getModuleSync(module: string): any;
export declare function loadModule(module: string): Promise<any>;
export declare function loadModules(modules: string[]): Promise<any[]>;
/**
 * return http://....
 * @param module
 */
export declare function resolveModuleFullUrl(module: string): string;
/**
 * return /abc/123
 * @param module
 */
export declare function resolveModuleFullPath(module: string): string;
export declare function getAppInBuilderModules(): typeof appInBuilderModules;
