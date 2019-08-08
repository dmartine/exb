import {DataSourceSchema, appConfigUtils, DataSource, Immutable, IMDataSourceSchema, ImmutableObject,
  getAppStore, IMWidgetJson, IMDataSourceJson, FieldSchema, IMUseDataSource, InjectedIntl} from 'jimu-core';
import {AllDataSourceTypes} from 'jimu-for-builder';
/* import {GeometryType} from '@esri/arcgis-rest-feature-layer'; */

import defaultMessages from './translations/default';

export enum GeoType{
  Point = 'POINT',
  Polyline = 'POLYLINE',
  Polygon = 'POLYGON'
}

// TODO: layerDefinition.geometryType is not always in type `GeometryType`
function getGeoType(ds: DataSource): GeoType{
  const dsSchema = ds && ds.getSchema && ds.getSchema();
  const geometryType = dsSchema && dsSchema.layerDefinition && dsSchema.layerDefinition.geometryType;
  if(geometryType){
    if(geometryType.toLocaleLowerCase().indexOf(GeoType.Point.toLocaleLowerCase()) !== -1){
      return GeoType.Point;
    }else if(geometryType.toLocaleLowerCase().indexOf(GeoType.Polyline.toLocaleLowerCase()) !== -1){
      return GeoType.Polyline;
    }else if(geometryType.toLocaleLowerCase().indexOf(GeoType.Polygon.toLocaleLowerCase()) !== -1){
      return GeoType.Polygon;
    }
  }
  return null;
}

function getDsIconType(dsType, geoType?: GeoType): string{
  switch(dsType){
    case AllDataSourceTypes.WebMap:
    case AllDataSourceTypes.MapView:
    case AllDataSourceTypes.WebScene:
    case AllDataSourceTypes.SceneView:
    case AllDataSourceTypes.HubAnnotations:
    case AllDataSourceTypes.HubEvents:
      return dsType;
    case AllDataSourceTypes.FeatureLayer:
    case AllDataSourceTypes.FeatureLayerView:
    case AllDataSourceTypes.FeatureQuery:
      return geoType ? `${dsType}_${geoType}` : dsType;
    default:
      return 'UNKNOWN';
  }
}

export function getDsIcon(ds: DataSource | IMDataSourceJson){
  const dsType = ds && ds.type;
  const geoType = ds && ds.dataSourceJson && getGeoType(ds as DataSource);
  const dsIconType = getDsIconType(dsType, geoType);
  switch(dsIconType){
    case AllDataSourceTypes.WebMap:
    case AllDataSourceTypes.MapView:
      return require('jimu-ui/lib/icons/data-map.svg');
    case AllDataSourceTypes.WebScene:
    case AllDataSourceTypes.SceneView:
      return require('jimu-ui/lib/icons/data-scene.svg');
    case AllDataSourceTypes.HubAnnotations:
      return require('jimu-ui/lib/icons/data-comments.svg');
    case AllDataSourceTypes.HubEvents:
      return require('jimu-ui/lib/icons/data-event.svg');
    case `${AllDataSourceTypes.FeatureLayer}_${GeoType.Point}`:
    case `${AllDataSourceTypes.FeatureLayerView}_${GeoType.Point}`:
    case `${AllDataSourceTypes.FeatureQuery}_${GeoType.Point}`:
      return require('jimu-ui/lib/icons/data-dot.svg');
    case `${AllDataSourceTypes.FeatureLayer}_${GeoType.Polyline}`:
    case `${AllDataSourceTypes.FeatureLayerView}_${GeoType.Polyline}`:
    case `${AllDataSourceTypes.FeatureQuery}_${GeoType.Polyline}`:
      return require('jimu-ui/lib/icons/data-line.svg');
    case `${AllDataSourceTypes.FeatureLayer}_${GeoType.Polygon}`:
    case `${AllDataSourceTypes.FeatureLayerView}_${GeoType.Polygon}`:
    case `${AllDataSourceTypes.FeatureQuery}_${GeoType.Polygon}`:
      return require('jimu-ui/lib/icons/data-polygon.svg');
    case `${AllDataSourceTypes.FeatureLayer}`:
    case `${AllDataSourceTypes.FeatureLayerView}`:
    case `${AllDataSourceTypes.FeatureQuery}`:
      return require('jimu-ui/lib/icons/data-layer-16.svg');
    default:
      return require('jimu-ui/lib/icons/data-16.svg');
  }
}

