import { ImmutableObject } from 'seamless-immutable';
declare type NumbericValueWithUnit = string;
declare type Color = string;
declare type Size = NumbericValueWithUnit;
declare type LineHeight = number | NumbericValueWithUnit;
export interface ThemeHeadings {
    h1FontSize?: Size;
    h2FontSize?: Size;
    h3FontSize?: Size;
    h4FontSize?: Size;
    h5FontSize?: Size;
    h6FontSize?: Size;
    fontFamily?: Size;
    fontWeight?: number;
    lineHeight?: LineHeight;
    color?: Color;
    marginBottom?: Size;
}
export interface ThemeParagraph {
    marginBottom?: Size;
}
export interface ThemeLabel {
    marginBottom?: Size;
}
export interface ThemeHr {
    marginY?: Size;
    borderColor?: Color;
    borderWidth?: Size;
}
export interface ThemeSmall {
    fontSize?: Size;
}
export interface ThemeMark {
    padding?: Size;
    bg?: Color;
}
export interface ThemeTypographyBase {
    fontFamilyBase?: string;
    fontSizeRoot?: Size;
    fontSizeBase?: Size;
    fontSizeLg?: Size;
    fontSizeSm?: Size;
    fontWeightLight?: number;
    fontWeightNormal?: number;
    fontWeightBold?: number;
    fontWeightBase?: number;
    lineHeightBase?: LineHeight;
    lineHeightLg?: LineHeight;
    lineHeightSm?: LineHeight;
}
export interface ThemeTypography extends ThemeTypographyBase {
    headings?: ThemeHeadings;
    paragraph?: ThemeParagraph;
    label?: ThemeLabel;
    hr?: ThemeHr;
    small?: ThemeSmall;
    mark?: ThemeMark;
}
export interface ThemeColors {
    white?: Color;
    black?: Color;
    blue?: Color;
    indigo?: Color;
    purple?: Color;
    pink?: Color;
    red?: Color;
    orange?: Color;
    yellow?: Color;
    green?: Color;
    teal?: Color;
    cyan?: Color;
    gray?: Color;
    grayDark?: Color;
}
export interface ThemeThemeColors {
    primary?: Color;
    secondary?: Color;
    success?: Color;
    info?: Color;
    warning?: Color;
    danger?: Color;
    light?: Color;
    dark?: Color;
}
export interface ThemeGrays {
    gray100?: Color;
    gray200?: Color;
    gray300?: Color;
    gray400?: Color;
    gray500?: Color;
    gray600?: Color;
    gray700?: Color;
    gray800?: Color;
    gray900?: Color;
}
export interface ThemeIndigos {
    indigo100?: Color;
    indigo200?: Color;
    indigo300?: Color;
    indigo400?: Color;
    indigo500?: Color;
}
export interface ThemeCyans {
    cyan100?: Color;
    cyan200?: Color;
    cyan300?: Color;
    cyan400?: Color;
    cyan500?: Color;
}
export interface ThemeGreens {
    green100?: Color;
    green200?: Color;
    green300?: Color;
    green400?: Color;
    green500?: Color;
}
export interface ThemeTeals {
    teal100?: Color;
    teal200?: Color;
    teal300?: Color;
    teal400?: Color;
    teal500?: Color;
}
export interface ThemePinks {
    pink100?: Color;
    pink200?: Color;
    pink300?: Color;
    pink400?: Color;
    pink500?: Color;
}
export interface ThemeReds {
    red100?: Color;
    red200?: Color;
    red300?: Color;
    red400?: Color;
    red500?: Color;
}
export interface ThemeYellows {
    yellow100?: Color;
    yellow200?: Color;
    yellow300?: Color;
    yellow400?: Color;
    yellow500?: Color;
}
export interface ThemeOranges {
    orange100?: Color;
    orange200?: Color;
    orange300?: Color;
    orange400?: Color;
    orange500?: Color;
}
export interface ThemeBlues {
    blue100?: Color;
    blue200?: Color;
    blue300?: Color;
    blue400?: Color;
    blue500?: Color;
}
export interface ThemePurples {
    purple100?: Color;
    purple200?: Color;
    purple300?: Color;
    purple400?: Color;
    purple500?: Color;
}
export interface ThemeColorPalette {
    grays?: ThemeGrays;
    indigos?: ThemeIndigos;
    cyans?: ThemeCyans;
    greens?: ThemeGreens;
    teals?: ThemeTeals;
    pinks?: ThemePinks;
    reds?: ThemeReds;
    yellows?: ThemeYellows;
    oranges?: ThemeOranges;
    blues?: ThemeBlues;
    purples?: ThemePurples;
}
export interface ThemeAllColors extends ThemeColorPalette, ThemeColors, ThemeThemeColors {
}
export interface ThemeBody {
    color?: Color;
    bg?: Color;
}
export interface ThemeHeader {
    color?: Color;
    bg?: Color;
}
export interface ThemeLink {
    color?: Color;
    decoration?: string;
    hover?: {
        color?: Color;
        decoration?: string;
    };
}
export interface ThemeBorder {
    color?: Color;
    width?: Size;
}
export interface ThemeSpacers {
    [key: number]: Size;
}
export interface ThemeBorderRadiuses {
    default?: Size;
    sm?: Size;
    lg?: Size;
}
export interface ThemeBoxShadows {
    default?: string;
    sm?: string;
    lg?: string;
}
export interface ThemeComponent {
    activeColor?: Color;
    activeBg?: Color;
}
export interface ThemeButtonSize {
    fontSize?: Size;
    lineHeight?: LineHeight;
    paddingX?: Size;
    paddingY?: Size;
    borderRadius?: Size;
}
export interface ThemeInputSize {
    fontSize?: Size;
    paddingY?: Size;
    paddingX?: Size;
    lineHeight?: LineHeight;
    borderRadius?: Size;
    height?: Size | 'auto';
}
export interface ThemeAlert {
    paddingY?: Size;
    paddingX?: Size;
    marginBottom?: Size;
    borderRadius?: Size;
    linkFontWeight?: number;
    borderWidth?: Size;
    bgLevel?: string;
    borderLevel?: string;
    colorLevel?: string;
}
export interface ThemeButtonVariant {
    normal?: Color;
    hover?: Color;
}
export interface ThemeBadge {
    fontSize?: Size;
    fontWeight?: number;
    paddingX?: Size;
    paddingY?: Size;
    borderRadius?: Size;
    pill?: {
        paddingX?: Size;
        borderRadius?: Size;
    };
}
export interface ThemeBreadcrumb {
    bg?: Color;
    activeColor?: Color;
    paddingY?: Size;
    paddingX?: Size;
    marginBottom?: Size;
    borderRadius?: Size;
    item?: {
        color?: Color;
        hoverColor?: Color;
        padding?: Size;
    };
    divider?: {
        content?: string;
        color?: Color;
    };
}
export interface ThemeButton {
    color?: Color;
    outlineBorder?: Color | 'auto';
    border?: {
        width?: Size;
    };
    disabled?: {
        color?: Color;
        bg?: Color;
    };
    boxShadow?: string;
    activeBoxShadow?: string;
    sizes?: {
        default?: ThemeButtonSize;
        sm?: ThemeButtonSize;
        lg?: ThemeButtonSize;
    };
    variants?: {
        [key: string]: ThemeButtonVariant;
    } | 'auto';
}
export interface ThemeCard {
    spacer?: {
        y?: Size;
        x?: Size;
    };
    border?: ThemeBorder;
    borderRadius?: Size;
    innerBorderRadius?: Size;
    capBg?: Color;
    bg?: Color;
    img?: {
        margin?: Size;
        overlayPadding?: Size;
    };
    groupMargin?: Size;
    deckMargin?: Size;
    columns?: {
        count?: number;
        gap?: Size;
        margin?: Size;
    };
}
export interface ThemeClose {
    fontSize?: Size;
    fontWeight?: number;
    color?: Color;
    textShadow?: string;
}
export interface ThemeDropdown {
    minWidth: Size;
    paddingY: Size;
    spacer: Size;
    bg: Color;
    border: ThemeBorder;
    borderRadius: Size;
    divider?: {
        bg?: Color;
    };
    boxShadow?: string;
    link?: {
        color?: Color;
        hoverColor?: Color;
        hoverBg?: Color;
        activeColor?: Color;
        activeBg?: Color;
        disabledColor?: Color;
    };
    item?: {
        paddingX?: Size;
        paddingY?: Size;
    };
    header?: {
        color?: Color;
    };
    zIndex?: number;
}
export interface ThemeForm {
    group?: {
        marginBottom?: Size;
    };
    text?: {
        marginTop?: Size;
    };
    check?: {
        inline?: {
            marginX?: string;
            inputMarginX?: string;
        };
    };
}
interface _SwitchBase {
    size?: Size;
    borderColor?: Color;
    bg?: Color;
    checked?: {
        color?: Color;
        bg?: Color;
    };
    focusBorderColor?: Color;
    iconSize?: Size;
}
export interface ThemeInputCheckbox extends _SwitchBase {
}
export interface ThemeInputRadio extends _SwitchBase {
}
export interface ThemeInputSwitch {
    width?: Size;
    height?: Size;
    bg?: Color;
    checkedBg?: Color;
    slider?: {
        gap?: Size;
        height?: Size | 'auto';
        width?: Size | 'auto';
        color?: Color;
    };
}
export interface ThemeInputSlider {
    sizes?: {
        default?: {
            height?: Size;
        };
        sm?: {
            height?: Size;
        };
        lg?: {
            height?: Size;
        };
    };
    bg?: Color;
    borderRadius?: string;
    progress?: {
        bg?: Color;
    };
    thumb?: {
        sizes?: {
            defaultSize?: Size;
            smSize?: Size;
            lgSize?: Size;
        };
        bg?: Color;
        borderColor?: Color;
    };
}
export interface ThemeInput {
    bg?: Color;
    disabledBg?: Color;
    color?: Color;
    border?: ThemeBorder;
    boxShadow?: string;
    focus?: {
        bg?: Color;
        borderColor?: Color;
        color?: Color;
        width?: Size;
        boxShadow?: string;
    };
    placeHolderColor?: Color;
    plaintextColor?: Color;
    sizes?: {
        default?: ThemeInputSize;
        sm?: ThemeInputSize;
        lg?: ThemeInputSize;
    };
    transition?: string;
    checkbox?: ThemeInputCheckbox;
    radio?: ThemeInputRadio;
    switch?: ThemeInputSwitch;
    slider?: ThemeInputSlider;
}
export interface ThemeInputGroup {
    addon?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
}
export interface ThemeListGroup {
    fontSize?: Size;
    bg?: Color;
    border?: ThemeBorder;
    borderRadius?: string;
    item?: {
        paddingY?: Size;
        paddingX?: Size;
    };
    hover?: {
        bg?: Color;
    };
    active?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
    disabled?: {
        color?: Color;
        bg?: Color;
    };
    action?: {
        color?: Color;
        hover?: {
            color?: Color;
        };
        active?: {
            color?: Color;
            bg?: Color;
        };
    };
}
export interface ThemeModal {
    innerPadding?: Size;
    transition?: string;
    dialog?: {
        margin?: Size;
        marginYSmUp?: Size;
    };
    title?: {
        lineHeight?: LineHeight;
    };
    content?: {
        bg?: Color;
        border?: ThemeBorder;
        borderRadius?: string;
        boxShadow?: string;
        boxShadowSmUp?: string;
    };
    backdrop?: {
        bg?: Color;
        opacity?: number;
    };
    header?: {
        border?: ThemeBorder;
        paddingY?: Size;
        paddingX?: Size;
    };
    footer?: {
        border?: ThemeBorder;
    };
    sizes?: {
        lg?: Size;
        md?: Size;
        sm?: Size;
    };
}
export interface ThemeNavLink {
    fontSize?: Size;
    color?: Color;
    paddingY?: Size;
    paddingX?: Size;
    activeColor?: Color;
    disabledColor?: Color;
    gutter?: Size;
    icon?: {
        spacer?: Size;
    };
}
export interface ThemeNavTabs {
    gutter?: Size;
    link?: {
        color?: Color;
        bg?: Color;
        hover?: {
            bg?: Color;
            borderColor?: Color;
        };
        disabled?: {
            bg?: Color;
        };
        active?: {
            color?: Color;
            bg?: Color;
            borderColor?: Color;
        };
    };
    border?: ThemeBorder;
    borderRadius?: string;
    underline?: {
        lineColor?: Color;
        lineActiveColor?: Color;
    };
    pills?: {
        borderRadius?: string;
        link?: {
            active?: {
                color?: Color;
                bg?: Color;
            };
        };
    };
    divider?: {
        color?: Color;
        marginY?: Size;
    };
}
export interface ThemeNav {
    link?: ThemeNavLink;
    tabs?: ThemeNavTabs;
}
export interface ThemeNavBar {
    fontSize?: Size;
    paddingY?: Size;
    paddingX?: Size;
    nav?: {
        link?: {
            paddingX?: Size;
            height?: Size | 'auto';
        };
    };
    brand?: {
        fontSize?: Size;
        height?: Size | 'auto';
        paddingY?: Size | 'auto';
    };
    toggler?: {
        paddingY?: Size;
        paddingX?: Size;
        fontSize?: Size;
        borderRadius?: string;
    };
    themes?: {
        dark?: {
            color?: Color;
            hoverColor?: Color;
            activeColor?: Color;
            disabledColor?: Color;
            toggler?: {
                iconBg?: string;
                borderColor?: Color;
            };
        };
        light?: {
            color?: Color;
            hoverColor?: Color;
            activeColor?: Color;
            disabledColor?: Color;
            toggler?: {
                iconBg?: string;
                borderColor?: Color;
            };
        };
    };
}
export interface ThemePagination {
    color?: Color;
    bg?: Color;
    border?: ThemeBorder;
    lineHeight?: LineHeight;
    gutter?: Size;
    focus?: {
        boxShadow?: string;
        outline?: Size;
    };
    hover?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
    active?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
    disabled?: {
        color?: Color;
        bg?: Color;
        borderColor?: Color;
    };
    sizes?: {
        default?: {
            paddingY?: Size;
            paddingX?: Size;
        };
        sm?: {
            paddingY?: Size;
            paddingX?: Size;
        };
        lg?: {
            paddingY?: Size;
            paddingX?: Size;
        };
    };
    item?: {
        minWidth?: Size;
        borderRadius?: string;
    };
}
export interface ThemePopover {
    fontSize?: Size;
    bg?: Color;
    maxWidth?: Size;
    border?: ThemeBorder;
    borderRadius?: string;
    boxShadow?: string;
    header?: {
        bg?: Color;
        color?: Color;
        paddingY?: Size;
        paddingX?: Size;
    };
    body?: {
        color?: Color;
        paddingY?: Size;
        paddingX?: Size;
    };
    arrow?: {
        width?: Size;
        height?: Size;
        color?: Color;
        outerColor?: Color;
    };
}
export interface ThemeProgress {
    height?: Size;
    fontSize?: Size;
    bg?: Color;
    borderRadius?: string;
    boxShadow?: string;
    bar?: {
        color?: Color;
        bg?: Color;
        animationTiming?: string;
        transition?: string;
    };
}
export interface ThemeTooltip {
    fontSize?: Size;
    maxWidth?: Size;
    color?: Color;
    bg?: Color;
    borderRadius?: string;
    boxShadow?: string;
    opacity?: number;
    paddingY?: Size;
    paddingX?: Size;
    margin?: Size;
    arrow?: {
        size?: Size;
        color?: Color;
    };
}
export interface ThemeHelperLead {
    fontSize?: Size;
    fontWeight?: number;
}
export interface ThemeHelperDisplayItem {
    fontSize?: Size;
    fontWeight?: number;
}
export interface ThemeHelperDisplay {
    lineHeight?: LineHeight;
    1?: ThemeHelperDisplayItem;
    2?: ThemeHelperDisplayItem;
    3?: ThemeHelperDisplayItem;
    4?: ThemeHelperDisplayItem;
}
export interface ThemeHelperBlockquote {
    fontSize?: Size;
    smallColor?: Color;
}
export interface ThemeHelpers {
    typography?: {
        lead?: ThemeHelperLead;
        display?: ThemeHelperDisplay;
        blockquote?: ThemeHelperBlockquote;
    };
}
export interface ThemeVariables {
    typography?: ThemeTypography;
    colors?: ThemeAllColors;
    spacer?: Size;
    spacers?: ThemeSpacers;
    borderRadiuses?: ThemeBorderRadiuses;
    boxShadows?: ThemeBoxShadows;
    component?: ThemeComponent;
    header?: ThemeHeader;
    body?: ThemeBody;
    link?: ThemeLink;
    border?: ThemeBorder;
    components?: {
        alert?: ThemeAlert;
        badge?: ThemeBadge;
        breadcrumb?: ThemeBreadcrumb;
        button?: ThemeButton;
        card?: ThemeCard;
        close?: ThemeClose;
        dropdown?: ThemeDropdown;
        form?: ThemeForm;
        input?: ThemeInput;
        inputGroup?: ThemeInputGroup;
        listGroup?: ThemeListGroup;
        modal?: ThemeModal;
        nav?: ThemeNav;
        navbar?: ThemeNavBar;
        pagination?: ThemePagination;
        popover?: ThemePopover;
        progress?: ThemeProgress;
        tooltip?: ThemeTooltip;
    };
    helpers?: ThemeHelpers;
}
export declare type IMThemeVariables = ImmutableObject<ThemeVariables>;
export interface ThemeVariablesModule {
    colors: ThemeAllColors;
    typography: ThemeTypography;
    spacer: Size;
    generate: (themeVariables: ThemeVariables) => IMThemeVariables;
}
export interface ThemeInfo {
    name: string;
    label: string;
    path?: string;
}
export declare type IMThemeInfo = ImmutableObject<ThemeInfo>;
export {};
