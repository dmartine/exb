import { AbstractMessageAction, MessageType, Message, getAppStore, appActions, SpatialDataRecordSetCreateMessage, SpatialDataRecordSetUpdateMessage, 
  SpatialDataRecordsSelectionChangeMessage, ExtentChangeMessage, loadArcGISJSAPIModules, FeatureDataRecord as FeatureQueryDataRecord } from 'jimu-core';
import { FeatureDataRecord as FeatureLayerDataRecord } from 'jimu-arcgis/arcgis-data-source';
import {handleFeature} from '../runtime/utils';

export default class PanToAction extends AbstractMessageAction{
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
              let dataRecordFeature = (spatialDataRecordSetCreateMessage.dataRecordSet.records[i] as 
                (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature;
              if (dataRecordFeature) {
                features.push(handleFeature(dataRecordFeature, Graphic));
              }
            }
  
            newFeatureSet = {
              features: features
            } as __esri.FeatureSet
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `panToActionValue.value`, newFeatureSet));
          break;
        case MessageType.SpatialDataRecordSetUpdate:
          let spatialDataRecordSetUpdateMessage = message as SpatialDataRecordSetUpdateMessage;
  
          let updateFeatureSet = {};
          if (spatialDataRecordSetUpdateMessage.dataRecordSet && spatialDataRecordSetUpdateMessage.dataRecordSet.records) {
            let features = [];
            for (let i = 0; i < spatialDataRecordSetUpdateMessage.dataRecordSet.records.length; i++) {
              let dataRecordFeature = (spatialDataRecordSetUpdateMessage.dataRecordSet.records[i] as 
                (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature;
              if (dataRecordFeature) {
                features.push(handleFeature(dataRecordFeature, Graphic));
              }
            }
  
            updateFeatureSet = {
              features: features
            } as __esri.FeatureSet
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `panToActionValue.value`, updateFeatureSet));
          break;
        case MessageType.SpatialDataRecordsSelectionChange:
          let spatialDataRecordsSelectionChangeMessage = message as SpatialDataRecordsSelectionChangeMessage;
  
          let selectFeatures = [];
          if (spatialDataRecordsSelectionChangeMessage.records) {
            for (let i = 0; i < spatialDataRecordsSelectionChangeMessage.records.length; i++) {
              let dataRecordFeature = (spatialDataRecordsSelectionChangeMessage.records[i] as 
                (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature;
              if (dataRecordFeature) {
                selectFeatures.push(handleFeature(dataRecordFeature, Graphic));
              }
            }
          }
  
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `panToActionValue.value`, selectFeatures));
          break;
        case MessageType.ExtentChange:
          let extentChangeMessage = message as ExtentChangeMessage;
  
          if (extentChangeMessage.getRelatedWidgetIds().indexOf(this.widgetId) > -1) {
            break;
          }
  
          let panToFeatureActionValue = {
            value: extentChangeMessage.extent,
            relatedWidgets: extentChangeMessage.getRelatedWidgetIds()
          }
          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, `panToActionValue`, panToFeatureActionValue));
          break;
      }
      return true;
    })
  }
}