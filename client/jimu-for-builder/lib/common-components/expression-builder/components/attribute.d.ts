/// <reference types="seamless-immutable" />
/// <reference types="react" />
import { React, ImmutableArray, Expression, FieldSchema, DataSource, Immutable, ImmutableObject } from 'jimu-core';
interface Props {
    dataSourceIds: ImmutableArray<string>;
    expression: Expression | ImmutableObject<Expression>;
    onChange: (expression: Expression) => void;
}
export default class AttributeTab extends React.PureComponent<Props, {}> {
    constructor(props: any);
    getSelectedFields: () => Immutable.ImmutableArray<string>;
    onSelect: (field: FieldSchema, ds: DataSource) => void;
    render(): JSX.Element;
}
export {};
