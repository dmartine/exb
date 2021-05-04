import {React} from 'jimu-core';
import {AllWidgetSettingProps} from 'jimu-for-builder';
import { JimuMapViewSelector, SettingRow, SettingSection} from "jimu-ui/advanced/setting-components";
import { IMConfig } from "../config";

export default class Setting extends React.PureComponent<AllWidgetSettingProps<IMConfig>, {}>{

  onMapSelected = (useMapWidgetIds: string[]) => {
    let originMapWidgetIds = []
    originMapWidgetIds = useMapWidgetIds
    if (originMapWidgetIds && originMapWidgetIds.length ===0){
      this.props.onSettingChange({
        id: this.props.id,
        useMapWidgetIds: useMapWidgetIds,
        config: this.props.config.set("checkboxStatus", true)
      });
    } else {
      this.props.onSettingChange({
        id: this.props.id,
        useMapWidgetIds: useMapWidgetIds,
        config: this.props.config.set("checkboxStatus", false)
      });
     }
   };

  render(){
    return <div className="widget-setting p-2">  
    <SettingSection
      title={this.props.intl.formatMessage({
        id: "Map-Layer",
        defaultMessage: "Select Map widget" 
      })}
    >
      <SettingRow>      
        <JimuMapViewSelector
          onSelect={this.onMapSelected}
          useMapWidgetIds={this.props.useMapWidgetIds}
        />
      </SettingRow>
    </SettingSection>
       </div>
  }
}