/// <reference types="react" />
/// <reference types="seamless-immutable" />
import { React, ImmutableObject, ThemeVariables } from 'jimu-core';
import { TreeItemJson } from './tree-item';
import * as TreeUtils from './tree-util';
interface Props {
    itemJson: ImmutableObject<TreeItemJson>;
    forwardRef?: (ref: any) => void;
    hideRoot?: boolean;
    onClickItem?: (itemJson: ImmutableObject<TreeItemJson>, evt?: React.MouseEvent<HTMLDivElement>) => void;
    className?: string;
    handleExpand?: (itemJson: ImmutableObject<TreeItemJson>) => void;
}
interface ThemeProps {
    theme: ThemeVariables;
}
interface Stats {
}
declare class _Tree extends React.PureComponent<Props & ThemeProps, Stats> {
    constructor(props: any);
    handleSingleClick: (itemJson: import("seamless-immutable").ImmutableObject<TreeItemJson>, evt: any) => void;
    handleExpand: (itemJson: import("seamless-immutable").ImmutableObject<TreeItemJson>) => void;
    renderItemJson: (itemJson: any, level: number) => JSX.Element;
    render(): JSX.Element;
}
declare const Tree: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & ThemeProps & React.ClassAttributes<_Tree>, "theme">>;
export { TreeItemJson, _Tree, TreeUtils, Tree };
