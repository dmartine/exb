import {ImmutableObject} from 'seamless-immutable';

export interface Config{
  surveyItemId: string;
  portalUrl: string;
  defaultValue: {
    [key:string]: any
  };
  open: string;
  // isEmbed: boolean;
  // isHideNavbar?: boolean;
  // isFullScreen?: boolean;
  hides?: string[];
  embeds?: string[];
  selectedSurveyQuestionFields?: string[];
  useDataSources?: any;
  dsType?: string;
  timestamp?: number;
}

export type IMConfig = ImmutableObject<Config>;