/// <reference types="react-intl" />
/// <reference types="react" />
import { React, InjectedIntl } from 'jimu-core';
import { LineType } from 'jimu-ui';
interface LineStyleProps {
    value: LineType;
    onChange?: (value: string) => void;
    className?: string;
    style?: any;
}
interface ExtraProps {
    intl: InjectedIntl;
}
export declare class LineStyleChooser extends React.PureComponent<LineStyleProps & ExtraProps> {
    static defaultProps: Partial<LineStyleProps & ExtraProps>;
    _onLineStyleChange(e: any): void;
    nls: (id: string) => string;
    getLineStyles: () => {
        label: string;
        value: LineType;
    }[];
    render(): JSX.Element;
}
export {};
