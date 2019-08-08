import { ImmutableObject } from 'jimu-core';
import { LinearUnit, ThemeColors } from 'jimu-ui'

export enum TransparentColor {
  Transparent = 'transparent'
}

export enum Dir {
  Right = 'RIGHT',
  Left = 'LEFT',
  Down = 'DOWN',
  Up = 'UP'
}

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export enum Position {
  Start = 'start',
  End = 'end'
}

export enum NavStyle {
  Default = 'DEFAULT',
  Tabs = 'TABS',
  Pills = 'PILLS'
}

export interface Config {
  dir: Dir;
  style: {
    type: NavStyle,
    color: ThemeColors & TransparentColor,
    textColor?: 'light' | 'dark',
    activeColor: ThemeColors
  },
  main: {
    textAlign: TextAlign;
    space: LinearUnit;
    icon: {
      show: boolean;
      position: Position
    };
  },
  sub: {
    textAlign: TextAlign;
    space: LinearUnit;
    icon: {
      show: boolean;
      position: Position
    };
  }
}

export type IMConfig = ImmutableObject<Config>;