import { AbstractMessageAction, MessageType, Message, getAppStore, appActions, SpatialDataRecordSetCreateMessage, SpatialDataRecordSetUpdateMessage, 
  SpatialDataRecordsSelectionChangeMessage, FeatureDataRecord, ExtentChangeMessage, loadArcGISJSAPIModules } from 'jimu-core';
import {handleFeature} from '../runtime/utils';

export default class ZoomToFeatureAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return messageType === MessageType.SpatialDataRecordSetCreate || messageType === MessageType.SpatialDataRecordSetUpdate 
      || messageType === MessageType.SpatialDataRecordsSelectionChange || messageType === MessageType.ExtentChange;
  }

  filterMessage(message: Message): boolean{
    return true;
  }

  onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
    return loadArcGISJSAPIModules(['esri/Graphic']).then(modules => {
      let Graphic: __esri.GraphicConstructor = null;
      [Graphic] = modules;

      switch(message.type){
        case MessageType.SpatialDataRecordSetCreate:
          let spatialDataRecordSetCreateMessage = message as SpatialDataRecordSetCreateMessage;
  
          let newFeatureSet = {};
          if (spatialDataRecordSetCreateMessage.dataRecordSet && spatialDataRecordSetCreateMessage.dataRecordSet.records) {
            let features = [];
            for (let i = 0; i < spatialDataRecordSetCreateMessage.dataRecordSet.records.length; i++) {
              if ((spatialDataRecordSetCreateMessage.dataRecordSet.records[i] as FeatureDataRecord).feature) {
                features.push(handleFeature((spatialDataRecordSetCreateMessage.dataRecordSet.records[i] as 
                  FeatureDataRecord).feature, Graphic).geometry);
              }
            }
  
            newFeatureSet = {
              features: features
            } as __esri.FeatureSet
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `zoomToFeatureActionValue.value`, newFeatureSet));
          break;
        case MessageType.SpatialDataRecordSetUpdate:
          let spatialDataRecordSetUpdateMessage = message as SpatialDataRecordSetUpdateMessage;
  
          let updateFeatureSet = {};
          if (spatialDataRecordSetUpdateMessage.dataRecordSet && spatialDataRecordSetUpdateMessage.dataRecordSet.records) {
            let features = [];
            for (let i = 0; i < spatialDataRecordSetUpdateMessage.dataRecordSet.records.length; i++) {
              if ((spatialDataRecordSetUpdateMessage.dataRecordSet.records[i] as FeatureDataRecord).feature) {
                features.push(handleFeature((spatialDataRecordSetUpdateMessage.dataRecordSet.records[i] as 
                  FeatureDataRecord).feature, Graphic).geometry);
              }
            }
  
            updateFeatureSet = {
              features: features
            } as __esri.FeatureSet
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `zoomToFeatureActionValue.value`, updateFeatureSet));
          break;
        case MessageType.SpatialDataRecordsSelectionChange:
          let spatialDataRecordsSelectionChangeMessage = message as SpatialDataRecordsSelectionChangeMessage;
  
          let selectFeatures = [];
          if (spatialDataRecordsSelectionChangeMessage.records) {
            for (let i = 0; i < spatialDataRecordsSelectionChangeMessage.records.length; i++) {
              if ((spatialDataRecordsSelectionChangeMessage.records[i] as FeatureDataRecord).feature) {
                selectFeatures.push(handleFeature((spatialDataRecordsSelectionChangeMessage.records[i] as 
                  FeatureDataRecord).feature, Graphic).geometry);
              }
            }
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `zoomToFeatureActionValue.value`, selectFeatures));
          break;
        case MessageType.ExtentChange:
          let extentChangeMessage = message as ExtentChangeMessage;
          if (extentChangeMessage.getRelatedWidgetIds().indexOf(this.widgetId) > -1) {
            break;
          }
  
          let zoomToFeatureActionValue = {
            value: extentChangeMessage.extent,
            relatedWidgets: extentChangeMessage.getRelatedWidgetIds()
          }
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `zoomToFeatureActionValue`, zoomToFeatureActionValue));
          break;
      }
  
      return true;
    });
  }
}