/// <reference types="react" />
/** @jsx jsx */
import { Editor, RangeStatic, Delta, Sources } from '../type';
import { React } from 'jimu-core';
interface QuillPluginProps {
    quill: Editor;
    onSelectionChange?: (range: RangeStatic, source: Sources) => any;
    onTextChange?: (html: string, delta: Delta, source: Sources) => any;
    useHooks?: boolean;
}
interface State {
    hooked: boolean;
}
export declare class BaseQullPlugin extends React.PureComponent<QuillPluginProps, State> {
    constructor(props: any);
    static defaultProps: Partial<QuillPluginProps>;
    componentDidMount(): void;
    hookQuill: () => void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    selectionChange: (range: RangeStatic, oldRange: RangeStatic, source: Sources) => void;
    textChange: (delta: Delta, oldDelta: Delta, source: Sources) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    render(): JSX.Element;
}
export {};
