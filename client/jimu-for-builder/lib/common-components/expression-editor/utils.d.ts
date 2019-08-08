import { ExpressionPart, ExpressionPartType, Expression } from 'jimu-core';
import { InnerExpSelection, ExpSelection, AddPartResult, NewPartsInfo } from './types';
export declare function getWhetherNodeAfterRange(range: Range, node: HTMLElement): boolean;
export declare function getWhetherNodeBeforeRange(range: Range, node: HTMLElement): boolean;
export declare function getNodeByPartId(partId: string, container?: HTMLElement): HTMLElement;
export declare function moveSelectionByPart(partId: string, toStart: boolean, container?: HTMLElement): void;
export declare function moveSelectionByCharacter(partId: string, startOffset: number, container?: HTMLElement): void;
export declare function createRange(node: Node, chars: {
    count: number;
}, range?: Range): Range;
export declare function getSelectionRange(): Range;
export declare function getSelectionPosInnerPart(externalId: string, isRemoving: boolean, container?: HTMLElement): InnerExpSelection;
export declare function getPartIdOfSelection(externalId: string): string;
export declare function getWhetherIsExpContainer(id: string): boolean;
export declare function getPartIdByChildNode(externalId: string, node: HTMLElement): string;
export declare function getPreviouseNodeOfSelection(externalId: string, parentNode: HTMLElement): HTMLElement;
export declare function getNextNodeOfSelection(externalId: string, parentNode: HTMLElement): HTMLElement;
export declare function getSortedKeys(obj: object): string[];
export declare function getSortedArrayByLabel<T extends {
    label: string;
}>(arr: T[]): T[];
export declare function getParentPartId(externalId: string, index: string): string;
export declare function getChildPartId(externalId: string, index: string, childIndex: string): string;
export declare function getIndexOfChildPart(exteranlId: any, childExpId: string): string;
export declare function getIndexOfParentPart(exteranlId: string, partId: string): string;
export declare function getInernalId(externalId: string, id: string): string;
export declare function getWhetherIsParentPartId(externalId: string, id: string): boolean;
export declare function getWhetherIsChildPartId(externalId: string, id: string): boolean;
export declare function getWhetherIsPartId(exteranlId: string, id: string): boolean;
export declare function resolveFunctionExp(exp: string): {
    function: string;
    innerExps: string[];
};
export declare function resolveStringExp(exp: string): string;
export declare function getExps(expressionString: string): string[];
/**
 * return an array which members are string exps and other exps not split
 *
 * e.g. '"The result is: " + (123 + function($f1, 567))' -> ['"The result is: "', ' + (123 + function($f1, 567))']
 *
 */
export declare function handleStringExps(e: string): string[];
/**
 * return an array which is split by four operators: +, -, *, /
 *
 * e.g. ['"The result is: "', ' + (123 + function($f1, 567))'] -> ['"The result is: "', ' + ', '(123', ' + ', 'function($f1, 567))']
 *
 */
export declare function handleFourOperators(e: string[]): string[];
/**
 * return an array which is split by function pattern: functionName(arg1, arg2, ...)
 *
 * e.g. ['"The result is: "', ' + ', '(123', ' + ', 'function($f1, 567))'] -> ['"The result is: "', ' + ', '(123', ' + ', 'function($f1, 567)', ')']
 *
 */
export declare function handleFunctions(e: string[]): string[];
export declare function splitByFunction(exp: string): string[];
/**
 * return an array which is split by brackets and spaces
 *
 * e.g. ['"The result is: "', ' + ', '(123', ' + ', 'function($f1, 567)', ')'] -> ['"The result is: "', ' ', '+', ' ', '(', '123', ' ', '+', ' ', 'function($f1, 567)', ')']
 *
 */
export declare function handleBracketsAndSpaces(e: string[]): string[];
export declare function getLastAddedPartId(addResult: AddPartResult): string;
export declare function getLastAddedPart(addResult: AddPartResult): ExpressionPart;
export declare function getWhetherIsOperatorByNode(externalId: string, parts: ExpressionPart[], node: HTMLElement): boolean;
export declare function getWhetherIsStringByNode(externalId: string, parts: ExpressionPart[], node: HTMLElement): boolean;
export declare function getNewPartsInfo(externalId: string, parts: ExpressionPart[], exps: string[], nextNodeOfSelection: HTMLElement, newCharacter: string, isInEditablePart: boolean, isParentPart: boolean, parentPartIndex?: string): NewPartsInfo;
export declare function getIndexesOfQuotation(text: string): number[];
export declare function getNewCharacterFromExpressionString(previousExpressionString: string, expressionString: string): string;
export declare function getLengthDiffBetweenExpsAndParts(exps: string[], parts: ExpressionPart[]): number;
export declare function getWhetherPartNeedPopover(type: ExpressionPartType): boolean;
export declare function triggerInputEvent(element: HTMLElement): void;
export declare function getSiblingOfExpSelection(externalId: string, partId: string, useNextSibling: boolean, isRemoving: boolean, parts: ExpressionPart[]): ExpSelection;
export declare function isField(exp: string): boolean;
export declare function isFunction(exp: string): boolean;
export declare function isString(exp: string): boolean;
export declare function isNumber(exp: string): boolean;
export declare function isOperator(exp: string): boolean;
export declare function getWhetherFunctionHasArgs(part: ExpressionPart): boolean;
export declare function getExpressionPart(exp: string, dataSourceId?: string, jimuFieldName?: string): ExpressionPart;
export declare function removeOneCharacter(exp: string, characterIndex: number): string;
export declare function getWhetherHaveChildParts(partType: string): boolean;
export declare function getWhetherAddToStart(externalId: string, nextNodeOfSelection: HTMLElement, expression: Expression): boolean;
export declare function removeOperator(e: string): string;
