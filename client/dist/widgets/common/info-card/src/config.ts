import {ImmutableObject, ImmutableArray} from 'seamless-immutable';
import {ImageProps} from 'jimu-ui';
import {BorderStyle, FourSidesUnit, UnitTypes, LinearUnit} from 'jimu-ui';

interface InfoCardStyle { // --> converted to class name
  id: string;
}

export interface InfoCardCSSStyle { // --> converted to CSS properties
  background?: string;
  border?: BorderStyle;
  borderRadius?: FourSidesUnit;
  shadow?: boolean;
}

export interface ImageConfig extends ImageProps {
  field: string;
}

export enum DescriptionTypes {
  "text" = "TEXT",
  "list" = "LIST"
}

export interface fieldItem {
  icon: ImmutableObject<{
    name: string; 
  }>;
  field: string;
}

interface ListItemComponent {
  field: string;
}

export interface ListItemTitleComponent extends ListItemComponent { }
export interface ListItemDescriptionComponent extends ListItemComponent { 
  type?: DescriptionTypes;
  limit?: number;
  fields?: ImmutableArray<fieldItem>;
}
export interface ListItemImageComponent extends ListItemComponent, ImageProps {}

export interface Config {
  image?: ImmutableObject<ListItemImageComponent>;
  title?: ImmutableObject<ListItemTitleComponent>;
  description?: ImmutableObject<ListItemDescriptionComponent>;
  className?: string; // TODO: move to widget base
  style?: ImmutableObject<InfoCardStyle>;
  horizontal?: boolean;
}

export type IMConfig = ImmutableObject<Config>