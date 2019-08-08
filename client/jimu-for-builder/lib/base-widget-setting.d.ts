/// <reference types="react" />
import { React, IMState } from 'jimu-core';
import { AllWidgetSettingProps } from './props';
export default class BaseWidgetSetting<P extends AllWidgetSettingProps<{}> = AllWidgetSettingProps<{}>, S = {}> extends React.PureComponent<P, S> {
    /**
     * By default, the props in "WidgetSettingInjectedProps" will be injected into widget setting props. To map more props, please use this function.
     */
    static mapExtraStateProps: (state: IMState, ownProps: AllWidgetSettingProps<{}>) => any;
    showDiffLog: boolean;
}
