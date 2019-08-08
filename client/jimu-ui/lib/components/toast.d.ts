/// <reference types="react" />
import { React, ThemeVariables } from 'jimu-core';
import { ToastType } from './types';
interface Props {
    className: string;
    type: ToastType;
    text: string;
    style?: React.CSSProperties;
}
export declare class _Toast extends React.PureComponent<Props & {
    theme: ThemeVariables;
}> {
    static count: number;
    id: string;
    defaultModalStyle: {
        position: string;
        top: string;
        width: string;
        backgroundColor: string;
        height: string;
        marginLeft: string;
        marginRight: string;
    };
    modalStyle: {
        content: {
            position: string;
            top: string;
            width: string;
            backgroundColor: string;
            height: string;
            marginLeft: string;
            marginRight: string;
        };
        overlay: {
            position: string;
            top: string;
            width: string;
            backgroundColor: string;
            height: string;
            marginLeft: string;
            marginRight: string;
        };
    };
    constructor(props: any);
    render(): JSX.Element;
}
export declare const Toast: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
export {};
