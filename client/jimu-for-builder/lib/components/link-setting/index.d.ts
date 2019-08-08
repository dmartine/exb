/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, IMAppConfig, ImmutableArray, ThemeVariables, SerializedStyles, BrowserSizeMode, InjectedIntl } from 'jimu-core';
import { LinkParam } from './link-setting-types';
interface Props {
    className?: string;
    linkParam?: LinkParam;
    onSettingConfirm?: any;
    okButtonBottom?: string;
    selectAreaMaxHeight?: string;
    isLinkPageSetting?: boolean;
    dataSourceIds?: ImmutableArray<string>;
}
interface States {
    originLinkParam: LinkParam;
    linkParam: LinkParam;
}
interface StateExtraProps {
    appConfig: IMAppConfig;
    browserSizeMode: BrowserSizeMode;
}
interface ExtraProps {
    theme: ThemeVariables;
    intl: InjectedIntl;
}
export declare class _LinkSetting extends React.PureComponent<Props & ExtraProps & StateExtraProps, States> {
    constructor(props: any);
    componentWillMount(): void;
    getStyle: (theme: ThemeVariables) => SerializedStyles;
    render(): JSX.Element;
    getLinkTypeContent: () => JSX.Element;
    componentDidMount(): void;
    getLinkContent: (linkType: string) => JSX.Element;
    linkTypeChange: (e: any) => void;
    radioOpenTypeChange: (openType: string) => void;
    linkParamChange: (changedParam: LinkParam, isTypeSame?: boolean) => void;
    settingConfirm: () => void;
}
declare const _default: React.ComponentClass<Props, any>;
export default _default;
