/// <reference types="react" />
import { React, ThemeVariables } from 'jimu-core';
import { ImageParam } from 'jimu-ui';
interface Props {
    widgetId: string;
    className?: string;
    style?: React.CSSProperties;
    color?: string;
    size?: string;
    label?: string;
    onChange?: (imageParam: ImageParam) => void;
    disabled?: boolean;
    imageParam?: ImageParam;
    isSupportCrop?: boolean;
    theme: ThemeVariables;
}
interface States {
    showImageResourcesPanel: boolean;
}
declare class Widget extends React.PureComponent<Props, States> {
    modalStyle: any;
    constructor(props: any);
    onShowImageResourcesPanel: () => void;
    onCloseImageResourcesPanel: () => void;
    render(): JSX.Element;
}
export declare const ImageChooser: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & React.ClassAttributes<Widget>, "theme">>;
export {};
