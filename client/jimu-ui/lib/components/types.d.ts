export interface IconProps {
    name: string;
    size?: number;
    color?: string;
}
export interface TextWithIconProps {
    icon: IconProps;
    text: string;
}
export declare enum NavIconType {
    IMAGE = "image",
    ICON = "icon"
}
export interface NavIcon {
    icon?: any;
    type: NavIconType;
    right?: boolean;
}
export declare enum ToastType {
    Error = "ERROR"
}
