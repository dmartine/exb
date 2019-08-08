import { Editor, RangeStatic, UnprivilegedEditorWithCustom, QuillValue, Sources } from './type';
export declare const quillUtils: {
    setEditorReadOnly: (quill: Editor, value: boolean) => void;
    setEditorContents: (quill: Editor, value: QuillValue, source?: Sources) => void;
    setEditorCursorEnd: (quill: Editor, source?: Sources) => void;
    setEditorContentSelection: (quill: Editor, source?: Sources) => void;
    setEditorSelection: (quill: Editor, range: RangeStatic, source?: Sources) => void;
    setEditorTabIndex: (quill: Editor, tabIndex: number) => void;
    makeUnprivilegedEditor: (quill: Editor) => UnprivilegedEditorWithCustom;
};
