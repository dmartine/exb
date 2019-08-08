/** @jsx jsx */
import { jsx } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, FourSides, SettingSection, SettingRow } from 'jimu-for-builder';
import { IMRowConfig } from '../config';
import { Input, Sides } from 'jimu-ui';
import { defaultConfig } from '../default-config';
import defaultMessages from './translations/default';

const marginSides = [Sides.T, Sides.R, Sides.B, Sides.L];

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMRowConfig>>{
  _updateSpace = (e) => {
    if (!isNaN(+e.target.value)) {
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.set('space', +e.target.value)
      });
    }
  }

  _updatePadding = (value) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['style', 'padding'], value)
    });
  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({ id, defaultMessage: defaultMessages[id] });
  }

  render() {
    const config = this.props.config;
    const style = config.style || defaultConfig.style;
    const space = config.space >= 0 ? config.space : defaultConfig.space;

    return (
      <div className="flexbox-layout-setting">
        <SettingSection title={this.formatMessage('layout')}>
          <SettingRow label={this.formatMessage('gap')}>
            <Input type="number" value={space} min={0} onChange={this._updateSpace}/>
            <span className="ml-1">px</span>
          </SettingRow>
          <SettingRow label={this.formatMessage('padding')} flow="wrap">
          <FourSides showTip={true} sides={marginSides} value={style.padding as any}
            onChange={this._updatePadding}></FourSides>
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}