import {ImmutableObject} from 'seamless-immutable';

export interface Config{
  html: string;
  verticalAlign?: boolean;
}

export type IMConfig = ImmutableObject<Config>;