export function getDsTypeString(dsType: string, intl: InjectedIntl): string{
  if(!dsType || !intl){
    return '';
  }

  switch(dsType){
    case AllDataSourceTypes.FeatureLayer:
    case AllDataSourceTypes.FeatureQuery:
      return intl.formatMessage({id: 'featureLayer', defaultMessage: defaultMessages.featureLayer});
    case AllDataSourceTypes.FeatureLayerView:
      return intl.formatMessage({id: 'featureLayerView', defaultMessage: defaultMessages.featureLayerView});
    case AllDataSourceTypes.HubAnnotations:
      return intl.formatMessage({id: 'hubAnnotations', defaultMessage: defaultMessages.hubAnnotations});
    case AllDataSourceTypes.HubEvents:
      return intl.formatMessage({id: 'hubEvents', defaultMessage: defaultMessages.hubEvents});
    case AllDataSourceTypes.Map:
      return intl.formatMessage({id: 'map', defaultMessage: defaultMessages.map});
    case AllDataSourceTypes.MapView:
      return intl.formatMessage({id: 'mapView', defaultMessage: defaultMessages.mapView});
    case AllDataSourceTypes.SceneView:
      return intl.formatMessage({id: 'sceneView', defaultMessage: defaultMessages.sceneView});
    case AllDataSourceTypes.SimpleLocal:
      return intl.formatMessage({id: 'simpleLocal', defaultMessage: defaultMessages.simpleLocal});
    case AllDataSourceTypes.WebMap:
      return intl.formatMessage({id: 'webMap', defaultMessage: defaultMessages.webMap});
    case AllDataSourceTypes.WebScene:
      return intl.formatMessage({id: 'webScene', defaultMessage: defaultMessages.webScene});
    case AllDataSourceTypes.CSV:
      return intl.formatMessage({id: 'csv', defaultMessage: defaultMessages.csv});
    default:
      return '';
  }
}

export const autoMappingSymbol = '-$';

export function getUsedDsSchema(dataSource: DataSource, fieldFilter?: any): DataSourceSchema{
  const schema: DataSourceSchema = getDsSchema(dataSource);
  if(!schema){
    return null;
  }

  let widgetUsedDssOrFields;
  let usedSchema: DataSourceSchema;

  if(dataSource.isDataSourceSet){
    usedSchema = {
      childSchemas: {}
    };
    widgetUsedDssOrFields = getWidgetUsedDss();

    Object.keys(schema.childSchemas)
    .filter(id => widgetUsedDssOrFields.some(usedId => dataSource.getFullChildDataSourceId(id) === usedId))
    .forEach(id => usedSchema.childSchemas[id] = Object.assign({}, getUsedDsSchema(dataSource.getChildDataSource(id), fieldFilter)));
  }else{
    usedSchema = {...getDsSchema(dataSource), ...{fields: {}}};
    widgetUsedDssOrFields = getWidgetUsedFields(dataSource.id);

    (schema as DataSourceSchema).fields && Object.keys((schema as DataSourceSchema).fields).filter(id => widgetUsedDssOrFields.some(usedId => id === usedId))
    .forEach(id => {
      (usedSchema as DataSourceSchema).fields[id] = Object.assign({}, (schema as DataSourceSchema).fields[id]);
      if(typeof fieldFilter === 'function'){
        (usedSchema as DataSourceSchema).fields[id] = fieldFilter((usedSchema as DataSourceSchema).fields[id]);
      }
    });
  }

  return usedSchema;
}

export function getWidgetUsedDss(): string[]{
  let widgetUsedDss = [];
  appConfigUtils.getAllWidgets(getAppStore().getState().appStateInBuilder.appConfig)
    .forEach((w: IMWidgetJson) => w.useDataSourcesEnabled && w.useDataSources &&
      w.useDataSources.forEach((d: IMUseDataSource) => {
        if(d.dataSourceId){
          widgetUsedDss = widgetUsedDss.concat(d.dataSourceId);
        }
      }));

  return widgetUsedDss;
}

