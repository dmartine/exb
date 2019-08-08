/// <reference types="react-intl" />
/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, ImmutableArray, Expression, InjectedIntl, ImmutableObject } from 'jimu-core';
interface Props {
    dataSourceIds: ImmutableArray<string>;
    expression: Expression | ImmutableObject<Expression>;
    intl: InjectedIntl;
    isMultiple?: boolean;
    autoFocus?: boolean;
    onChange: (expression: Expression) => void;
}
interface State {
    expression: Expression;
    name: string;
}
export default class ExpressionTab extends React.PureComponent<Props, State> {
    static count: number;
    constructor(props: any);
    componentDidUpdate(prevProps: Props): void;
    getMutableExpression: (expression: Expression | import("seamless-immutable").ImmutableObject<Expression>) => Expression;
    onExpChange: (e: Expression) => void;
    onChange: () => void;
    onNameChange: (e: any) => void;
    getDefaultName: () => string;
    getWhetherDisableInsert: () => boolean;
    render(): JSX.Element;
}
export {};
