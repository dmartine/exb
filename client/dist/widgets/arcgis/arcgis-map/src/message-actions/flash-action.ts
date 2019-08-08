import { AbstractMessageAction, MessageType, Message, getAppStore, appActions, 
  SpatialDataRecordsSelectionChangeMessage, FeatureDataRecord, JimuFieldType, loadArcGISJSAPIModules } from 'jimu-core';
import {IMConfig} from './flash-action-setting';
import {handleFeature} from '../runtime/utils';

export default class PanToAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return messageType === MessageType.SpatialDataRecordsSelectionChange || messageType === MessageType.DataRecordsSelectionChange;
  }

  filterMessage(message: Message): boolean{
    return true;
  }

  onExecute(message: Message, actionConfig?: IMConfig): Promise<boolean> | boolean{
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: __esri.GraphicConstructor = null;
      [Graphic] = modules;

      switch(message.type){
        case MessageType.SpatialDataRecordsSelectionChange:
          if (!actionConfig.layerId || !actionConfig.layerField || !actionConfig.messageField) {
            break;
          }
  
          let tempMessage: SpatialDataRecordsSelectionChangeMessage = message as SpatialDataRecordsSelectionChangeMessage;
  
          let whereSql = `${actionConfig.layerField.name} IN `;
          let messageFieldName = actionConfig.messageField.name;
          let messageFieldType = actionConfig.messageField.type;
          let messageFieldValues = [];
  
          for (let i = 0; i < tempMessage.records.length; i++) {
            let tempFieldValue = tempMessage.records[i].getData()[messageFieldName];
            if (messageFieldValues.indexOf(`${this.formatValue(tempFieldValue, messageFieldType)}`) > -1) {
              continue;
            } else {
              messageFieldValues.push(`${this.formatValue(tempMessage.records[i].getData()[messageFieldName], messageFieldType)}`);
            }
          }
  
          if (messageFieldValues.length > 0) {
            whereSql = whereSql + `(${messageFieldValues.join(', ')})`;
          } else {
            whereSql = null;
          }
  
          let flashFeatures = [];
          if (tempMessage.records) {
            for (let i = 0; i < tempMessage.records.length; i++) {
              if ((tempMessage.records[i] as FeatureDataRecord).feature) {
                flashFeatures.push(handleFeature((tempMessage.records[i] as FeatureDataRecord).feature, Graphic));
              }
            }
          }
  
          let flashActionValue = {
            layerId: actionConfig.layerId,
            querySQL: whereSql
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `flashActionValue`, flashActionValue));
          break;
      }
  
      return true;
    });
  }

  formatValue (value, type: string) {
    if (type === JimuFieldType.String) {
      return `'${value}'`;
    } else if (type === JimuFieldType.Number) {
      return `${value}`;
    } else if (type === JimuFieldType.Date) {
      return `'${value}'`;
    }
  }
}