declare const _default: {
    colors: {
        grays: {
            gray100: string;
            gray200: string;
            gray300: string;
            gray400: string;
            gray500: string;
            gray600: string;
            gray700: string;
            gray800: string;
            gray900: string;
        };
        indigos: {
            indigo100: string;
            indigo200: string;
            indigo300: string;
            indigo400: string;
            indigo500: string;
        };
        cyans: {
            cyan100: string;
            cyan200: string;
            cyan300: string;
            cyan400: string;
            cyan500: string;
        };
        greens: {
            green100: string;
            green200: string;
            green300: string;
            green400: string;
            green500: string;
        };
        reds: {
            red100: string;
            red200: string;
            red300: string;
            red400: string;
            red500: string;
        };
        teals: {
            teal100: string;
            teal200: string;
            teal300: string;
            teal400: string;
            teal500: string;
        };
        pinks: {
            pink100: string;
            pink200: string;
            pink300: string;
            pink400: string;
            pink500: string;
        };
        yellows: {
            yellow100: string;
            yellow200: string;
            yellow300: string;
            yellow400: string;
            yellow500: string;
        };
        oranges: {
            orange100: string;
            orange200: string;
            orange300: string;
            orange400: string;
            orange500: string;
        };
        blues: {
            blue100: string;
            blue200: string;
            blue300: string;
            blue400: string;
            blue500: string;
        };
        purples: {
            purple100: string;
            purple200: string;
            purple300: string;
            purple400: string;
            purple500: string;
        };
        white: string;
        black: string;
        blue: string;
        indigo: string;
        purple: string;
        pink: string;
        red: string;
        orange: string;
        yellow: string;
        green: string;
        teal: string;
        cyan: string;
        gray: string;
        grayDark: string;
        primary: string;
        secondary: string;
        success: string;
        info: string;
        warning: string;
        danger: string;
        light: string;
        dark: string;
    };
    typography: {
        fontFamilyBase: string;
        fontSizeRoot: string;
        fontSizeBase: string;
        fontSizeLg: string;
        fontSizeSm: string;
        fontWeightLight: number;
        fontWeightNormal: number;
        fontWeightBold: number;
        fontWeightBase: number;
        lineHeightBase: number;
        lineHeightLg: number;
        lineHeightSm: number;
        headings: {
            h1FontSize: string;
            h2FontSize: string;
            h3FontSize: string;
            h4FontSize: string;
            h5FontSize: string;
            h6FontSize: string;
            fontFamily: string;
            fontWeight: number;
            lineHeight: number;
            color: string;
            marginBottom: string;
        };
        paragraph: {
            marginBottom: string;
        };
        label: {
            marginBottom: string;
        };
        hr: {
            marginY: string;
            borderColor: string;
            borderWidth: string;
        };
        small: {
            fontSize: string;
        };
        mark: {
            padding: string;
            bg: string;
        };
    };
    spacer: string;
    spacers: {
        0: string;
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    };
    border: {
        color: string;
        width: string;
    };
    borderRadiuses: {
        default: string;
        sm: string;
        lg: string;
    };
    boxShadows: {
        default: string;
        sm: string;
        lg: string;
    };
    body: {
        bg: string;
        color: string;
    };
    header: {
        bg: string;
        color: string;
    };
    link: {
        color: string;
        decoration: string;
        hover: {
            color: string;
            decoration: string;
        };
    };
    components: {
        alert: {
            paddingY: string;
            paddingX: string;
            marginBottom: string;
            borderRadius: string;
            linkFontWeight: number;
            borderWidth: string;
            bgLevel: string;
            borderLevel: string;
            colorLevel: string;
        };
        badge: {
            fontSize: string;
            fontWeight: number;
            paddingX: string;
            paddingY: string;
            borderRadius: string;
            pill: {
                paddingX: string;
                borderRadius: string;
            };
        };
        breadcrumb: {
            bg: string;
            activeColor: string;
            paddingY: string;
            paddingX: string;
            marginBottom: string;
            borderRadius: string;
            item: {
                color: string;
                hoverColor: string;
                padding: string;
            };
            divider: {
                content: string;
                color: string;
            };
        };
        button: {
            color: any;
            outlineBorder: string;
            border: {
                width: string;
            };
            boxShadow: string;
            activeBoxShadow: string;
            sizes: {
                default: {
                    fontSize: string;
                    lineHeight: number;
                    paddingX: string;
                    paddingY: string;
                    borderRadius: string;
                };
                sm: {
                    fontSize: string;
                    lineHeight: number;
                    paddingX: string;
                    paddingY: string;
                    borderRadius: string;
                };
                lg: {
                    fontSize: string;
                    lineHeight: number;
                    paddingX: string;
                    paddingY: string;
                    borderRadius: string;
                };
            };
            variants: {
                primary: {
                    hover: string;
                };
                secondary: {
                    hover: string;
                };
                success: {
                    hover: string;
                };
                danger: {
                    hover: string;
                };
                warning: {
                    hover: string;
                };
                info: {
                    hover: string;
                };
            };
        };
        card: {
            spacer: {
                y: string;
                x: string;
            };
            border: {
                width: string;
                color: string;
            };
            borderRadius: string;
            innerBorderRadius: string;
            capBg: string;
            bg: string;
            img: {
                margin: string;
                overlayPadding: string;
            };
            groupMargin: string;
            deckMargin: string;
            columns: {
                count: number;
                gap: string;
                margin: string;
            };
        };
        close: {
            fontSize: string;
            fontWeight: number;
            color: string;
            textShadow: string;
        };
        dropdown: {
            minWidth: string;
            paddingY: string;
            spacer: string;
            bg: string;
            border: {
                color: string;
                width: string;
            };
            borderRadius: string;
            divider: {
                bg: string;
            };
            boxShadow: string;
            link: {
                color: string;
                hoverColor: string;
                hoverBg: string;
                activeColor: string;
                activeBg: string;
                disabledColor: string;
            };
            item: {
                paddingY: string;
                paddingX: string;
            };
            header: {
                color: string;
            };
            zIndex: number;
        };
        form: {
            group: {
                marginBottom: string;
            };
            text: {
                marginTop: string;
            };
            check: {
                inline: {
                    marginX: string;
                    inputMarginX: string;
                };
            };
        };
        input: {
            bg: string;
            disabledBg: string;
            color: string;
            border: {
                color: string;
                width: string;
            };
            boxShadow: any;
            focus: {
                bg: string;
                borderColor: string;
                color: string;
                width: string;
                boxShadow: any;
            };
            placeHolderColor: string;
            plaintextColor: string;
            sizes: {
                default: {
                    fontSize: string;
                    paddingY: string;
                    paddingX: string;
                    lineHeight: number;
                    borderRadius: string;
                    height: string;
                };
                sm: {
                    fontSize: string;
                    paddingY: string;
                    paddingX: string;
                    lineHeight: number;
                    borderRadius: string;
                    height: string;
                };
                lg: {
                    fontSize: string;
                    paddingY: string;
                    paddingX: string;
                    lineHeight: number;
                    borderRadius: string;
                    height: string;
                };
            };
            transition: string;
            checkbox: {
                size: string;
                borderColor: string;
                bg: string;
                checked: {
                    color: string;
                    bg: string;
                };
                focusBorderColor: string;
                iconSize: string;
            };
            radio: {
                size: string;
                borderColor: string;
                bg: string;
                checked: {
                    color: string;
                    bg: string;
                };
                focusBorderColor: string;
                iconSize: string;
            };
            switch: {
                width: string;
                height: string;
                bg: string;
                checkedBg: string;
                slider: {
                    gap: string;
                    height: string;
                    width: string;
                    color: string;
                };
            };
            slider: {
                sizes: {
                    default: {
                        height: string;
                    };
                    sm: {
                        height: string;
                    };
                    lg: {
                        height: string;
                    };
                };
                bg: string;
                borderRadius: string;
                progress: {
                    bg: string;
                };
                thumb: {
                    sizes: {
                        defaultSize: string;
                        smSize: string;
                        lgSize: string;
                    };
                    bg: string;
                    borderColor: string;
                };
            };
        };
        listGroup: {
            fontSize: string;
            bg: string;
            border: {
                color: string;
                width: string;
            };
            borderRadius: string;
            item: {
                paddingY: string;
                paddingX: string;
            };
            hover: {
                bg: string;
            };
            active: {
                color: string;
                bg: string;
                borderColor: string;
            };
            disabled: {
                color: string;
                bg: string;
            };
            action: {
                color: string;
                hover: {
                    color: string;
                };
                active: {
                    color: string;
                    bg: string;
                };
            };
        };
        inputGroup: {
            addon: {
                color: string;
                bg: string;
                borderColor: string;
            };
        };
        modal: {
            innerPadding: string;
            transition: string;
            dialog: {
                margin: string;
                marginYSmUp: string;
            };
            title: {
                lineHeight: number;
            };
            content: {
                bg: string;
                border: {
                    color: string;
                    width: string;
                };
                borderRadius: string;
                boxShadow: string;
                boxShadowSmUp: string;
            };
            backdrop: {
                bg: string;
                opacity: number;
            };
            header: {
                border: {
                    color: string;
                    width: string;
                };
                paddingY: string;
                paddingX: string;
            };
            footer: {
                border: {
                    color: string;
                    width: string;
                };
            };
            sizes: {
                lg: string;
                md: string;
                sm: string;
            };
        };
        nav: {
            link: {
                color: string;
                paddingY: string;
                paddingX: string;
                activeColor: string;
                disabledColor: string;
                gutter: string;
                icon: {
                    spacer: string;
                };
            };
            tabs: {
                gutter: string;
                link: {
                    color: string;
                    bg: string;
                    hover: {
                        bg: string;
                        borderColor: string;
                    };
                    disabled: {
                        bg: string;
                    };
                    active: {
                        color: string;
                        bg: string;
                        borderColor: string;
                    };
                };
                border: {
                    color: string;
                    width: string;
                };
                borderRadius: string;
                underline: {
                    lineColor: string;
                    lineActiveColor: string;
                };
                pills: {
                    borderRadius: string;
                    link: {
                        active: {
                            color: string;
                            bg: string;
                        };
                    };
                };
                divider: {
                    color: string;
                    marginY: string;
                };
            };
        };
        navbar: {
            fontSize: string;
            paddingY: string;
            paddingX: string;
            nav: {
                link: {
                    paddingX: string;
                    height: string;
                };
            };
            brand: {
                fontSize: string;
                height: string;
                paddingY: string;
            };
            toggler: {
                paddingY: string;
                paddingX: string;
                fontSize: string;
                borderRadius: string;
            };
            themes: {
                dark: {
                    color: string;
                    hoverColor: string;
                    activeColor: string;
                    disabledColor: string;
                    toggler: {
                        borderColor: string;
                    };
                };
                light: {
                    color: string;
                    hoverColor: string;
                    activeColor: string;
                    disabledColor: string;
                    toggler: {
                        borderColor: string;
                    };
                };
            };
        };
        pagination: {
            color: string;
            bg: string;
            border: {
                color: string;
                width: string;
            };
            lineHeight: number;
            gutter: string;
            focus: {
                boxShadow: string;
                outline: string;
            };
            hover: {
                color: string;
                bg: string;
                borderColor: string;
            };
            active: {
                color: string;
                bg: string;
                borderColor: string;
            };
            disabled: {
                color: string;
                bg: string;
                borderColor: string;
            };
            sizes: {
                default: {
                    paddingY: string;
                    paddingX: string;
                };
                sm: {
                    paddingY: string;
                    paddingX: string;
                };
                lg: {
                    paddingY: string;
                    paddingX: string;
                };
            };
            item: {
                minWidth: string;
                borderRadius: string;
            };
        };
        popover: {
            fontSize: string;
            bg: string;
            maxWidth: string;
            border: {
                color: string;
                width: string;
            };
            borderRadius: string;
            boxShadow: string;
            header: {
                bg: string;
                color: string;
                paddingY: string;
                paddingX: string;
            };
            body: {
                color: string;
                paddingY: string;
                paddingX: string;
            };
            arrow: {
                width: string;
                height: string;
                color: string;
                outerColor: string;
            };
        };
        progress: {
            height: string;
            fontSize: string;
            bg: string;
            borderRadius: string;
            boxShadow: string;
            bar: {
                color: string;
                bg: string;
                animationTiming: string;
                transition: string;
            };
        };
        tooltip: {
            fontSize: string;
            maxWidth: string;
            color: string;
            bg: string;
            borderRadius: string;
            boxShadow: string;
            opacity: number;
            paddingY: string;
            paddingX: string;
            margin: string;
            arrow: {
                size: string;
                color: string;
            };
        };
    };
    helpers: {
        typography: {
            lead: {
                fontSize: string;
                fontWeight: number;
            };
            display: {
                1: {
                    fontSize: string;
                    fontWeight: number;
                };
                2: {
                    fontSize: string;
                    fontWeight: number;
                };
                3: {
                    fontSize: string;
                    fontWeight: number;
                };
                4: {
                    fontSize: string;
                    fontWeight: number;
                };
                lineHeight: number;
            };
            blockquote: {
                fontSize: string;
                smallColor: string;
            };
        };
    };
};
export default _default;
