import {React, Immutable, ImmutableArray, IMUseDataSource, FieldSchema, DataSource, DataSourceTypes} from 'jimu-core';
import { BaseWidgetSetting, DataSourceChooser, FieldChooser } from 'jimu-for-builder';
import {ArcGISDataSourceTypes} from 'jimu-arcgis/arcgis-data-source-type';

export default class Setting extends BaseWidgetSetting{
  supportedTypes = Immutable([ArcGISDataSourceTypes.FeatureLayer, DataSourceTypes.FeatureQuery]);

  onFieldSelected = (field: FieldSchema, ds: DataSource) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      useDataSources: Immutable([{
        dataSourceId: this.props.useDataSources[0].dataSourceId,
        rootDataSourceId: this.props.useDataSources[0].rootDataSourceId,
        fields: [field.jimuName]
      }]) as ImmutableArray<IMUseDataSource>
    })
  }

  render(){
    return <div className="use-feature-layer-setting p-2">
      <DataSourceChooser
        types={this.supportedTypes}
        selectedDataSourceIds={this.props.useDataSources && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
        widgetId={this.props.id}
      />
      {
        this.props.useDataSources && this.props.useDataSources.length > 0 &&
        <div className="mt-2">Please choose a Field to query:
          <FieldChooser 
            dataSourceIds={Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))}
            onSelect={this.onFieldSelected}
            selectedFields={this.props.useDataSources[0].fields || Immutable([])}
          />
        </div>
      }
      
    </div>
  }
}