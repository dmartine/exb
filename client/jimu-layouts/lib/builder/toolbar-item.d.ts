/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { ToolItemConfig } from '../types';
import { ToolbarContextProps } from './toolbar-context';
export declare const DEFAULT_ICON_SIZE = 16;
export declare class ToolbarItem extends React.PureComponent<ToolItemConfig & {
    uid: string;
    isInGroup?: boolean;
}> {
    contextProps: ToolbarContextProps;
    constructor(props: any);
    select(e: React.MouseEvent): void;
    getValue(target: any, props: any): any;
    getStyle(): import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
