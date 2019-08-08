import { ExpressionFrom } from './../expression-builder/types';
declare enum FromStatic {
    Static = "STATIC"
}
export declare const ExpressionInputFrom: {
    [x: number]: string;
    Attribute: ExpressionFrom.Attribute;
    Statistics: ExpressionFrom.Statistics;
    Expression: ExpressionFrom.Expression;
    Static: FromStatic.Static;
};
export declare type ExpressionInputFrom = FromStatic | ExpressionFrom;
export {};
