import { ImmutableObject } from 'seamless-immutable';
import { ImageProps, FillType, LineType, UnitTypes } from 'jimu-ui';

// TODO: move to core
export interface gotoProps {
  views: string[]
}
export interface gotoAction {
  goto: gotoProps;
}

export const LIST_CARD_PADDING = 0;

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

interface WidgetStyle {
  id: string;
}
// END: TODO

interface ListItemComponent {
  field: string;
}

export interface ListItemTitleComponent extends ListItemComponent { }
export interface ListItemDescriptionComponent extends ListItemComponent { }
export interface ListItemSelectionModeComponent extends ListItemComponent { }
export interface ListItemImageComponent extends ListItemComponent, ImageProps {}

export enum SelectionModeType {
  None = 'NONE',
  Single = 'SINGLE',
  Multiple = 'MULTIPLE'
};

export enum PageStyle{
  Scroll = 'SCROLL',
  MultiPage = 'MULTIPAGE'
}

export enum AlignType {
  Start = 'FLEX-START',
  Center = 'CENTER',
  End = 'FLEX-END'
}

export enum DirectionType{
  Horizon = 'HORIZON',
  Vertical = 'VERTICAL'
}

export enum PageTransitonType {
  Glide = 'GLIDE',
  Fade = 'FADE',
  Float = 'FLOAT'
}

export enum HoverType {
  Hover0 = 'HOVER0',
  Hover1 = 'HOVER1',
  Hover2 = 'HOVER2',
  Hover3 = 'HOVER3',
}

export enum SelectedStyle{
  Style0 = 'STYLE0',
  Style1 = 'STYLE1',
  Style2 = 'STYLE2',
  Style3 = 'STYLE3',
}

export enum ItemStyle{
  Style0 = 'STYLE0',
  Style1 = 'STYLE1',
  Style2 = 'STYLE2',
  Style3 = 'STYLE3',
  Style4 = 'STYLE4',
  Style5 = 'STYLE5'
}

export enum Status{
  None = 'NONE',
  Regular = 'REGULAR',
  Selected = 'SELECTED',
  Hover = 'HOVER'
}

export interface CardSize{
  height: number,
  width: number
}

export interface DeviceCardSize {
  [deviceMode: string]: CardSize;
}

export interface CardBackgroundStyle {
  background: {
    color: string, 
    fillType: FillType, 
    image: string,
  },
  border: {
    type: LineType,
    color: string,
    width: { 
      distance: number, 
      unit: UnitTypes 
    }
  },
  borderRadius: {
    number: any,
    unit: UnitTypes
  },
  boxShadow: {
    offsetX: { distance: number, unit: UnitTypes },
    offsetY: { distance: number, unit: UnitTypes },
    blur: { distance: number, unit: UnitTypes },
    spread: { distance: number, unit: UnitTypes },
    color: string
  }
}

export interface CardConfig{
  backgroundStyle?: CardBackgroundStyle,
  enable?: boolean,
  selectionMode?: SelectionModeType,
  cardSize?: DeviceCardSize
}

export interface Config {
  pageTransition?: PageTransitonType;
  hoverType?: HoverType;
  selectedStyle?: SelectedStyle;
  differentOddEven?: boolean;
  maxItems?: number;
  itemStyle?: ItemStyle;
  isItemStyleConfirm?: boolean;
  direction?: DirectionType;
  alignType?: AlignType;
  space?: number;
  itemsPerPage?: number;
  pageStyle?: PageStyle;
  scroll?: boolean;
  style?: ImmutableObject<WidgetStyle>;
  isInitialed?: boolean;

  sortOpen?: boolean;
  sortFields?: string;
  
  //card background
  cardConfigs?: ImmutableObject<{ [status: string]: CardConfig }>;
}

export type IMConfig = ImmutableObject<Config>;