/// <reference types="react" />
/** @jsx jsx */
import { React } from 'jimu-core';
import { QuillProps, QuillValue, Editor, Delta, RangeStatic, Sources, PluginMap } from './type';
import { PluginHeaderProps } from './ui/plugin-header';
interface State {
    value?: QuillValue;
    generation?: number;
    selection?: RangeStatic;
    renderCount?: number;
}
export declare class QuillComponent extends React.Component<QuillProps, State> {
    quill: Editor;
    lastDeltaChangeSet: Delta;
    quillDelta: Delta;
    quillSelection: RangeStatic;
    editingArea: HTMLElement;
    handleSelectionChange: (range: RangeStatic, oldRange: RangeStatic, source: Sources) => void;
    handleTextChange: (delta: Delta, oldDelta: Delta, source: Sources) => void;
    dirtyProps: string[];
    cleanProps: string[];
    static defaultProps: Partial<QuillProps>;
    constructor(props: any);
    private isControlled;
    componentWillReceiveProps(nextProps: any, nextState: any): void;
    private setInitSelection;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    private shouldComponentRegenerate;
    componentWillUpdate(nextProps: any, nextState: any): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    private getEditorConfig;
    private getEditor;
    private getEditingArea;
    private getEditorContents;
    private getEditorSelection;
    private isDelta;
    private isReactElement;
    private isEqualValue;
    private isAutoFormatModule;
    private isModuleEqual;
    private traversalObjectwithOutFunc;
    private regenerate;
    private renderEditingArea;
    getPluginHeader: (header: PluginHeaderProps) => JSX.Element;
    renderPlugins: (plugins: PluginMap) => JSX.Element[];
    render(): JSX.Element;
    private onEditorChangeText;
    private onEditorChangeSelection;
    focus: () => void;
    blur: () => void;
    private createEditor;
    private hookEditor;
    private unhookEditor;
}
export {};
