/// <reference types="react" />
import { React, ImmutableArray } from 'jimu-core';
import { Editor, StringMap, RangeStatic, FormatType, Sources } from '../type';
import { TextFormats } from 'jimu-ui';
interface Props {
    className?: string;
    quill: Editor;
    id?: string;
    dataSourceIds?: ImmutableArray<string>;
    onChange?: (key: TextFormats, value: any, id?: string) => void;
    useHooks?: boolean;
    onFormatsChange: (formats: StringMap, source: Sources) => void;
    formats?: StringMap;
}
interface State {
    range?: RangeStatic;
}
export default class FormatsPlugin extends React.PureComponent<Props, State> {
    static defaultProps: Partial<Props>;
    constructor(props: any);
    handleQuillChange: (key: TextFormats, value: any, type: FormatType) => void;
    onUserSelect: () => void;
    onSelectionChange: (range: RangeStatic, source: Sources) => void;
    render(): JSX.Element;
}
export {};
