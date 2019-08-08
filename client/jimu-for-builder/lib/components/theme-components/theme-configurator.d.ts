/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, ImmutableObject, ThemeVariables, IMThemeVariables, ThemeManager, ThemeInfo, IMThemeInfo, InjectedIntl } from 'jimu-core';
interface ThemeConfiguratorProps {
    themeInfo?: IMThemeInfo;
    className?: string;
    theme?: IMThemeVariables;
    themeManager?: ThemeManager;
    sharedTheme?: object;
    intl?: InjectedIntl;
    showLoading?: boolean;
    onChange?: (name: string) => void;
    onThemeUpdate?: (customVariables: Partial<ThemeVariables>) => void;
    onThemeSave?: () => void;
    onThemeReset?: () => void;
    onThemeDone?: () => void;
}
declare type ThemeInfoWithVariables = ImmutableObject<Partial<ThemeInfo> & {
    variables?: IMThemeVariables;
}>;
interface ThemeConfiguratorState {
    themeInfo: ThemeInfoWithVariables;
    isDirty: boolean;
    useSharedTheme: boolean;
}
declare class _ThemeConfigurator extends React.PureComponent<ThemeConfiguratorProps, ThemeConfiguratorState> {
    private themeManager;
    private _customVariablesNoSharedTheme;
    private variableLabelMapping;
    private assignVarsToGroups;
    private createInputs;
    private onInputChange;
    private toggleUseSharedTheme;
    private convertSharedTheme;
    private getLocaleString;
    isDirty: () => boolean;
    titleStr: string;
    constructor(props: any);
    componentDidUpdate(prevProps: any, prevState: any): void;
    render(): JSX.Element;
}
export declare const ThemeConfigurator: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<ThemeConfiguratorProps & React.ClassAttributes<_ThemeConfigurator>, "theme">>;
export {};
