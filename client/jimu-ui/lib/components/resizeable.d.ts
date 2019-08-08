/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { DragData } from './draggable';
interface Props {
    width?: number;
    height?: number;
    /**
     * Minimum size used to limit resize
     */
    minSize?: number[];
    onEnd?: (width: number, height: number) => void;
    onResize?: (width: number, height: number) => void;
    onStart?: (width: number, height: number) => void;
}
interface ExtraProps {
    theme: ThemeVariables;
}
export declare class _Resizeable extends React.PureComponent<Props & ExtraProps> {
    static defaultProps: Partial<Props>;
    getStyle: () => import("jimu-core").SerializedStyles;
    onResizeStart: () => void;
    onResize: (e: any, data: DragData) => void;
    onResizeEnd: () => void;
    render(): JSX.Element;
}
export declare const Resizeable: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_Resizeable>, "theme">>;
export {};
