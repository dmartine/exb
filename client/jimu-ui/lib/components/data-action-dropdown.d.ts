/// <reference types="react" />
/** @jsx jsx */
import { React, SerializedStyles, ThemeVariables, DataSource, DataRecord, DataAction } from 'jimu-core';
interface Props {
    dataSource: DataSource;
    records: DataRecord[];
}
interface ThemeProps {
    theme: ThemeVariables;
}
interface State {
    isOpen: boolean;
    actions: DataAction[];
}
export declare class _DataActionDropDown extends React.PureComponent<Props & ThemeProps, State> {
    static count: number;
    id: string;
    constructor(props: any);
    windowLisener: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    onDropDownToggle: (evt: React.MouseEvent<Element, MouseEvent>) => void;
    getStyle: () => SerializedStyles;
    onActionItemClick: (evt: any, action: DataAction) => void;
    render(): JSX.Element;
}
export declare const DataActionDropDown: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & ThemeProps & React.ClassAttributes<_DataActionDropDown>, "theme">>;
export {};
