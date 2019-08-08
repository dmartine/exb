import { Editor, RangeStatic, StringMap, Sources } from '../type';
import { TextFormats } from 'jimu-ui';
declare const _default: {
    getFormat: (quill: Editor, range?: RangeStatic) => StringMap;
    updateFormats: (formats?: StringMap) => StringMap;
    formatText: (quill: Editor, key: TextFormats, value: any, range?: RangeStatic, source?: Sources) => void;
    getUID: () => string;
    getUUID: () => string;
};
export default _default;
