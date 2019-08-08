import { ImmutableObject } from 'seamless-immutable';
import { ImageShapeType } from 'jimu-ui';
import { IconTextSize } from 'jimu-layouts/common';


export enum DisplayType {
  Stack = 'STACK',
  SideBySide = 'SIDEBYSIDE'
}

export interface Config {
  onlyOpenOne: boolean;
  displayType: DisplayType;
  horizontal: boolean;
  iconStyle: ImageShapeType;
  showLabel: boolean;
  iconSize: IconTextSize;
  space: number;
  size: ImmutableObject<{
    [widgetId: string]: {
      width: number,
      height: number
    }
  }>
}

export type IMConfig = ImmutableObject<Config>;