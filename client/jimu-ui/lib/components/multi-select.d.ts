/// <reference types="react" />
/** @jsx jsx */
import { React, SerializedStyles, ThemeVariables, ImmutableArray } from 'jimu-core';
export interface MultiSelectItem {
    value: string | number;
    label: string;
    render?: (item: MultiSelectItem) => any;
}
interface Props {
    items: ImmutableArray<MultiSelectItem>;
    theme: ThemeVariables;
    values?: ImmutableArray<string | number>;
    defaultValues?: ImmutableArray<string | number>;
    className?: string;
    placeHolder?: string;
    activeIcon?: React.ReactElement;
    showValues?: (values: Array<string | number>) => string;
    onClickItem?: (evt: React.MouseEvent, value: string | number, selectedValues: Array<string | number>) => void;
}
interface Stats {
    isOpen: boolean;
    values: ImmutableArray<string | number>;
}
export declare class _MultiSelect extends React.PureComponent<Props, Stats> {
    popoverRef: HTMLDivElement;
    constructor(props: any);
    componentWillReceiveProps(nextProps: any): void;
    componentWillUnmount(): void;
    onDropDownToggle: (evt: any) => void;
    onItemClick: (evt: any, item: MultiSelectItem) => void;
    getSelectStyle: () => SerializedStyles;
    getPopoverStyle: () => SerializedStyles;
    getValueLabel: (value: any) => React.ReactText;
    getShowText: () => string;
    render(): JSX.Element;
}
export declare const MultiSelect: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<_MultiSelect>, "theme">>;
export {};
