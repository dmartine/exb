
import { LinkResult, ImmutableObject, ImmutableArray } from 'jimu-core';
import { ThemeColors } from 'jimu-ui'

export enum TransparentColor {
  Transparent = 'transparent'
}

export interface NavLinkType {
  name?: string;
  value: LinkResult
}

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export enum ViewType {
  Auto = 'AUTO',
  Custom = 'CUSTOM'
}

export enum NavStyle {
  Default = 'DEFAULT',
  Tabs = 'TABS',
  Pills = 'PILLS'
}

export interface Config {
  data: ImmutableObject<{
    section: string;
    type: ViewType,
    views?: ImmutableArray<string>;
  }>,
  display: ImmutableObject<{
    vertical?: boolean;
    style: NavStyle,
    color: ThemeColors & TransparentColor,
    activeColor?: ThemeColors,
    textColor?: 'light' | 'dark',
    textAlign: TextAlign
  }>
}

export type IMConfig = ImmutableObject<Config>;