import { ImmutableObject } from 'seamless-immutable';
export interface Expression {
    name: string;
    parts: ExpressionPart[];
}
export declare type IMExpression = ImmutableObject<Expression>;
export interface ExpressionPart {
    type: ExpressionPartType;
    exp: string;
    parts?: ExpressionPart[];
    dataSourceId?: string;
    jimuFieldName?: string;
}
export declare enum ExpressionPartType {
    Field = "FIELD",
    String = "STRING",
    Operator = "OPERATOR",
    Function = "FUNCTION",
    Number = "NUMBER",
    Unknown = "UNKNOWN"
}
export declare enum ExpressionFunctions {
    Average = "AVERAGE",
    Count = "COUNT",
    Sum = "SUM",
    Max = "MAX",
    Min = "MIN"
}
