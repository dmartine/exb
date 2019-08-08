import { ImmutableObject } from 'seamless-immutable';
import { FourSidesUnit } from 'jimu-ui';

export interface RowConfig {
  space: number;
  style: {
    padding?: FourSidesUnit;
  };
}

export type IMRowConfig = ImmutableObject<RowConfig>;
