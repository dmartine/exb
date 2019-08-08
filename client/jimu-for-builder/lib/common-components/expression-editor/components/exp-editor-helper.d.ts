/// <reference types="react-intl" />
/// <reference types="react" />
import { React, Expression, ExpressionPart, ExpressionFunctions, ImmutableArray, FieldSchema, DataSource, InjectedIntl } from 'jimu-core';
interface Props {
    expression: Expression;
    dataSourceIds: ImmutableArray<string>;
    externalId: string;
    inEditablePart: boolean;
    container: HTMLElement;
    intl: InjectedIntl;
    onSelect: (e: Expression, partId: string) => void;
}
interface State {
    active: ExpEditorHelperTabs;
}
declare enum ExpEditorHelperTabs {
    Fields = "FIELDS",
    Functions = "FUNCTIONS"
}
export default class ExpEditorHelper extends React.PureComponent<Props, State> {
    ExpEditorHelperTabs: {
        [ExpEditorHelperTabs.Fields]: string;
        [ExpEditorHelperTabs.Functions]: string;
    };
    constructor(props: any);
    getTab: (tab: ExpEditorHelperTabs) => JSX.Element;
    onFunctionSelect: (functionName: ExpressionFunctions) => void;
    onFieldSelect: (field: FieldSchema, ds: DataSource) => void;
    onActiveTabChange: (tab: ExpEditorHelperTabs) => void;
    changeExpression: (part: ExpressionPart, expression: Expression) => void;
    render(): JSX.Element;
}
export {};
