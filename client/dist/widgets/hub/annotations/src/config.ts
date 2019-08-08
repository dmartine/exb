import {ImmutableObject} from 'seamless-immutable';

// Added by YIWEI:
// TODO: move to core
interface WidgetHeaderTitle {
  text: string;
  // Add color, size, alignment, etc.
  // Add an option to bind text to a field
}
export interface WidgetHeader {
  title: ImmutableObject<WidgetHeaderTitle>;
  // TODO: 
  // Add "action" such as filter 
}
// END: TODO

// example data
// author:	'aturner'
// data:	'{ "attributes": { "field1": "updated value" } }'
// description:	'We need more bikeshare locations'
// status:	'removed'
// source:	'http://demonewsite-dcdev.opendata.arcgis.com/datasets/dc-bikeshare-locations'
// target:	'https://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/DC_bikeshare_locations/FeatureServer/0'
// created_at:	7/13/2017 3:34:12 PM
// updated_at:	7/13/2017 3:41:55 PM
// edits:	'[{ "attributes": { "field1": "updated value" } }]'
// parent_id:	
// dataset_id:	'3e35e23064464af9b2ff6350b205e895_0'
// feature_id:	
// attribute:	
// Shape__Area:	
// Shape__Length

// the following properties can be used to filter comments by:
export interface AnnotationQueryParams{
  author?: string;
  // TODO: other status values?
  status?: 'removed' | 'approved' | 'pending';
  source?: string; // the app where the comment was made
  // TODO: should this be optional since we can get the url from targetDataSourceId?
  target: string; // the service, layer, or feature the comment is about
  createdBefore?: Date;
  createdAfter?: Date;
  updatedBefore?: Date;
  updatedAfter?: Date;
  parent_id?: number; // a thread of nested comments
  dataset_id?: 'string'; // the Open Data dataset that the comment is about
  feature_id?: number; // the feature the comment is about
  attribute?: 'string'; // the attribute the comment is about
  // TODO: also allow filtering by extent?
}

export interface Config extends AnnotationQueryParams{
  annotationDataSourceId?: string;
  targetDataSourceId?: string;
  // TODO: to get the url for map/scene view target data sources, we'll need:
  // layerId?: strign;
  header?: ImmutableObject<WidgetHeader>;
}

export type IMConfig = ImmutableObject<Config>;
