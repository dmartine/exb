import { IMState } from './types/state';
export declare function init(): Promise<void>;
export declare function initPortal(): Promise<any>;
/**
 *
 * @param state load the modules that are rendered on server
 */
export declare function preloadModulesForSSR(state: IMState): Promise<any>;
