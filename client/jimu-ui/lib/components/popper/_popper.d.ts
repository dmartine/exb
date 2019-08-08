/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { PopperOptionProps } from './type';
interface OwnProps {
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
    position?: {
        left: number;
        top: number;
    } | false;
}
export declare class _Popper extends React.PureComponent<PopperOptionProps & OwnProps> {
    static displayName: string;
    scheduleUpdate: () => void;
    static defaultProps: Partial<PopperOptionProps & OwnProps>;
    constructor(props: any);
    componentDidUpdate(preProps: PopperOptionProps): void;
    getStyle: () => import("jimu-core").SerializedStyles;
    popperRender: () => JSX.Element;
    render(): JSX.Element;
}
export {};
