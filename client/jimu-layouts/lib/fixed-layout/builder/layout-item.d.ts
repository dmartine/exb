/// <reference types="react" />
import { React, LayoutItemJson } from 'jimu-core';
import { LayoutItemProps, FixedLayoutItemSetting } from '../../types';
interface OwnProps {
    offsetX?: number;
    offsetY?: number;
    dw?: number;
    dh?: number;
    index: number;
    initRect?: ClientRect;
    containerRect?: ClientRect;
    forwardRef?: React.RefObject<HTMLDivElement>;
    onResizeStart: (id: string) => void;
    onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
    onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson, itemSetting: FixedLayoutItemSetting) => void;
}
declare const _default: React.ForwardRefExoticComponent<LayoutItemProps & OwnProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
