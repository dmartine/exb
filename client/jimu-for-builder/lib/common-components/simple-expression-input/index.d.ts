/// <reference types="react" />
/// <reference types="seamless-immutable" />
/** @jsx jsx */
import { React, ThemeVariables, ImmutableArray, IMUseDataSource } from 'jimu-core';
interface State {
    useDataSource: IMUseDataSource;
}
interface Props {
    dataSourceIds: ImmutableArray<string>;
    isExpPopupOpen: boolean;
    isMultiple?: boolean;
    className?: string;
    style?: React.CSSProperties;
    expression?: string;
    openExpPopup: () => void;
    closeExpPopup: () => void;
    onChange?: (value: string, useDataSource: IMUseDataSource) => void;
    onBlur?: (value: string, useDataSource: IMUseDataSource) => void;
    onKeyUp?: (value: string, useDataSource: IMUseDataSource) => void;
    onFocus?: (value: string, useDataSource: IMUseDataSource) => void;
}
declare class _SimpleExpressionInput extends React.PureComponent<Props & {
    theme: ThemeVariables;
}, State> {
    constructor(props: any);
    onInputChange: (e: any) => void;
    onInputBlur: (e: any) => void;
    onInputKeyUp: (e: any) => void;
    onInputFocus: (e: any) => void;
    onExpChange: (expression: string, useDataSource: import("seamless-immutable").ImmutableObject<import("jimu-core").UseDataSource>) => void;
    render(): JSX.Element;
}
declare const SimpleExpressionInput: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & {
    theme: ThemeVariables;
} & React.ClassAttributes<_SimpleExpressionInput>, "theme">>;
export default SimpleExpressionInput;
