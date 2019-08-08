/// <reference types="react-intl" />
/// <reference types="react" />
import { React, InjectedIntl } from 'jimu-core';
import { BoxShadowStyle } from 'jimu-ui';
interface Props {
    value?: BoxShadowStyle;
    onChange?: (value: BoxShadowStyle) => void;
}
interface ExtraProps {
    intl: InjectedIntl;
}
export declare class _BoxShadowSetting extends React.PureComponent<Props & ExtraProps> {
    static defaultProps: Partial<Props & ExtraProps>;
    _updateShadow(key: string, newValue: any): void;
    nls: (id: string) => string;
    getShadows: () => {
        name: string;
        label: string;
        min: number;
        max: number;
    }[];
    render(): JSX.Element;
}
export declare const BoxShadowSetting: React.ComponentClass<Pick<Props & ExtraProps, "onChange" | "value">, any> & {
    WrappedComponent: React.ComponentType<Props & ExtraProps>;
};
export {};
