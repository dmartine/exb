/// <reference types="react" />
import { React } from 'jimu-core';
export interface DrawerProps {
    color?: string;
    textColor?: string;
    className?: string;
    isOpen?: boolean;
    onClose?: (e: React.ReactElement<any>) => {};
}
export declare class _Drawer extends React.PureComponent<DrawerProps> {
    static defaultProps: {
        color: string;
    };
    onClose(e: any): void;
    constructor(props: any);
    render(): JSX.Element;
}
export declare const Drawer: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
