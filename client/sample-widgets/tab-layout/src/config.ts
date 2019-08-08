import {ImmutableObject} from 'seamless-immutable';

export interface Config{
  showIcon: boolean;
}

export type IMConfig = ImmutableObject<Config>;