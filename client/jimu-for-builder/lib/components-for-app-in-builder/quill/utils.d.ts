import { Editor, RangeStatic, StringMap, Sources, BoundsStatic, QuillLinkValue, FormatType } from './type';
import { TextFormats } from 'jimu-ui';
import { LinkParam } from '../../components/link-setting/link-setting-types';
export interface FormatParams {
    id?: string;
    type: FormatType;
    key: TextFormats;
    value: any;
    range?: RangeStatic;
    source?: Sources;
}
export declare const getFixedPosition: (quill: Editor, index: number, length?: number) => BoundsStatic;
export declare const getUID: () => string;
export declare const getUUID: () => string;
export declare const convertLinkParamToQuillLinkValue: (value: LinkParam, id: string) => QuillLinkValue;
export declare const quillFormat: (quill: Editor, formatParams: FormatParams) => import("./type").Delta;
export declare const getFormat: (quill: Editor, range?: RangeStatic, focus?: boolean) => StringMap;
export declare const handlingexceptionalFormats: (formats: StringMap) => StringMap;
export declare const convertExceptionalLinkValue: (formats: StringMap) => StringMap;
