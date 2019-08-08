/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, FieldSchema, ImmutableArray, DataSource, IMUseDataSource } from 'jimu-core';
interface Props {
    dataSourceIds: ImmutableArray<string>;
    isMultiple?: boolean;
    expression?: string;
    className?: string;
    style?: React.CSSProperties;
    onChange?: (expression: string, useDataSource: IMUseDataSource) => void;
}
declare class _SimpleExpression extends React.PureComponent<Props & {
    theme: ThemeVariables;
}, {}> {
    constructor(props: any);
    onChange: (field: FieldSchema, ds: DataSource) => void;
    render(): JSX.Element;
}
declare const SimpleExpression: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & {
    theme: ThemeVariables;
} & React.ClassAttributes<_SimpleExpression>, "theme">>;
export default SimpleExpression;
