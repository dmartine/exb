/// <reference types="react" />
import { React } from 'jimu-core';
import { ImageProps } from '../image';
import { LinkParam } from 'jimu-for-builder';
export declare type ContentJustifyType = 'start' | 'center' | 'end';
export interface CardProps {
    title: string;
    image?: ImageProps;
    description?: string;
    textLimit?: number;
    isRichText?: boolean;
    className?: string;
    horizontal?: boolean;
    contentJustify?: ContentJustifyType;
    style?: Object;
    detailTo?: LinkParam;
    detailTarget?: string;
    onClickDetail?: (evt: React.MouseEvent<HTMLLinkElement>) => void;
}
export interface CardState {
}
export declare class _Card extends React.PureComponent<CardProps, CardState> {
    render(): JSX.Element;
}
export declare const Card: React.FunctionComponent<import("emotion-theming/types/helper").AddOptionalTo<any, "theme">>;
