/** @jsx jsx */
import { Immutable, jsx, css, polished } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, SettingRow, SettingSection, DataSourceChooser, AllDataSourceTypes } from 'jimu-for-builder';
import { IMConfig } from '../config';

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>>{
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery])

  getStyle = () => {
    return css`
      font-size: ${polished.rem(13)}
      font-weight: lighter;
    `;
  }

  private getDataSourceIds = (useDataSources = Immutable([])) => {
    return Immutable(useDataSources.map(ds => ds.dataSourceId));
  }

  render() {
    const { useDataSources, id } = this.props;
    return <div className="widget-setting-text jimu-widget-setting" css={this.getStyle()}>
      <SettingSection>
        <SettingRow>
          <DataSourceChooser widgetId={id} isMultiple={true} selectedDataSourceIds={this.getDataSourceIds(useDataSources)}
            types={this.supportedTypes} />
        </SettingRow>
      </SettingSection>
    </div>
  }
}