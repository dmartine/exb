import { ThemeVariablesModule, ThemeVariables, IMThemeVariables, ThemeTypography, ThemeAllColors, ThemeBorder, ThemeBorderRadiuses, ThemeBoxShadows, ThemeComponent, ThemeBody, ThemeLink } from 'jimu-core';
export declare class Variables implements ThemeVariablesModule {
    colors: ThemeAllColors;
    typography: ThemeTypography;
    spacer: string;
    border: ThemeBorder;
    borderRadiuses: ThemeBorderRadiuses;
    boxShadows: ThemeBoxShadows;
    component: ThemeComponent;
    body: ThemeBody;
    link: ThemeLink;
    generate(customVariables: ThemeVariables): IMThemeVariables;
}
