import { AbstractMessageAction, MessageType, Message } from '../message/message-base-types';
import { FieldSchema } from '../../lib/types/app-config';
import { ImmutableObject } from 'seamless-immutable';
interface Config {
    dataSourceId: string;
    messageField: FieldSchema;
    dataSourceField: FieldSchema;
}
export declare type IMFilterActionConfig = ImmutableObject<Config>;
export default class Action extends AbstractMessageAction {
    name: string;
    filterMessageType(messageType: MessageType): boolean;
    filterMessage(message: Message): boolean;
    onExecute(message: Message, actionConfig?: IMFilterActionConfig): Promise<boolean> | boolean;
    formatValue(value: any, type: string): string;
}
export {};
