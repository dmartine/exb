/// <reference types="react" />
import { React } from 'jimu-core';
import { ColorResult } from 'react-color';
interface Props {
    color: string;
    width: string;
    height: string;
    onChange?: (color: ColorResult) => void;
    onChangeComplete?: (color: ColorResult) => void;
}
interface State {
    showPicker: boolean;
}
export default class ColorPicker extends React.PureComponent<Props, State> {
    static displayName: string;
    static count: number;
    id: string;
    constructor(props: any);
    render(): JSX.Element;
}
export {};
