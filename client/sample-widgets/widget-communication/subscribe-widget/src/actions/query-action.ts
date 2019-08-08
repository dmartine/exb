import {AbstractMessageAction, MessageType, Message, getAppStore, appActions, StringSelectionChangeMessage, DataRecordsSelectionChangeMessage} from 'jimu-core';

interface ConfigForStringChangeMessage{
  fieldName: string;
}
interface ConfigForFeatureChangeMessage{
  featureFieldName: string;
  queryFieldName: string;
}
export default class QueryAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return [MessageType.StringSelectionChange, MessageType.DataRecordsSelectionChange, MessageType.SpatialDataRecordsSelectionChange].indexOf(messageType) > -1;
  }

  filterMessage(message: Message): boolean{return true; }

  onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
    let q = `${(actionConfig as ConfigForStringChangeMessage).fieldName} = '${message}'`
    switch(message.type){
      case MessageType.StringSelectionChange:
        q = `${(actionConfig as ConfigForStringChangeMessage).fieldName} = '${(message as StringSelectionChangeMessage).str}'`
        break;
      case MessageType.DataRecordsSelectionChange:
      case MessageType.SpatialDataRecordsSelectionChange:
        q = `${(actionConfig as ConfigForFeatureChangeMessage).queryFieldName} =
          '${(message as DataRecordsSelectionChangeMessage).records[0].getData()[(actionConfig as ConfigForFeatureChangeMessage).featureFieldName]}'`
        break;
    }
    
    getAppStore().dispatch(appActions.widgetStatePropChange(this.widgetId, 'queryString', q));
    return true;
  }
}