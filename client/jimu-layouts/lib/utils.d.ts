/// <reference types="seamless-immutable" />
import { Immutable, IMLayoutJson, IMBoundingBox, IMState, IMAppConfig, IMThemeVariables, IMSizeModeLayoutJson } from 'jimu-core';
import { WidgetProps, FixedLayoutItemSetting, IconTextSize, LayoutProps, LayoutItemProps, StateToLayoutProps, StateToLayoutItemProps, SectionProps } from './types';
export declare const emptyFunc: () => void;
export declare function autoBindHandlers(el: Object, fns: Array<string>): void;
/**
 *
 * @param value
 * number: fixed height in pixel
 * string: viewport-relative units, such as '100vh'
 * @return number in pixel
 */
export declare function toPixelUnit(value: number | string): number;
export declare function getSectionInfo(state: IMState, sectionId: string): SectionProps;
export declare function getMaximumId(layoutMap: IMLayoutJson): number;
export declare function isPercentage(value: any): boolean;
export declare function isNumber(value: any): boolean;
export declare function toRatio(value: number, total: number): string;
export declare function fromRatio(ratio: number | string, total: number): number;
export declare function mapStateToLayoutProps(state: IMState, ownProps: LayoutProps): StateToLayoutProps;
export declare function mapStateToLayoutItemProps(state: IMState, ownProps: LayoutItemProps): StateToLayoutItemProps;
export declare function getActiveLayout(state?: IMState): IMSizeModeLayoutJson;
export declare function mapStateToWidgetProps(state: IMState, ownProps: LayoutItemProps): StateToLayoutItemProps & WidgetProps;
export declare function snapToGridSize(value: number, gridSize: number): number;
export declare function removePositionRelatedStyle(style: any): any;
/**
 * Replace the values of bounding box b1 with values of b2, try to keep the unit of each property.
 * @param b1
 * @param b2
 * @param containerRect
 */
export declare function replaceBoundingBox(b1: IMBoundingBox, b2: ClientRect, containerRect: ClientRect): IMBoundingBox;
/**
 * Update a property of the bounding box
 * @param prop
 * @param b
 * @param newValue
 * @param containerRect
 */
export declare function updateBoundingBoxProp(prop: string, b: IMBoundingBox, newValue: number | string, containerRect: ClientRect): Immutable.ImmutableObject<import("jimu-core").BoundingBox>;
export declare function generateBBoxStyle(bbox: IMBoundingBox, setting: FixedLayoutItemSetting): {};
export declare function generateResizingBBoxStyle(initRect: ClientRect, containerRect: ClientRect, delta: {
    dx: number;
    dy: number;
    dw: number;
    dh: number;
}): any;
export declare function relativeClientRect(r1: ClientRect, r2: ClientRect): ClientRect & {
    id: string;
};
export declare function findContainerWidgetId(appConfig: IMAppConfig, layoutId: string): string;
export declare function getBuilderThemeVariables(): IMThemeVariables;
export declare function parseTranslateCoords(translate: string): {
    x: number;
    y: number;
};
export declare const getIconSize: (iconSize: IconTextSize) => number;
