/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { LayoutItemProps } from 'jimu-layouts/common';
export interface RndOptions {
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    restrict?: boolean;
    selected?: boolean;
    gridSize?: number;
    useDragHandler?: boolean;
    size?: {
        width: number | string;
        height: number | string;
    };
    style?: any;
    className?: any;
    forwardRef?: React.RefObject<HTMLDivElement>;
    onResizeStart?: (id: string) => void;
    onResizing?: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd?: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onDragStart?: (id: string) => void;
    onDragging?: (id: string, dx: number, dy: number, outOfBoundary: boolean) => void;
    onDragEnd?: (id: string, dx: number, dy: number, outOfBoundary: boolean) => void;
}
export declare function withRnd(): (WrappedComponent: React.ComponentClass<LayoutItemProps & {
    disableResizing?: boolean;
    isDragging?: boolean;
    isResizing?: boolean;
}, any>) => React.ComponentClass<RndOptions & LayoutItemProps, any>;
