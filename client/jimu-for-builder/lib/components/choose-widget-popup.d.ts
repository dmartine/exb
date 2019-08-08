/// <reference types="react" />
import { React } from 'jimu-core';
interface CardImage {
    src: string;
    alt?: string;
}
export interface WidgetCardType {
    title: string;
    uri: string;
    image: CardImage;
}
interface Props {
    title?: string;
    onChange?: (listItem: any) => void;
    onOK: (widgetName: string) => void;
    onCancel?: () => void;
}
interface State {
    currentWidget: string;
    listInfo: WidgetCardType[];
}
interface PreloadProps {
    listInfo: WidgetCardType[];
}
export declare class ChooseWidgetPopup extends React.PureComponent<Props, State> {
    constructor(props: any);
    componentDidMount(): void;
    getListInfo(): Promise<PreloadProps>;
    onSelectWidget: (widgetUri: string) => void;
    getListItemJSX: (item: WidgetCardType) => JSX.Element;
    render(): JSX.Element;
}
export {};
