/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables } from 'jimu-core';
import { PopoverItem } from '../types';
interface Props {
    items: PopoverItem[];
    selectedItemIndex: string;
    targetNodeId: string;
    theme: ThemeVariables;
    onClick?: (item: PopoverItem, target: string) => void;
}
interface State {
}
export default class ExpPopover extends React.PureComponent<Props, State> {
    root: HTMLElement;
    itemHeight: number;
    popoverItemStyle: {
        height: string;
        lineHeight: string;
    };
    constructor(props: any);
    componentDidUpdate(prevPorps: Props): void;
    checkTarget: (id: string) => boolean;
    render(): JSX.Element;
}
export {};
