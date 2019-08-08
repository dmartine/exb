/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeVariables, ImmutableArray, Expression as ExpressionValue } from 'jimu-core';
import { ExpressionFrom } from '../../../common-components/expression-builder';
interface Props {
    expression?: ExpressionValue;
    dataSourceIds?: ImmutableArray<string>;
    onChange?: (expression: ExpressionValue) => void;
}
interface ExtraProps {
    theme?: ThemeVariables;
}
export declare class ExpressionPanel extends React.PureComponent<Props & ExtraProps> {
    from: ExpressionFrom[];
    static defaultProps: Partial<Props & ExtraProps>;
    private getStyle;
    onExpressionChange: (expression: ExpressionValue) => void;
    render(): JSX.Element;
}
export {};
