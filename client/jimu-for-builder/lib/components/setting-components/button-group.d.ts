/// <reference types="react" />
import { React } from 'jimu-core';
interface SettingButtonGroupOption {
    value: any;
    content: string | JSX.Element;
}
interface SettingButtonGroupProps {
    options: SettingButtonGroupOption[];
    value?: any;
    buttonWidth?: number | string;
    onChange?: (value: any) => void;
}
interface SettingButtonGroupState {
    selectedValue: any;
}
export declare class SettingButtonGroup extends React.PureComponent<SettingButtonGroupProps, SettingButtonGroupState> {
    constructor(props: any);
    onRadioButtonClick: (value: any) => void;
    render(): JSX.Element;
}
export {};
