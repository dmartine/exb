/// <reference types="react" />
import { React, IMWidgetJson } from 'jimu-core';
interface State {
}
interface Props {
    widgetJson: IMWidgetJson;
    onWidgetClick: (e: any, wId: string) => void;
}
export default class WidgetItem extends React.PureComponent<Props, State> {
    __unmount: boolean;
    constructor(props: any);
    onItemClick: (e: any) => void;
    render(): JSX.Element;
}
export {};
