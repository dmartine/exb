/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { Placement, Modifiers } from '../../index';
export interface PopperProps {
    usePortal?: boolean;
    container?: HTMLElement;
    positionFixed?: boolean;
    className?: string;
    theme: ThemeVariables;
    show?: boolean;
    placement?: Placement;
    reference?: HTMLElement | VirtualReference;
    baseZIndex?: number;
    offset?: number[];
    children?: any;
    toggleClass?: string;
    toggle?: (evt?: React.MouseEvent<any> | React.TouchEvent<any>) => any;
    modifiers?: Modifiers;
}
export declare class Popper extends React.PureComponent<PopperProps> {
    static displayName: string;
    domNode: HTMLElement;
    static defaultProps: Partial<PopperProps>;
    getStyle: () => import("jimu-core").SerializedStyles;
    componentDidMount(): void;
    componentWillMount(): void;
    addTargetEvents(): void;
    removeTargetEvents(): void;
    handleDocumentClick: (evt: React.MouseEvent<any, MouseEvent>) => void;
    _isOut: (target: any, node: any) => boolean;
    prepareModifiers: () => import("popper.js").default.Modifiers;
    popperRender: () => JSX.Element;
    render(): JSX.Element;
}
export interface VirtualReferenceOption {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    width?: number;
    height?: number;
}
export declare class VirtualReference {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
    constructor(options: VirtualReferenceOption);
    getBoundingClientRect(): {
        top: number;
        left: number;
        bottom: number;
        right: number;
        width: number;
        height: number;
    };
    readonly clientWidth: number;
    readonly clientHeight: number;
}
