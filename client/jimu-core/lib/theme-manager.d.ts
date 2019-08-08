import { ThemeVariables, IMThemeVariables, ThemeInfo, ThemeVariablesModule } from './types/theme';
import { SerializedStyles } from '@emotion/css';
import * as Immutable from 'seamless-immutable';
import { IMThemeManifest } from './types/manifest';
declare type ThemePath = string;
declare type CustomThemeJson = Partial<IMThemeVariables>;
export default class ThemeManager {
    themesPath: ThemePath;
    themeListInfo: Immutable.ImmutableArray<ThemeInfo>;
    jimuThemePath: ThemePath;
    jimuThemeModule: Immutable.ImmutableObject<any>;
    jimuThemeVariablesModule: ThemeVariablesModule;
    themeModule: Immutable.ImmutableObject<any>;
    themeJsons: {
        [themeUri: string]: {
            defaultVariables: IMThemeVariables;
            customVariables: CustomThemeJson;
        };
    };
    themeManifests: {
        [themeUri: string]: IMThemeManifest;
    };
    initialized: boolean;
    static instance: ThemeManager;
    static getInstance(): ThemeManager;
    init(themeUri: ThemePath): Promise<void>;
    private initTheme;
    changeTheme(themeUri?: ThemePath): Promise<void>;
    setJimuThemeModulePath: (path: string) => void;
    getJimuThemeModulePath: () => string;
    loadThemeVariables: (themeUri: string) => Promise<Immutable.ImmutableObject<ThemeVariables>>;
    private updateThemeVariables;
    updateCustomTheme: (themeName: string, customThemeVariables: Partial<Immutable.ImmutableObject<ThemeVariables>>) => Partial<Immutable.ImmutableObject<ThemeVariables>>;
    addChangedThemeVariables: (themeName: string, customVariables: Partial<Immutable.ImmutableObject<ThemeVariables>>) => Partial<Immutable.ImmutableObject<ThemeVariables>>;
    getGlobalStyles: (theme: Immutable.ImmutableObject<ThemeVariables>) => SerializedStyles;
    getComponentStyles: (componentName: string, props?: any) => SerializedStyles;
    getThemeInfo: (themeName: string, themePath?: string) => Promise<ThemeInfo>;
    getThemeListInfo: (forceRefresh?: boolean) => Promise<Immutable.ImmutableArray<ThemeInfo>>;
    loadThemeManifest(themePath: string): Promise<IMThemeManifest>;
    getThemeManifest(themePath: string): IMThemeManifest;
    setThemeFolderPath(newThemeFolderPath: ThemePath): void;
    private loadJimuTheme;
    private loadTheme;
    private loadThemeListInfo;
    private getThemeName;
    private ensureThemeJson;
}
export {};
