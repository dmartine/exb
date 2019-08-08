import { IMState } from 'jimu-core';
export * from './lib/widget-wrapper';
/**
 * init widget with default config
 */
export declare function initGlobal(): void;
export declare function getInitState(): IMState;
export declare function initExtensions(): void;
export { default as mockTheme } from './lib/theme-mock';
