/// <reference types="react" />
/** @jsx jsx */
import { React, SerializedStyles, ImmutableObject, ThemeVariables } from 'jimu-core';
import { TreeItemJson } from './tree-item';
interface Props {
    itemJson: ImmutableObject<TreeItemJson>;
    theme?: ThemeVariables;
    renderRightContent?: (itemJson: TreeItemJson) => any;
    renderHeaderContent?: (itemJson: TreeItemJson) => any;
    arrowIcon?: (itemJson: TreeItemJson) => any;
    level?: number;
    handleExpand?: () => void;
}
interface States {
    dropType: 'moveInto' | 'top' | 'bottom' | 'none';
    isDragging: boolean;
}
export declare class CommonTreeContent extends React.PureComponent<Props, States> {
    handleArrowClick: (evt: any) => void;
    getStyle: () => SerializedStyles;
    render(): JSX.Element;
}
export {};
