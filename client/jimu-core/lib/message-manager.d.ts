import { IMWidgetJson } from './types/app-config';
import { Message, DummyMessageAction, MessageAction, RegisterMessageActionOptions } from './message/message-base-types';
export default class MessageManager {
    static instance: MessageManager;
    static getInstance(): MessageManager;
    private actions;
    private actionClassPromises;
    getActions(): MessageAction[];
    destroyWidgetActions(widgetId: string): void;
    registerWidgetActions(widgetJson: IMWidgetJson): Promise<any>;
    registerAction(options: RegisterMessageActionOptions): Promise<MessageAction>;
    loadActionClass(uri: string): Promise<typeof DummyMessageAction>;
    publishMessage(message: Message): Promise<void>;
    private exeAction;
}
