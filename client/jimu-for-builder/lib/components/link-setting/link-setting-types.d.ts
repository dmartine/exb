import { Expression, ImmutableObject } from 'jimu-core';
export declare const OpenTypes: {
    CurrentWindow: any;
    TopWindow: string;
    NewWindow: string;
};
export interface LinkParam {
    value?: string;
    linkType?: string;
    openType?: string;
    expression?: ImmutableObject<Expression>;
}
export declare type IMLinkParam = ImmutableObject<LinkParam>;
