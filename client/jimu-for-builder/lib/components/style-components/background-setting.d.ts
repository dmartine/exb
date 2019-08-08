/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, InjectedIntl } from 'jimu-core';
import { BackgroundStyle, FillType, ImageParam } from 'jimu-ui';
interface Props {
    background?: BackgroundStyle;
    onChange?: (background: BackgroundStyle) => void;
    className?: string;
    style?: any;
}
interface ExtraProps {
    intl: InjectedIntl;
}
export declare class _BackgroundSetting extends React.PureComponent<Props & ExtraProps> {
    fileInput: React.RefObject<any>;
    static defaultProps: Partial<Props & ExtraProps>;
    constructor(props: any);
    openBrowseImage: (imageParam: ImageParam) => void;
    _onPositionChange: (e: any) => void;
    _onColorChange: (color: string) => void;
    getStyle: () => import("jimu-core").SerializedStyles;
    nls: (id: string) => string;
    getFillType: () => {
        value: FillType;
        label: string;
    }[];
    render(): JSX.Element;
}
export declare const BackgroundSetting: React.ComponentClass<Pick<any, string | number | symbol>, any> & {
    WrappedComponent: React.ComponentType<any>;
};
export {};
