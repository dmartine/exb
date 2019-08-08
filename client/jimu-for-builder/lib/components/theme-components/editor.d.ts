/// <reference types="react-intl" />
/// <reference types="react" />
/** @jsx jsx */
import { React, ThemeManager, IMThemeVariables, ThemeInfo, IMThemeInfo, ImmutableArray, InjectedIntl } from 'jimu-core';
interface ThemeEditorProps {
    themeName?: string;
    className?: string;
    isCustomizationInprogress?: boolean;
    theme?: IMThemeVariables;
    auto?: boolean;
    isBuilder?: boolean;
    themeManager?: ThemeManager;
    intl?: InjectedIntl;
    onThemeChange?: (name: string, themeInfo?: IMThemeInfo) => void;
    onThemeCustomize?: (themeInfo: IMThemeInfo) => void;
}
interface ThemeEditorState {
    selectedTheme: string;
    status: 'ready' | 'loading' | 'loaded';
    themeInfos: ImmutableArray<ThemeInfo>;
}
export declare class _ThemeEditor extends React.PureComponent<ThemeEditorProps, ThemeEditorState> {
    private themeManager;
    private _changeThemeInfo;
    private handleThemeChange;
    private handleCustomize;
    private changeThemeInfo;
    private getStyle;
    constructor(props: any);
    render(): JSX.Element;
    componentDidUpdate(prevProps: ThemeEditorProps): void;
    componentDidMount(): void;
}
export declare const ThemeEditor: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<ThemeEditorProps & React.ClassAttributes<_ThemeEditor>, "theme">>;
export {};