export function getWidgetUsedFields(dsId: string): string[]{
  let widgetUsedFields = [];
  appConfigUtils.getAllWidgets(getAppStore().getState().appStateInBuilder.appConfig)
    .forEach((w: IMWidgetJson) => w.useDataSourcesEnabled && w.useDataSources &&
      w.useDataSources.forEach((d: IMUseDataSource) => {
        if(d.fields && d.dataSourceId && d.dataSourceId === dsId){
          widgetUsedFields = widgetUsedFields.concat(d.fields);
        }
      }));

  return widgetUsedFields;
}

function getAllWidgetsArray(widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>): IMWidgetJson[]{
  if(!widgets){
    return [];
  }

  let w = [];
  Object.keys(widgets).forEach(wId => {
    w.push(widgets[wId]);
  });

  return w;
}

export function getDsUsedWidgets(dsId: string, allWidgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>): IMWidgetJson[]{
  if(!dsId || !allWidgets){
    return [];
  }
  return getAllWidgetsArray(allWidgets)
    .filter((w: IMWidgetJson) => w && w.useDataSourcesEnabled && w.useDataSources && w.useDataSources.some((d: IMUseDataSource) => d.dataSourceId === dsId));
}

export function getAllDsUsedWidgets(dsId: string, allWidgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>): IMWidgetJson[]{
  if(!dsId || !allWidgets){
    return [];
  }
  return getAllWidgetsArray(allWidgets).filter((w: IMWidgetJson) =>
    w && w.useDataSources && w.useDataSources.some((u: IMUseDataSource) => u.dataSourceId === dsId || (u.rootDataSourceId && u.rootDataSourceId === dsId))
  );
}

// whether every child data source of schema are mapped, including grandchild data source of schema
export function getWhetherMappingIsDone(schema: DataSourceSchema, mappedSchema: DataSourceSchema): boolean{
  if(!schema || !mappedSchema){
    return false;
  }
  if(getWhetherSchemaIsSet(schema)){
    return Object.keys(schema.childSchemas).every(id => getWhetherMappingIsDone(schema.childSchemas[id], mappedSchema.childSchemas[id]));
  }
  return schema.fields && Object.keys(schema.fields).every(id => !!(mappedSchema.fields && mappedSchema.fields[id]));
}

// whether every child data source of schema are mapped, not including grandchild data source of schema
export function getWhetherChildMappingIsDone(schema: DataSourceSchema, mappedSchema: DataSourceSchema): boolean{
  if(!schema || !mappedSchema){
    return false;
  }
  if(getWhetherSchemaIsSet(schema)){
    return Object.keys(schema.childSchemas).every(id => !!(mappedSchema.childSchemas && mappedSchema.childSchemas[id]));
  }
  return schema.fields && Object.keys(schema.fields).every(id => !!(mappedSchema.fields && mappedSchema.fields[id]));
}

export function getWhetherSchemaIsSet(schema: DataSourceSchema): boolean{
  if(!schema){
    return false;
  }
  return !!schema.childSchemas;
}

export function getDsSchema(ds: DataSource): DataSourceSchema{
  if(!ds || !ds.getSchema){
    return null;
  }

  return ds.getSchema();
}

export function getMappedDsJson(curDsJson: IMDataSourceJson, newDsJson: IMDataSourceJson, schema: DataSourceSchema): IMDataSourceJson{
  let mappedDsJson = newDsJson.merge({});

  mappedDsJson = mappedDsJson.set('id', curDsJson.id);
  mappedDsJson = mappedDsJson.set('schema', Immutable(schema));

  return mappedDsJson;
}

export function getElementPosition (element: HTMLElement): {x: number, y: number}{
  if(!element){
    return null;
  }
  let x = element.offsetLeft;
  let y = element.offsetTop;
  let parent = element.offsetParent as HTMLElement;

  while(parent !== null){
    x += parent.offsetLeft;
    y += parent.offsetTop;

    parent = parent.offsetParent as HTMLElement;
  }

  return {x, y};
}

