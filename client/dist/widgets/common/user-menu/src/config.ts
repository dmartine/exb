import {ImmutableObject} from 'seamless-immutable';

export interface Config{
  // TODO: eventually all widgets should have access to Hub community/initiative info
  // which we may add to the store and pass into widgets, maybe via a jimu-hub extension
  // for now we have to explicitly pass this to this widget
  hub?: boolean
};

export type IMConfig = ImmutableObject<Config>;