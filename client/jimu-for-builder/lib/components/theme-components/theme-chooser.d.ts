/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, IMThemeVariables, ThemeInfo, ImmutableArray, InjectedIntl } from 'jimu-core';
interface ThemeChooserProps {
    themeListInfo: ImmutableArray<ThemeInfo>;
    selectedTheme?: string;
    theme?: IMThemeVariables;
    intl?: InjectedIntl;
    onChange?: (name: string) => void;
}
interface ThemeChooserState {
    selectedTheme: string;
}
declare class _ThemeChooser extends React.PureComponent<ThemeChooserProps, ThemeChooserState> {
    themesPerPage: number;
    themeChooser: any;
    constructor(props: any);
    private onThemeChange;
    renderPage(themeListInfo: ImmutableArray<ThemeInfo>, key: any): JSX.Element;
    componentDidUpdate(prevProps: ThemeChooserProps): void;
    render(): JSX.Element;
}
export declare const ThemeChooser: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<ThemeChooserProps & React.ClassAttributes<_ThemeChooser>, "theme">>;
export {};
