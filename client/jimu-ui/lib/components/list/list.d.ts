/// <reference types="react" />
import { React } from 'jimu-core';
import { ListItem, ListItemType } from './list-item';
import { LinkParam } from 'jimu-for-builder';
export interface ListProps {
    dataSource: ListItemType[];
    horizontal?: boolean;
    cardWidth?: number | string;
    className?: string;
    selectionMode?: string;
    selectedIds?: string[];
    canWrap?: boolean;
    to?: LinkParam;
    highlightSelection?: boolean;
    gap?: number | string;
    onChange?: (listItem: any) => void;
    onClickDetail?: (listItem: any) => void;
}
export interface ListState {
    selectedItem: ListItem;
}
export declare class _List extends React.PureComponent<ListProps, ListState> {
    readonly defaultHorizontalCardWidth = 320;
    private _handleItemChange;
    private _onClickDetail;
    constructor(props: any);
    render(): JSX.Element;
}
export declare const List: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