export function isObject(o): boolean{
  return Object.prototype.toString.call(o) === '[object Object]';
}

export function traverseSchema(parentSchema: DataSourceSchema, schema: DataSourceSchema, configParentSchema: DataSourceSchema){
  if(!getWhetherSchemaIsSet(parentSchema)){
    return;
  }
  if(!configParentSchema.childSchemas){
    configParentSchema.childSchemas = {};
  }
  for(let i in parentSchema.childSchemas){
    if(isObject(parentSchema.childSchemas[i]) && parentSchema.childSchemas[i].childId === schema.childId){
      configParentSchema.childSchemas[i] = schema;
    }else{
      if(isObject(parentSchema.childSchemas[i]) && getWhetherSchemaIsSet(parentSchema.childSchemas[i] as DataSourceSchema)){
        if(!configParentSchema.childSchemas[i]){
          configParentSchema.childSchemas[i] = {};
        }
        traverseSchema(parentSchema.childSchemas[i] as DataSourceSchema, schema, configParentSchema.childSchemas[i]);
      }
    }
  }
}

export function  getAllChildDss(rootDs: DataSource): DataSource[]{
  let allChildDss = [];

  if(rootDs && rootDs.id && rootDs.dataSourceJson && rootDs.isDataSourceSet){
    traverseGetAllChildDss(rootDs, allChildDss);
  }

  return allChildDss;
}

export function traverseGetAllChildDss(parentDs: DataSource, childDss: DataSource[]){
  if(!parentDs.isDataSourceSet){
    return;
  }
  parentDs.getChildDataSources().forEach((ds: DataSource) => {
    if(!ds || !ds.dataSourceJson || !ds.id){
      return;
    }
    childDss.push(ds);
    traverseGetAllChildDss(ds, childDss);
  });
}

export function getMappedSchemaFromNewSchema(curSchema: DataSourceSchema, newSchema: DataSourceSchema, curConfigSchema: IMDataSourceSchema): DataSourceSchema{
  let mappedSchema: DataSourceSchema = {};
  if(!curSchema || !newSchema){
    if(curSchema && getWhetherSchemaIsSet(curSchema)){
      mappedSchema.childSchemas = {};
    }
    return mappedSchema;
  }

  if(getWhetherSchemaIsSet(curSchema) && getWhetherSchemaIsSet(newSchema)){
    let childId;
    let curConfigChildSchema;
    mappedSchema = {
      childSchemas: {}
    };
    Object.keys(curSchema.childSchemas).forEach(jimuChildId => {
      childId = curSchema.childSchemas[jimuChildId].childId;
      curConfigChildSchema = curConfigSchema && curConfigSchema.childSchemas && curConfigSchema.childSchemas[jimuChildId];

      mappedSchema.childSchemas[jimuChildId] = newSchema.childSchemas[childId] ?
        getMappedSchemaFromNewSchema(curSchema.childSchemas[jimuChildId], newSchema.childSchemas[childId], curConfigChildSchema)
        : null;
    });
  }else if(!getWhetherSchemaIsSet(curSchema) && !getWhetherSchemaIsSet(newSchema)){
    mappedSchema = {...newSchema, ...{fields: getMappedFieldsFromNewSchema(curSchema, newSchema, curConfigSchema), jimuChildId: curSchema.jimuChildId}};
    // layerDefinition is a deeply nested object and can not be set into schema as an immutable value
    delete (mappedSchema as DataSourceSchema).layerDefinition;
  }else{
    console.error('types of data sources are not matched');
  }

  return mappedSchema;
}

