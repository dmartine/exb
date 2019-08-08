import {ImmutableObject, Expression} from 'jimu-core';
import {LinkParam} from 'jimu-for-builder';
import {BorderStyle, BoxShadowStyle} from 'jimu-ui';

export interface Config{
  functionConfig: FunctionConfig;
  styleConfig: StyleConfig;
}

export type IMConfig = ImmutableObject<Config>;

export interface FunctionConfig{
  text: string;
  toolTip: string;
  textExpression: ImmutableObject<Expression>;
  toolTipExpression: ImmutableObject<Expression>;
  linkParam: LinkParam;
}

export interface StyleConfig{
  name?: string;
  themeStyle?: ImmutableObject<ThemeStyle>;
  customStyle?: ImmutableObject<CustomStyle>;
}

export interface ThemeStyle{
  className?: string;
  color?: ThemeColorStyle;
  size?: ThemeSizeStyle;
  outline?: boolean;
  rounded?: boolean;
}

export type ThemeColorStyle = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'white' | 'dark' | 'light' | 'link';

export type ThemeSizeStyle = 'lg' | 'sm' | '';

export interface CustomStyle{
  regular?: LinkCSSStyle;
  hover?: LinkCSSStyle;
  clicked?: LinkCSSStyle;
}

export interface LinkCSSStyle{
  shape?: string;
  backgroundColor?: any;
  border?: BorderStyle;
  borderRadius?: any;
  boxShadow?: BoxShadowStyle;
  margin?: any;
  padding?: any;
  text?: any;
}
