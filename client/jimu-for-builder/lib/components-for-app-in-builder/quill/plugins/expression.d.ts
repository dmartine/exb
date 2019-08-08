/// <reference types="react" />
import { React, ImmutableArray, Expression, IMExpression } from 'jimu-core';
import { Editor, RangeStatic, StringMap, Sources } from '../type';
import { TextFormats } from 'jimu-ui';
interface Props {
    className?: string;
    quill: Editor;
    id?: string;
    dataSourceIds?: ImmutableArray<string>;
    onChange: (key: TextFormats.EXPRESSION, expression: IMExpression, id?: string) => void;
    useHooks?: boolean;
    onFormatsChange: (formats: StringMap, source: Sources) => void;
    formats?: StringMap;
}
interface State {
    range?: RangeStatic;
}
export default class ExpressionPlugin extends React.PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    onExpressionChange: (expression: Expression) => void;
    insertOrUpdateExpression: (name: string) => string;
    updateExpression: (expid: string, name: string) => void;
    insertExpression: (expid: string, name: string) => void;
    onSelectionChange: (range: RangeStatic, source: Sources) => void;
    render(): JSX.Element;
}
export {};
