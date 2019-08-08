/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableArray, ThemeVariables, IMUseDataSource } from 'jimu-core';
interface Props {
    dataSourceIds: ImmutableArray<string>;
    isOpen: boolean;
    onClose: () => void;
    onChange?: (expression: string, useDataSource: IMUseDataSource) => void;
    expression?: string;
    isMultiple?: boolean;
}
declare class _SimpleExpressionPopup extends React.PureComponent<Props & {
    theme: ThemeVariables;
}, {}> {
    fontSizeBase: number;
    panelWidth: string;
    modalStyle: {
        position: string;
        top: string;
        bottom: string;
        right: string;
        left: string;
        width: string;
        height: string;
        zIndex: string;
        padding: string;
        border: string;
        borderRadius: string;
        backgroundColor: string;
    };
    overlayStyle: {
        position: string;
        top: string;
        bottom: string;
        right: string;
        left: string;
        width: string;
        height: string;
        zIndex: string;
        padding: string;
        border: string;
        borderRadius: string;
        backgroundColor: string;
    };
    cursorStyle: {
        cursor: string;
    };
    constructor(props: any);
    render(): JSX.Element;
}
declare const SimpleExpressionPopup: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Props & {
    theme: ThemeVariables;
} & React.ClassAttributes<_SimpleExpressionPopup>, "theme">>;
export default SimpleExpressionPopup;
