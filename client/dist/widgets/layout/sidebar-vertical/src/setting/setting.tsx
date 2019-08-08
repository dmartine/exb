/** @jsx jsx */
import { jsx } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder';
import { IMSidebarConfig, SidebarLayoutSetting, SidebarType } from 'jimu-layouts/sidebar-builder';
import { defaultConfig } from '../config';
import defaultMessages from './translations/default';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMSidebarConfig>> {
  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id, defaultMessage: defaultMessages[id] });
  }

  render() {
    const { config, id, onSettingChange } = this.props;

    return (
      <SidebarLayoutSetting
        widgetId={id}
        config={config || defaultConfig}
        direction={SidebarType.Vertical}
        formatMessage={this.formatMessage}
        onSettingChange={onSettingChange}
      />
    );
  }
}
