import {ImmutableObject} from 'jimu-core';

interface ICenterAt {
  target: string | [number, number];
  zoom?: number;
}

export enum ViewMode {
  Single = 'SINGLE',
  Integrated = 'INTEGRATED'
}

export enum ExtentMode {
  Original = 'ORIGINAL',
  Custom = 'CUSTOM'
}

export interface Config{
  canZoom?: boolean;
  canScale?: boolean;
  canGoHome?: boolean;
  canGoExtent?: boolean;
  canOverviewMap?: boolean;
  canLocate?: boolean;
  canSearch?: boolean;
  canCompass?: boolean;
  centerAt?: ImmutableObject<ICenterAt>;
  canPlaceHolder?: boolean;
  canNavigate?: boolean;
  disableScroll?: boolean;
  viewMode?: ViewMode;
  placeholderImage?: string;
  uploadedImage?: string;
  extentMode?: ExtentMode;

  initialMapDataSourceID?: string;
}

export type IMConfig = ImmutableObject<Config>;
