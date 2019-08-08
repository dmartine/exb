/** @jsx jsx */
import { jsx } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder';
import {IMFlexboxConfig, FlexboxLayoutSetting} from 'jimu-layouts/flexbox-builder';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMFlexboxConfig>>{
  render() {
    const {config, id, onSettingChange} = this.props;

    return <FlexboxLayoutSetting widgetId={id} config={config}
      onSettingChange={onSettingChange}
    />;
  }
}