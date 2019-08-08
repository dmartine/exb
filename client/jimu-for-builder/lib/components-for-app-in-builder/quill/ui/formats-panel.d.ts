/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableArray } from 'jimu-core';
import { TextFormats } from 'jimu-ui';
import { StringMap, FormatType } from '../type';
interface Props {
    id?: string;
    dataSourceIds?: ImmutableArray<string>;
    className?: string;
    style?: any;
    formats?: StringMap;
    onChange?: (key: TextFormats, value: any, type: FormatType) => void;
    onUserSelect?: () => any;
}
export declare const FormatsPanel: React.ComponentClass<Props, any>;
export {};
