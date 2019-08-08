import {React} from 'jimu-core';
import {BaseWidgetSetting, AllWidgetSettingProps} from 'jimu-for-builder';
import {IMConfig} from '../config';
import { Switch } from 'jimu-ui';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>, any>{

  render(){
    
    return <div className="widget-setting-tab-layout">
      <label>
        Show Icon:
        <Switch checked={this.props.config.showIcon} onChange={evt => this.props.onSettingChange({
          widgetId: this.props.id,
          config: {showIcon: evt.target.checked}
        })}/>
      </label>
    </div>
  }
}