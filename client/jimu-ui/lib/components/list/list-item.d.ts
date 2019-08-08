/// <reference types="react" />
import { React } from 'jimu-core';
import { TextWithIconProps } from '../types';
import { CardProps } from '../card/card';
import { LinkParam } from 'jimu-for-builder';
export declare type ListItemType = string | TextWithIconProps | CardProps;
interface linkProps {
    to: LinkParam;
    target?: string;
}
export interface ListItemProps extends linkProps {
    key?: number;
    className?: string;
    style?: Object;
    width?: number;
    height?: number;
    data: ListItemType;
    selectable?: boolean;
    active?: boolean;
    showActive?: boolean;
    onClick?: (e: any) => void;
    onClickDetail?: (listItem: any) => void;
    onChange?: (listItem: any) => void;
}
export interface ListItemState {
    isActive?: boolean;
}
export declare class ListItem extends React.PureComponent<ListItemProps, ListItemState> {
    static displayName: string;
    private _handleChange;
    private _handleClick;
    private _handleDetailClick;
    unselect(): void;
    constructor(props: any);
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
export {};
