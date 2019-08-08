/// <reference types="react" />
import { React } from 'jimu-core';
interface SettingRowProps {
    label?: string | JSX.Element;
    flow?: 'wrap' | 'no-wrap';
    indented?: boolean;
}
export declare class SettingRow extends React.PureComponent<SettingRowProps> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
