import { Expression, ImmutableObject } from 'jimu-core';
import { IMLinkParam } from 'jimu-for-builder'

export type IMExpression = ImmutableObject<Expression>;
export interface ExpressionMap {
  [id: string]: IMExpression
}
export type IMExpressionMap = ImmutableObject<ExpressionMap>;

export interface LinkParamMap {
  [id: string]: IMLinkParam
}
export type IMLinkParamMap = ImmutableObject<LinkParamMap>;


export interface Config {
  text: string;
  link?: IMLinkParamMap,
  expression?: IMExpressionMap
}

export type IMConfig = ImmutableObject<Config>;