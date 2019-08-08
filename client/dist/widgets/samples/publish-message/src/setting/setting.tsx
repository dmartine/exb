import { React, Immutable } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, AllDataSourceTypes, DataSourceChooser } from 'jimu-for-builder';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<any> & {}, {}>{
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery]);

  constructor(props) {
    super(props);
  }

  render() {
    let dataSourceId = null;
    if (this.props.useDataSources && this.props.useDataSources[0]) {
      dataSourceId = this.props.useDataSources[0].dataSourceId;
    }

    return <div className="w-100">
      <DataSourceChooser types={this.supportedTypes} selectedDataSourceIds={Immutable([dataSourceId])} widgetId={this.props.id}/>
    </div>;
  }
}