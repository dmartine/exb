/// <reference types="react" />
import { React, ImmutableObject, ThemeVariables } from 'jimu-core';
import { TreeItemJson } from './tree-item';
interface Props {
    theme: ThemeVariables;
    itemJson: ImmutableObject<TreeItemJson>;
    level?: number;
    onClickItem?: (itemJson: TreeItemJson, evt?: React.MouseEvent<HTMLDivElement>) => void;
    handleExpand?: (itemJson: TreeItemJson) => void;
}
interface Stats {
    itemJson: ImmutableObject<TreeItemJson>;
}
export default class ExpandTreeItem extends React.PureComponent<Props, Stats> {
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    handleSingleClick: (itemJson: any, evt: any) => void;
    handleExpand: () => void;
    SingleTreeItem: ({ itemJson, level }: {
        itemJson: any;
        level: any;
    }) => JSX.Element;
    render(): JSX.Element;
}
export {};