export function getMappedFieldsFromNewSchema(curSchema: DataSourceSchema, newSchema: DataSourceSchema, curConfigSchema: IMDataSourceSchema): {[jimuName: string]: FieldSchema}{
  let mappedFields = {};
  if(!curSchema || !curSchema.fields || !newSchema || !newSchema.fields){
    return mappedFields;
  }

  let jimuName;
  let name;
  let curField;
  let newField;
  Object.keys(curSchema.fields).forEach(j => {
    curField = curSchema.fields[j];
    jimuName = curField.jimuName;
    name = curField.name;
    newField = newSchema.fields[name];
    if(newField && newField.esriFieldType === curField.esriFieldType){
      mappedFields[jimuName] = getMappedFieldFromNewField(curField, newField, curConfigSchema);
    }
  });

  return mappedFields;
}

export function getMappedFieldFromNewField(curField: FieldSchema, newField: FieldSchema, curConfigSchema: IMDataSourceSchema): FieldSchema{
  let mappedField: FieldSchema;

  if(curConfigSchema && curConfigSchema.fields && curConfigSchema.fields[curField.jimuName]){
    mappedField = curConfigSchema.asMutable({deep: true}).fields[curField.jimuName];
    mappedField.name = newField.name;
  }else{
    mappedField = getFieldWithoutAlias({...newField});
    mappedField.jimuName = curField.jimuName;
  }

  return mappedField;
}

export function getFieldWithoutAlias(field: FieldSchema): FieldSchema{
  if(!field){
    return null;
  }

  let f = {...field};
  if(f.alias){
    delete f.alias;
  }

  return f;
}

export function getWhetherJimuChildIdInSchema(jimuChildId: string, schema: DataSourceSchema): boolean{
  if(!jimuChildId || !schema || !schema.childSchemas){
    return false;
  }

  return Object.keys(schema.childSchemas).some(id => id === jimuChildId);
}

export function getWhetherChildIdInSchema(childId: string, schema: DataSourceSchema){
  if(!childId || !schema || !schema.childSchemas){
    return false;
  }

  return Object.keys(schema.childSchemas).some(id => schema.childSchemas[id].childId === childId);
}

export function getWhetherNameInSchema(name: string, schema: DataSourceSchema): boolean{
  if(!name || !schema || !schema.fields){
    return false;
  }
  return Object.keys(schema.fields).some(jimuName => schema.fields[jimuName].name === name);
}

export function getWhetherJimuNameInSchema(jimuName: string, schema: DataSourceSchema): boolean{
  if(!jimuName || !schema || !schema.fields){
    return false;
  }
  return !!schema.fields[jimuName];
}

export function getUniqueDsIdFromSchema(jimuChildId: string, schema: DataSourceSchema): number{
  let id = 0;
  if(!schema || !jimuChildId){
    return id;
  }

  let name;
  let jimuChildIdWithoutAutoMappingId = jimuChildId.split(autoMappingSymbol)[0];
  Object.keys(schema.childSchemas).forEach(jimuChildId => {
    name = jimuChildId.split(autoMappingSymbol) || [];
    if(name.length > 1 && name[0] === jimuChildIdWithoutAutoMappingId){
      if(parseInt(name[1]) > id){
        id = parseInt(name[1]);
      }
    }
  });

  return id + 1;
}

export function getUniqueFieldIdFromSchema(jimuName: string, schema: DataSourceSchema): number{
  let id = 0;
  if(!schema || !schema.fields){
    return id;
  }

  let name;
  let jimuNameWithoutAutoMappingId = jimuName.split(autoMappingSymbol)[0];
  Object.keys(schema.fields).forEach(j => {
    name = schema.fields[j].jimuName ? schema.fields[j].jimuName.split(autoMappingSymbol) : [];
    if(name.length > 1 && name[0] === jimuNameWithoutAutoMappingId){
      if(parseInt(name[1]) > id){
        id = parseInt(name[1]);
      }
    }
  });

  return id + 1;
}

