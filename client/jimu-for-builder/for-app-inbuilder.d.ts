import * as appBuilderSync from './lib/app-builder-sync';
import { getAppConfigAction, AppConfigAction } from './lib/app-config-actions';
import { ThemeVariables } from 'jimu-core';
export * from './lib/components-for-app-in-builder';
export * from 'react-color';
export * from './lib/builder-locale';
import * as appConfigUtils from './lib/utils/app-config-utils';
import defaultMessages from './lib/translations/default';
export { appBuilderSync, getAppConfigAction, AppConfigAction, appConfigUtils, defaultMessages };
export declare function getBuilderThemeVariables(): ThemeVariables;