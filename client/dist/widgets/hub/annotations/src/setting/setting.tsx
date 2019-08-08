import { React, classNames, Immutable} from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, 
  DataSourceChooser, DataSourceJsonWithRootId,
  SettingSection, SettingRow } from 'jimu-for-builder';
import { DataSourceTypes } from 'hub-common/lib/data-source-type';
import { Input} from 'jimu-ui';
import { IMConfig } from '../config';
import defaultMessages from './translations/default'

const prefix = 'jimu-widget-';

interface State {
  status?: string;
  text?: string;
}

//is this exhaustive? 
export enum AnnotationsType {
  PENDING = 'pending',
  APPROVED = 'approved',
  REMOVED = 'removed',
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>, State> {

  supportedTypes = Immutable([DataSourceTypes.HubAnnotations]);

  
  onPropertyChange = (name, value) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set(name, value),
    });
  };

  onStatusChange = (e) => {
    this.onPropertyChange('status', e.target.value);
  };

  onTargetChange = (e) => {
    this.onPropertyChange('target', e.target.value);
  };

  // datasource related setting change handlers
  /* onDataSourceSelected = (selectedDsJsons: DataSourceJsonWithRootId[], dsJsonWithRootId: DataSourceJsonWithRootId): void => {

    if(!dsJsonWithRootId || !dsJsonWithRootId.dataSourceJson){
      return;
    }
    
    this.props.onSettingChange({
      widgetId: this.props.id,
      useDataSources: Immutable([Immutable({
        dataSourceId: dsJsonWithRootId.dataSourceJson.id,
        rootDataSourceId: dsJsonWithRootId.rootDataSourceId //What is the purpose of this? 
      })]),
    });
  } */

  onDataSourceRemoved = (selectedDsJsons: DataSourceJsonWithRootId[], dsJsonWithRootId: DataSourceJsonWithRootId): void => {

    if(!dsJsonWithRootId || !dsJsonWithRootId.dataSourceJson){
      return;
    }

    const removedDatasourceId = dsJsonWithRootId.dataSourceJson.id;

    //remove related useDataSource
    const filteredUseDataSources = this.props.useDataSources.filter(dataSource => dataSource.dataSourceId !== removedDatasourceId);
    
    this.props.onSettingChange({
      widgetId: this.props.id,
      useDataSources: Immutable(filteredUseDataSources),
    });
  }



  render() {
    const {
      config,
      intl
    } = this.props;
    
    let dataSourceId = null;
    if (this.props.useDataSources && this.props.useDataSources[0]) {
      dataSourceId = this.props.useDataSources[0].dataSourceId;
    }

    return <div className={classNames(`${prefix}list-setting`, `${prefix}setting`)} >
      <SettingSection>
        <SettingRow label={intl.formatMessage({
          id: 'target',
          defaultMessage: defaultMessages['target']
        })}>
          <Input className="w-100" value={config && config.target} name="annoTarget"  
            onChange={this.onTargetChange}>
          </Input>
        </SettingRow>
        <SettingRow label={intl.formatMessage({
          id: 'status',
          defaultMessage: defaultMessages['status']
        })}>
          <Input type="select" name="AnnotationsStatusType" style={{width: "110px"}} value={config && config.status}
            onChange={this.onStatusChange}>{Object.keys(AnnotationsType).map(key => {
              const type = AnnotationsType[key];
              return <option value={type}>{intl.formatMessage({
                id: type,
                defaultMessage: defaultMessages[type]
              })}</option>;
            })}
          </Input>
        </SettingRow>
       </SettingSection>
      <SettingSection title={this.props.intl.formatMessage({id: 'Source', defaultMessage: defaultMessages.Source})}>
        <SettingRow>
          <DataSourceChooser types={this.supportedTypes} /* onSelect={this.onDataSourceSelected} */ widgetId={this.props.id}
            selectedDataSourceIds={this.props.useDataSources && Immutable(this.props.useDataSources.map(ds => ds.dataSourceId))} onRemove={this.onDataSourceRemoved}/>
        </SettingRow>
      </SettingSection>
    </div>;
  }
}
