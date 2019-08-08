import {ImmutableObject} from 'seamless-immutable';

export interface Config{
  sectionId: string;
}

export type IMConfig = ImmutableObject<Config>;
