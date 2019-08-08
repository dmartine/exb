/// <reference types="react" />
import { withTheme } from 'emotion-theming';
import { ThemeVariables } from '../types/theme';
declare function withStyles(Component: React.ComponentType<any>, name?: string): import("react").FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
declare function traverseConvertValueGetter(targetVariables: Partial<ThemeVariables>, originalVariables: Partial<ThemeVariables>): void;
declare function getThemeNameFromPath(themePath: string): any;
export declare const getThemableVariables: () => {
    typography: {
        fontFamilyBase: {
            variable: string;
            input: string;
        };
        fontSizeBase: {
            variable: string;
            input: string;
        };
    };
    header: {
        color: {
            variable: string;
            input: string;
        };
        bg: {
            variable: string;
            input: string;
        };
    };
    body: {
        color: {
            variable: string;
            input: string;
        };
        bg: {
            variable: string;
            input: string;
        };
    };
    link: {
        color: {
            variable: string;
            input: string;
        };
    };
    button: {
        color: {
            variable: string;
            input: string;
        };
        bg: {
            variable: string;
            input: string;
        };
    };
};
export { withTheme, withStyles, getThemeNameFromPath, traverseConvertValueGetter };
