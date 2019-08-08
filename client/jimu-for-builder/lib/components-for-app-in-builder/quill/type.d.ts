/// <reference types="react" />
import { Placement } from 'jimu-ui';
import { PluginHeaderProps } from './ui/plugin-header';
export interface StringMap {
    [key: string]: any;
}
export declare enum FormatType {
    INLINE = 0,
    BLOCK = 1
}
export interface Op {
    insert?: string | object;
    delete?: number;
    retain?: number;
    attributes?: StringMap;
}
export interface Delta {
    ops: Op[];
    length?: () => any;
}
export declare type QuillValue = Delta | string;
export interface BoundsStatic {
    bottom: number;
    left: number;
    right: number;
    top: number;
    height: number;
    width: number;
}
export interface ClipboardStatic {
    convert(html?: string): Delta;
    addMatcher(selectorOrNodeType: string | number, callback: (node: any, delta: Delta) => Delta): void;
    dangerouslyPasteHTML(html: string, source?: Sources): void;
    dangerouslyPasteHTML(index: number, html: string, source?: Sources): void;
}
export declare type UnprivilegedEditor = {
    focus: () => void;
    getLength: () => number;
    getText: (index?: number, length?: number) => string;
    getContents: (index?: number, length?: number) => Delta;
    getSelection: (focus?: boolean) => RangeStatic | null;
    getBounds: (index: number, length?: number) => BoundsStatic;
    getFormat: (range: RangeStatic) => StringMap;
};
export declare type UnprivilegedEditorWithCustom = UnprivilegedEditor & CustomEditorMethod;
export interface CustomEditorMethod {
    getHTML: () => string;
}
export declare type TextChangeHandler = (delta: Delta, oldContents: Delta, source: Sources) => any;
export declare type SelectionChangeHandler = (range: RangeStatic, oldRange: RangeStatic, source: Sources) => any;
export declare type EditorChangeHandler = ((name: 'text-change', delta: Delta, oldContents: Delta, source: Sources) => any) | ((name: 'selection-change', range: RangeStatic, oldRange: RangeStatic, source: Sources) => any);
export declare type EventType = 'text-change' | 'selection-change' | 'editor-change';
export declare type Hanldes = TextChangeHandler | SelectionChangeHandler | EditorChangeHandler;
export interface EventEmitter {
    on: (eventName: EventType, handler?: Hanldes) => EventEmitter;
    off: (eventName: EventType, handler?: Hanldes) => EventEmitter;
}
export interface QuillProperties {
    options?: StringMap;
    editor?: any;
}
export declare type Editor = {
    root: HTMLDivElement;
    clipboard: ClipboardStatic;
    hasFocus: () => boolean;
    disable: () => void;
    enable: (enabled?: boolean) => void;
    setContents: (delta: Delta, source?: Sources) => Delta;
    updateContents: (delta: Delta, source?: Sources) => Delta;
    setSelection: (range: RangeStatic | number, source?: Sources) => void;
    focus: () => void;
    getContents: (index?: number, length?: number) => Delta;
    getSelection: (focus?: boolean) => RangeStatic | null;
    getBounds: (index: number, length?: number) => BoundsStatic;
    getLeaf: (index: number) => any;
    deleteText: (index: number, length: number, source?: Sources) => Delta;
    insertText: (index: number, text: string, source?: Sources) => Delta;
    insertEmbed: (index: Number, type: String, value: any, source?: Sources) => Delta;
    format: (name: string, value: any, source?: Sources) => Delta;
    formatLine: (index: number, length: number, format: string, value: any, source?: Sources) => Delta;
    formatText: (index: number, length: number, format: string, value: any, source?: Sources) => Delta;
    getFormat: (range?: RangeStatic) => StringMap;
    removeFormat: (index: number, length: number, source?: Sources) => Delta;
} & UnprivilegedEditor & EventEmitter & QuillProperties;
export interface RangeStatic {
    index: number;
    length: number;
}
export declare type Sources = 'api' | 'user' | 'silent';
export interface Plugin {
    header?: PluginHeaderProps;
    placement?: Placement;
    open?: boolean;
    reference?: HTMLElement;
    onChange?: () => any;
    onFormatsChange?: () => any;
    [x: string]: any;
}
export interface PluginMap {
    [name: string]: Plugin;
}
export interface QuillOptions {
    bounds?: HTMLElement | string;
    formats?: string[];
    modules?: StringMap;
    plugins?: PluginMap;
    placeholder?: string;
    readOnly?: boolean;
    scrollingContainer?: HTMLElement | string;
    tabIndex?: number;
    theme?: string;
}
export declare type QuillProps = {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    value?: QuillValue;
    defaultValue?: QuillValue;
    children?: any;
    selallWhenActive?: boolean;
    onChange?: (value: QuillValue, delta: Delta, source: Sources, editor: UnprivilegedEditor) => any;
    onUnMount?: () => any;
    onChangeSelection?: (nextSelection: RangeStatic, source: Sources, editor: UnprivilegedEditor) => any;
    onFocus?: (nextSelection: RangeStatic, source: Sources, editor: UnprivilegedEditor) => any;
    onBlur?: (nextSelection: RangeStatic, source: Sources, editor: UnprivilegedEditor) => any;
    onKeyPress?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onDoubleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
    onMount?: (editor: UnprivilegedEditor) => void;
} & QuillOptions;
export declare type LinkTarget = '_self' | '_blank' | '_parent' | '_top';
export interface QuillLinkValue {
    id: string;
    href: string;
    target: LinkTarget;
}
