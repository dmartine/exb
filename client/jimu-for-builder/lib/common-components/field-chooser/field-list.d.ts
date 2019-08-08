/// <reference types="react" />
import { React, FieldSchema, DataSource, ImmutableArray } from 'jimu-core';
interface Props {
    fields: {
        [jimuName: string]: FieldSchema;
    };
    ds: DataSource;
    onSelect?: (field: FieldSchema, ds: DataSource) => void;
    selectedFields?: ImmutableArray<string>;
}
export default class FieldList extends React.PureComponent<Props, {}> {
    constructor(props: any);
    onFieldSelect: (f: FieldSchema) => void;
    render(): JSX.Element;
}
export {};
