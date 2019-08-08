/// <reference types="react" />
import { React, ExpressionPart, ImmutableArray } from 'jimu-core';
interface Props {
    exp: string;
    dataSourceIds: ImmutableArray<string>;
    id: string;
    externalId: string;
    isEditable: boolean;
    isError: boolean;
    isDsDisabled: boolean;
    parts: ExpressionPart[];
    className?: string;
}
interface State {
}
export default class FunctionExp extends React.PureComponent<Props, State> {
    constructor(props: any);
    getComponent: (part: ExpressionPart, index: string) => JSX.Element;
    getFunctionTooltip: (exp: string) => string;
    render(): JSX.Element;
}
export {};
