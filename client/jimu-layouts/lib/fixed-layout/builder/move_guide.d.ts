import * as SVG from 'svg.js';
import { IMThemeVariables } from 'jimu-core';
export declare const enum FixedSides {
    Left = 0,
    Top = 1,
    Right = 2,
    Bottom = 3,
    None = 4
}
export interface RndDelta {
    x: number;
    y: number;
    w: number;
    h: number;
}
/**
 * Moves a widget by the given delta and return the snapped result.
 */
export declare function moveGuide(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, xDraw?: SVG.Doc, yDraw?: SVG.Doc, theme?: IMThemeVariables): RndDelta;
export declare function edgeSnapGuide(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, direction: 'v' | 'h', draw?: SVG.Doc, theme?: IMThemeVariables): {
    deltaPos: number;
    deltaSize: number;
    overridePos: boolean;
    overrideSize: boolean;
};
export declare function distanceSnapGuide(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, direction: 'v' | 'h', draw?: SVG.Doc, theme?: IMThemeVariables): {
    deltaPos: number;
    deltaSize: number;
    overridePos: boolean;
    overrideSize: boolean;
};
export declare function calSnapDistance(draggingBound: ClientRect, delta: RndDelta, siblingBounds: Array<ClientRect>, direction: 'h' | 'v', fixedSide: FixedSides): {
    previous: number;
    next: number;
    involvedRects: Array<ClientRect>;
};
