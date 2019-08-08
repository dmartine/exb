/// <reference types="react" />
import { React } from 'jimu-core';
import { LayoutItemProps, ToolbarConfig } from 'jimu-layouts/common';
declare type Props = LayoutItemProps & {
    top?: boolean;
    left?: boolean;
    right?: boolean;
    bottom?: boolean;
    disableResizing?: boolean;
    isDragging?: boolean;
    isResizing?: boolean;
};
export declare function withSelect(toolItems: ToolbarConfig): (WrappedComponent: React.ComponentClass<LayoutItemProps, any>) => React.ComponentClass<Props, any>;
export {};
