/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableObject, ThemeVariables } from 'jimu-core';
export interface TreeItemJson {
    id: string;
    label?: string;
    isIconSvg?: boolean;
    icon?: any;
    data?: any;
    mustShowArrow?: boolean;
    isExpand?: boolean;
    isActive?: boolean;
    children?: any;
    className?: string;
    renderItem?: (itemJson: TreeItemJson) => any;
    renderRightContent?: (itemJson: TreeItemJson) => any;
    renderHeaderContent?: (itemJson: TreeItemJson) => any;
    arrowIcon?: (itemJson: TreeItemJson) => any;
}
interface Props {
    itemJson: ImmutableObject<TreeItemJson>;
    onClickItem: (itemJson: ImmutableObject<TreeItemJson>, evt?: React.MouseEvent<HTMLDivElement>) => void;
    theme: ThemeVariables;
    level: number;
    handleExpand?: () => void;
}
interface Stats {
}
export declare class TreeItem extends React.PureComponent<Props, Stats> {
    constructor(props: any);
    handleClickItem: (evt: any) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
