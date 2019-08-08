import {Expression} from 'jimu-core';
import { LinkParam } from 'jimu-for-builder';
import { FourSidesUnit, BorderStyle, BoxShadowStyle, ImageParam } from 'jimu-ui';
import {ImmutableObject} from 'seamless-immutable';

export enum ImgSourceType {
  ByUpload = 'BYUPLOAD',
  ByStaticUrl = 'BYSTATICURL',
  ByDynamicUrl = 'BYDYNAMICURL'
}

interface FunctionConfig {
  altText: string;
  toolTip: string;
  srcExpression?: ImmutableObject<Expression>;
  altTextExpression: ImmutableObject<Expression>;
  toolTipExpression: ImmutableObject<Expression>;
  linkParam: LinkParam;

  scale?: string;
  imgSourceType?: ImgSourceType;
  isCropped: boolean;
  widgetWidth?: number;
  widgetHeight?: number;

  imageParam?: ImmutableObject<ImageParam>;
}

export interface StyleConfig {
  name?: string;
  shape?: string;
  backgroundColor?: string;
  border?: BorderStyle;
  borderRadius?: FourSidesUnit;
  boxShadow?: BoxShadowStyle;
}

export interface ShapeStyle {
  borderRadius?: FourSidesUnit;
  thumbUrl?: string;
}

export interface Config{
  functionConfig: FunctionConfig;
  styleConfig: StyleConfig;
}

export const ScaleType = {
  Fill: {
    backgroundSize: '100% 100%'
  },
  Fit: {
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  },
  Contain: {
    backgroundSize: 'contain'
  }
}

export type IMConfig = ImmutableObject<Config>;