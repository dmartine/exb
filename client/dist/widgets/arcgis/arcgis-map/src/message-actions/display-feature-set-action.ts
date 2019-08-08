import { AbstractMessageAction, MessageType, Message, getAppStore, appActions, SpatialDataRecordSetUpdateMessage, SpatialDataRecordSetCreateMessage, 
  MutableStoreManager, FeatureDataRecord as FeatureQueryDataRecord, DataSourceTypes, DataSource, FeatureQueryDataSource, loadArcGISJSAPIModules} from 'jimu-core';
import { FeatureDataRecord as FeatureLayerDataRecord } from 'jimu-arcgis/arcgis-data-source';

export default class DisplayFeatureSetAction extends AbstractMessageAction{
  filterMessageType(messageType: MessageType): boolean{
    return messageType === MessageType.SpatialDataRecordSetUpdate || messageType === MessageType.SpatialDataRecordSetCreate;
  }

  filterMessage(message: Message): boolean{
    return true;
  }

  onExecute(message: Message, actionConfig?: any): Promise<boolean> | boolean{
    let spatialDataRecordSetMessage: SpatialDataRecordSetCreateMessage | SpatialDataRecordSetUpdateMessage = 
      message as SpatialDataRecordSetCreateMessage | SpatialDataRecordSetUpdateMessage;

    if (spatialDataRecordSetMessage.dataRecordSet && spatialDataRecordSetMessage.dataRecordSet.records) {
      let datasource: DataSource = spatialDataRecordSetMessage.dataRecordSet.records[0] 
        && spatialDataRecordSetMessage.dataRecordSet.records[0].dataSource;
      if (datasource.type === DataSourceTypes.FeatureQuery) {
        return loadArcGISJSAPIModules(['esri/renderers/support/jsonUtils', 'esri/layers/support/Field', 'esri/Graphic']).then(modules => {
          let jsonUtils: __esri.jsonUtils = null;
          let Field: __esri.FieldConstructor = null;
          let Graphic: __esri.GraphicConstructor = null;
          [jsonUtils, Field, Graphic] = modules;
          let layer = {
            title: datasource.label,
            renderer: jsonUtils.fromJSON((datasource as FeatureQueryDataSource).getFetchedSchema().layerDefinition.drawingInfo.renderer),
            fields: (datasource as FeatureQueryDataSource).getFetchedSchema().layerDefinition.fields.map((field) => {return Field.fromJSON(field)})
          }
          return this.handleMessage(message, layer, Graphic);
        });
      } else {
        return this.handleMessage(message);
      }
    } else {
      return true;
    }
  }

  handleMessage(message: Message, layer?: any, Graphic?: __esri.GraphicConstructor): Promise<boolean> | boolean {
    switch(message.type){
      case MessageType.SpatialDataRecordSetCreate:
        let spatialDataRecordSetCreateMessage = message as SpatialDataRecordSetCreateMessage;
        let createdLayerId = `${message.widgetId}-${spatialDataRecordSetCreateMessage.dataRecordSetId}`;
        let newFeatureSetActionValue = MutableStoreManager.getInstance().getStateValue([this.widgetId, 
          `newFeatureSetActionValue`, `value`, `${createdLayerId}`]);
                
        if (!newFeatureSetActionValue) {
          let featureSet = {};

          if (spatialDataRecordSetCreateMessage.dataRecordSet && spatialDataRecordSetCreateMessage.dataRecordSet.records) {
            let features = [];

            for (let i = 0; i < spatialDataRecordSetCreateMessage.dataRecordSet.records.length; i++) {
              let dataRecordFeature = (spatialDataRecordSetCreateMessage.dataRecordSet.records[i] as 
                (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature;
              if (dataRecordFeature) {
                let tempFeature = null;
                if ((dataRecordFeature as any).clone) {
                  tempFeature = (dataRecordFeature as any).clone();
                } else {
                  tempFeature = Graphic.fromJSON(Object.assign({}, dataRecordFeature));
                  tempFeature.attributes = Object.assign({}, dataRecordFeature.attributes);
                }

                if (layer) {
                  (tempFeature as any).layer = layer;
                }

                features.push(tempFeature);
              }
            }

            featureSet = {
              features: features
            } as __esri.FeatureSet
          }

          getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, 
            `newFeatureSetActionValue.value.${createdLayerId}`, featureSet));

          let promise: Promise<any> = MutableStoreManager.getInstance().getStateValue([this.widgetId, 
            `newFeatureSetActionValue`, `promise`]);
          return Promise.all([promise]).then(() => {
            let tempPromise: Promise<any> = MutableStoreManager.getInstance().getStateValue([this.widgetId, 
              `newFeatureSetActionValue`, `promise`]);
            return Promise.all([tempPromise]).then(() => {
              return true;
            })
          }, () => {
            return true;
          })
        }
      case MessageType.SpatialDataRecordSetUpdate:
        let spatialDataRecordSetUpdateMessage = message as SpatialDataRecordSetUpdateMessage;
        let changedLayerId = `${message.widgetId}-${spatialDataRecordSetUpdateMessage.dataRecordSetId}`;

        let featureSet = {};

        if (spatialDataRecordSetCreateMessage.dataRecordSet && spatialDataRecordSetCreateMessage.dataRecordSet.records) {
          let features = [];

          for (let i = 0; i < spatialDataRecordSetCreateMessage.dataRecordSet.records.length; i++) {
            let dataRecordFeature = (spatialDataRecordSetCreateMessage.dataRecordSet.records[i] as 
              (FeatureQueryDataRecord | FeatureLayerDataRecord)).feature;
            if (dataRecordFeature) {
              let tempFeature = null;
              if ((dataRecordFeature as any).clone) {
                tempFeature = (dataRecordFeature as any).clone();
              } else {
                tempFeature = Graphic.fromJSON(Object.assign({}, dataRecordFeature));
                tempFeature.attributes = Object.assign({}, dataRecordFeature.attributes);
              }

              if (layer) {
                (tempFeature as any).layer = layer;
              }

              features.push(tempFeature);
            }
          }

          featureSet = {
            features: features
          } as __esri.FeatureSet
        }

        getAppStore().dispatch(appActions.widgetMutableStatePropChange(this.widgetId, 
          `changedFeatureSetActionValue.${changedLayerId}`, featureSet));
        break;
    }
    return true;
  }
}