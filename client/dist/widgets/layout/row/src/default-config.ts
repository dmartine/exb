import { Immutable } from 'jimu-core';
import { IMRowConfig } from './config';
import { UnitTypes } from 'jimu-ui';

export const defaultConfig: IMRowConfig = Immutable({
  space: 20,
  style: {
    alignSelf: 'flex-start',
    padding: {
      number: [10],
      unit: UnitTypes.PIXEL,
    },
  },
});
