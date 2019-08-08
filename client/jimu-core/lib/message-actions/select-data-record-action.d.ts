import { AbstractMessageAction, MessageType, Message } from '../message/message-base-types';
export default class Action extends AbstractMessageAction {
    name: string;
    filterMessageType(messageType: MessageType): boolean;
    filterMessage(message: Message): boolean;
    onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean;
    formatValue(value: any, type: string): string;
}
