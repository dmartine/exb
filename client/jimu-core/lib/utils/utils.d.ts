import isDeepEqual = require('lodash.isequal');
import { Size, BrowserSizeMode } from '../types/common';
import getValue = require('lodash.get');
import { IMAppConfig, IMSizeModeLayoutJson } from '../types/app-config';
export { getValue, isDeepEqual };
declare type WidgetPanelCallBack = 'onOpen' | 'onClose' | 'onActive' | 'onDeActive';
export declare function getWidgetCallbackNamesFromWidgetState(widgetState: any, prevWidgetState: any): WidgetPanelCallBack[] | WidgetPanelCallBack;
export declare function getPanelCallbackNamesFromPanelState(panelState: any, prevPanelState: any): WidgetPanelCallBack[] | WidgetPanelCallBack;
export declare function isTouchDevice(): boolean;
export declare function getBrowserSizeMode(size: Size): BrowserSizeMode;
export declare function findViewportSize(appConfig: IMAppConfig, browserSizeMode: BrowserSizeMode): Size;
export declare function findLayoutId(layouts: IMSizeModeLayoutJson, browserSizeMode: BrowserSizeMode, mainSizeMode: BrowserSizeMode): string;
export declare function getSizeModeWidth(sizeMode: BrowserSizeMode): number;
export declare function loadstyle(url: string, beforeId?: string): Promise<{}>;
export declare function applyMixins(derivedCtor: any, baseCtors: any[]): void;
/**
 * check whether the two array contain the same items, don't consider the order
 * @param arr1
 * @param arr2
 */
export declare function isArrayContainSameItems(arr1: string[], arr2: string[]): boolean;
export declare function isArrayContainSameItems(arr1: number[], arr2: number[]): boolean;
/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 */
export declare function hyphenateStyleName(name: any): any;
export declare function styleObjectToString(styles: any): string;
export declare function isWidgetSupportSSR(appConfig: IMAppConfig, widgetId: string, dataSourceTypes: string[]): boolean;
export declare function tryGet<T>(getFn: () => T, waitTime?: number, tryInterval?: number): Promise<T>;