export function getAutoMappedSetSchema(mappedSchema: DataSourceSchema, childSchema: DataSourceSchema): DataSourceSchema{
  if(!mappedSchema || !childSchema){
    return null;
  }

  let autoMappedSchema = {...mappedSchema};
  let jimuChildId = childSchema.jimuChildId;
  let childId = childSchema.childId;

  let newJimuChildId;
  let newChildDsSchema;
  let mappedActualChildSchema;
  let mappedActualChildSchemaJimuChildIds;

  // auto map `childSchema`
  if(getWhetherJimuChildIdInSchema(jimuChildId, mappedSchema) && !getWhetherChildIdInSchema(childId, mappedSchema)){
    // if one child of new external data will be overwritten by mapping, need to save the child to mapped schema
    newJimuChildId = `${jimuChildId}${autoMappingSymbol}${getUniqueDsIdFromSchema(jimuChildId, mappedSchema as DataSourceSchema)}`;

    if(getWhetherSchemaIsSet(childSchema)){
      newChildDsSchema = {...childSchema, jimuChildId: newJimuChildId};
    }else{
      // when mapping a data source to a new external data (such as a webmap from arcgis online),
      // fields in config should be an empty object
      newChildDsSchema = {...childSchema, fields: {}, jimuChildId: newJimuChildId};
    }

    autoMappedSchema.childSchemas[newJimuChildId] = getMappedSchemaFromNewSchema(newChildDsSchema, newChildDsSchema, null);
  }

  // auto map child data sources of `childSchema`
  mappedActualChildSchemaJimuChildIds = Object.keys(mappedSchema.childSchemas).filter(j => mappedSchema.childSchemas[j].childId === childId);
  mappedActualChildSchemaJimuChildIds.forEach(id => {
    mappedActualChildSchema = mappedSchema.childSchemas[id];
    if(mappedActualChildSchema){
      if(getWhetherSchemaIsSet(childSchema) && getWhetherSchemaIsSet(mappedActualChildSchema)){
        Object.keys(childSchema.childSchemas).forEach(j => {
          autoMappedSchema.childSchemas[id] =
            getAutoMappedSetSchema(mappedActualChildSchema, childSchema.childSchemas[j]);
        });
      }else if(!getWhetherSchemaIsSet(childSchema) && !getWhetherSchemaIsSet(mappedActualChildSchema)){
        Object.keys((childSchema as DataSourceSchema).fields).forEach(jimuName => {
          autoMappedSchema.childSchemas[id] =
            getAutoMappedSchema(mappedActualChildSchema as DataSourceSchema, (childSchema as DataSourceSchema).fields[jimuName]);
        });
      }else{
        console.error('types of data sources are not matched');
      }
    }
  });

  return autoMappedSchema;
}

export function getAutoMappedSchema(mappedSchema: DataSourceSchema, field: FieldSchema): DataSourceSchema{
  let autoMappedSchema = {...mappedSchema};
  let jimuName = field.jimuName;
  let newJimuName;
  let newField;
  if(getWhetherJimuNameInSchema(jimuName, autoMappedSchema) && !getWhetherNameInSchema(field.name, autoMappedSchema)){
    // if one field of new external data will be overwritten by mapping, need to save the field to mapped schema
    newJimuName = `${jimuName}${autoMappingSymbol}${getUniqueFieldIdFromSchema(jimuName, autoMappedSchema)}`;
    newField = {...field, jimuName: newJimuName};
    autoMappedSchema.fields[newJimuName] = getMappedFieldFromNewField(newField, newField, null);
  }
  return autoMappedSchema;
}

export function getSortedKeys(obj: object): string[]{
  return Object.keys(obj).sort((ds1, ds2) => ds1.localeCompare(ds2));
}

export function getSortedArrayByLabel<T extends {label: string}>(arr: T[]): T[]{
  return arr.sort((ds1, ds2) => ds1.label.localeCompare(ds2.label));
}

export function getIsLastFieldMapping(childDs: DataSource, ds: DataSource, mappingHistory: DataSource[]){
  const schema = getUsedDsSchema(ds);
  const childSchema = getDsSchema(childDs);
  if(getWhetherChildIdInSchema(childSchema.childId, schema)){
    return Object.keys(schema.childSchemas).filter(jimuChildId => schema.childSchemas[jimuChildId].childId !== childSchema.childId)
      .every(jimuChildId => mappingHistory.some(mappedDs => getDsSchema(mappedDs).childId === schema.childSchemas[jimuChildId].childId));
  }else{
    console.warn('data source is not child of ', ds);
    return false;
  }
}
