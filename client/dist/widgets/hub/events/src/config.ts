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


export interface Config{
  // props used to filter when querying the events data source
  type?: 'upcoming' | 'past' | 'cancelled' | 'draft';
  initiativeIds?: string[];
  eventsDataSourceId?: string;
  target?: string;
  // TODO: to get the url for map/scene view target data sources, we'll need:
  // layerId?: strign;
  header?: ImmutableObject<WidgetHeader>;
}

export type IMConfig = ImmutableObject<Config>;
