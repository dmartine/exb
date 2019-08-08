import {AbstractMessageAction, MessageType, Message, getAppStore, appActions, StringSelectionChangeMessage, DataRecordsSelectionChangeMessage, ExtentChangeMessage} from 'jimu-core';

export default class QueryAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return messageType === MessageType.ExtentChange;
  }

  filterMessage(message: Message): boolean{return true;}

  onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
    switch(message.type){
      case MessageType.ExtentChange:
        getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'queryExtent', (message as ExtentChangeMessage).extent.toJSON()));
        break;
    }
    
    return true;
  }
}