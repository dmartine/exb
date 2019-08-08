/// <reference types="react" />
import { React } from 'jimu-core';
export declare const PageContext: React.Context<PageContextProps>;
export declare type PageContextProps = {
    viewOnly: boolean;
    maxWidth?: number;
};
