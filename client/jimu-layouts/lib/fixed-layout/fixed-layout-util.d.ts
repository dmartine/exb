import { IMState, BoundingBox, IMLayoutJson, BrowserSizeMode } from 'jimu-core';
import { LayoutProps, StateToLayoutProps } from '../types';
interface Pos {
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare function mapStateToFixedLayoutProps(state: IMState, ownProps: LayoutProps): StateToLayoutProps & {
    minHeight: number;
};
export declare function fixedLayoutTransform(layout: IMLayoutJson, fromSizeMode: BrowserSizeMode, toSizeMode: BrowserSizeMode): IMLayoutJson;
/**
 * Convert a layout to a small size(width) layout.
 *
 * Return the new layout.
 *
 *
 * @param layout
 * @param convertToColumn
 * @param appConfig
 */
export declare function autoResponseToDevice(layout: IMLayoutJson, deviceWidth: number): IMLayoutJson;
export declare function intersects(p1: Pos, p2: Pos): boolean;
export declare function contains(p1: Pos, p2: Pos): boolean;
export declare function mergePos(p1: Pos, p2: Pos): Pos;
export declare function getAbsolutePos(b: BoundingBox, containerWidth: number, containerHeight: number): Pos;
export {};
