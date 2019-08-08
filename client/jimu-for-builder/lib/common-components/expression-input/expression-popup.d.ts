/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableArray, ThemeVariables, Expression } from 'jimu-core';
import { ExpressionFrom } from '../expression-builder';
interface Props {
    dataSourceIds: ImmutableArray<string>;
    expression: Expression;
    from: ExpressionFrom[];
    isOpen: boolean;
    active?: ExpressionFrom;
    isMultiple?: boolean;
    autoFocus?: boolean;
    className?: string;
    modalStyle?: object;
    onChange: (expression: Expression) => void;
    onClose: () => void;
}
declare class _ExpressionPopup extends React.PureComponent<Props & {
    theme: ThemeVariables;
}, {}> {
    constructor(props: any);
    render(): JSX.Element;
}
declare const ExpressionPopup: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & {
    theme: ThemeVariables;
} & React.ClassAttributes<_ExpressionPopup>, "theme">>;
export default ExpressionPopup;
