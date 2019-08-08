/// <reference types="react" />
import { React } from 'jimu-core';
export interface DragData {
    node: HTMLElement;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
    x: number;
    y: number;
}
interface Props {
    /**
   * If true, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag.
   */
    useSelectNone?: boolean;
    className?: string;
    offsetParent?: HTMLElement;
    onStop: (e: React.MouseEvent<any>, data: DragData) => void;
    onDrag: (e: React.MouseEvent<any>, data: DragData) => void;
    onStart: (e: React.MouseEvent<any>, data: DragData) => void;
}
interface State {
    dragging: boolean;
    lastX: number;
    lastY: number;
    touchIdentifier?: number;
}
export declare class _Draggable extends React.PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    componentWillUnmount(): void;
    findInTouchList: (touchList: React.TouchList, callback: Function) => React.Touch;
    getTouch: (e: React.TouchEvent<any>, identifier: number) => {
        clientX: number;
        clientY: number;
    };
    getControlPosition: (e: any, touchIdentifier: number) => {
        x: number;
        y: number;
    };
    offsetXYFromParent: (evt: {
        clientX: number;
        clientY: number;
    }, offsetParent: HTMLElement) => {
        x: number;
        y: number;
    };
    getTouchIdentifier: (e: React.TouchEvent<any>) => number;
    createDragData: (x: number, y: number, isStart?: boolean) => DragData;
    addClassName: (el: HTMLElement, className: string) => void;
    removeClassName: (el: HTMLElement, className: string) => void;
    addUserSelectStyles: (doc?: Document) => void;
    removeUserSelectStyles(doc?: Document): void;
    handleDragStart: (e: any) => void;
    handleDrag: (e: any) => void;
    handleDragStop: (e: any) => void;
    onMouseDown: (e: any) => void;
    onTouchStart: (e: any) => void;
    onTouchEnd: (e: any) => void;
    onMouseUp: (e: any) => void;
    render(): JSX.Element;
}
export declare const Draggable: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
