/// <reference types="react" />
import { React } from 'jimu-core';
interface SettingSectionProps {
    title?: string | JSX.Element;
    className?: string;
}
export declare class SettingSection extends React.PureComponent<SettingSectionProps> {
    constructor(props: any);
    render(): JSX.Element;
}
export {};
