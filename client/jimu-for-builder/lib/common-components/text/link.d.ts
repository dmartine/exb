/// <reference types="react" />
/// <reference types="react-intl" />
/** @jsx jsx */
import { React, ThemeVariables, ImmutableArray, InjectedIntl } from 'jimu-core';
import { LinkParam } from '../../components/link-setting/link-setting-types';
interface Props {
    title?: string;
    dataSourceIds?: ImmutableArray<string>;
    innerClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    link?: LinkParam;
    onChange?: (link: LinkParam) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
interface ExtraProps {
    intl: InjectedIntl;
    theme?: ThemeVariables;
}
interface State {
    show: boolean;
}
export declare class _Link extends React.PureComponent<Props & ExtraProps, State> {
    static count: number;
    id: string;
    static defaultProps: Partial<Props>;
    constructor(props: any);
    private getStyle;
    private onSettingConfirm;
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    toggle: () => void;
    nls: (id: string) => string;
    render(): JSX.Element;
}
export declare const Link: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<Pick<any, string | number | symbol> & React.ClassAttributes<React.Component<Pick<any, string | number | symbol>, any, any>>, "theme">>;
export {};
