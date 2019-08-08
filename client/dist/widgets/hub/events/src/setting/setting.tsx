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
  // datasource: DataSource;
  header?: {
    title?: {
      text?: string;
    }
  }
}
export enum EventsType {
  UPCOMING = 'upcoming',
  PAST = 'past',
  CANCELLED = 'cancelled',
  DRAFT = 'draft'
}

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig>, State> {
  
  // datasource related setting change handlers
  supportedTypes = Immutable([DataSourceTypes.HubEvents]);
  
  onPropertyChange = (name, value) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set(name, value),
    });
  };

  onTitleChange = (e) => {
    this.onPropertyChange('header', { title: {text: e.target.value }});
  };

  onTypeChange = (e) => {
    this.onPropertyChange('type', e.target.value);
  };

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
      config: this.props.config.set('eventsDataSourceId', dsJsonWithRootId.dataSourceJson.id)
    });
    //How are actions configured? 
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
      config: this.props.config.without('eventsDataSourceId')
    });
  }



  render() {
    const {
      config,
      intl
    } = this.props;

    return <div className={classNames(`${prefix}list-setting`, `${prefix}setting`)} >
      <SettingSection>
        <SettingRow label={intl.formatMessage({
          id: 'title',
          defaultMessage: defaultMessages['title']
        })}>
          <Input className="w-100" value={config && config.header && config.header.title  && config.header.title.text} name="eventListTitle"  
            onChange={this.onTitleChange}>
          </Input>
        </SettingRow>
        <SettingRow label={intl.formatMessage({
          id: 'typeOfEvents',
          defaultMessage: defaultMessages['typeOfEvents']
        })}>
            <Input type="select" name="eventListType" style={{width: "110px"}} value={config && config.type}
              onChange={this.onTypeChange}>{Object.keys(EventsType).map(key => {
                const type = EventsType[key];
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
