import { React, Immutable, classNames, DataSource, DataSourceManager, DataSourceSchema, IMDataSourceJson, ImmutableArray, ImmutableObject } from 'jimu-core';
import {
  BaseWidgetSetting, AllWidgetSettingProps,
  DataSourceChooser, AllDataSourceTypes, DataSourceJsonWithRootId,
  SettingSection, SettingRow, StylePicker
} from 'jimu-for-builder';
import { Button, Input, Switch, Icon } from 'jimu-ui';

import { IMConfig, DescriptionTypes, fieldItem } from '../config';

const prefix = 'jimu-widget-';

const templateStyles = { // NOTE: only for demo use now
  default: {
    label: 'default',
    thumbnail: require('./assets/InfoCard_1.svg'),
    config: {
      image: {
        'field': ''
      },
      title: {
        'field': ''
      },
      description: {
        'field': ''
      },
      horizontal: false
    }
  },
  style1: {
    label: 'style 1',
    thumbnail: require('./assets/InfoCard_2.svg'),
    config: {
      image: null,
      title: null,
      description: {
        type: DescriptionTypes.list,
        "fields": [
          {
            "icon": {
              "name": "map-pin"
            },
            "field": ""
          },
          {
            "icon": {
              "name": "phone"
            },
            "field": ""
          },
          {
            "icon": {
              "name": "link"
            },
            "field": ""
          }
        ]
      },
      horizontal: false
    }
  },
  style2: {
    label: 'style 2',
    thumbnail: require('./assets/InfoCard_3.svg'),
    size: 'full',
    config: {
      horizontal: true,
      image: {
        'field': '',
        'width': 100,
        'height': 100
      },
      title: {
        'field': ''
      },
      description: {
        'field': ''
      }
    }
  }
};

const shapeStyles = {
  'rect': {
    number: 0,
    unit: 'px'
  },
  'rounded': {
    number: 8,
    unit: 'px'
  },
  'circle': {
    number: 50,
    unit: '%'
  }
};

const shapePlaceholderImg = require('./assets/landscape.svg');

interface State {
  dataSchema: DataSourceSchema | { [subDsId: string]: DataSourceSchema };
}

interface Props {

}
export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & Props, State>{
  dataSourceJson: IMDataSourceJson;
  rootDataSourceId: string;
  __unmount = false;

  constructor(props) {
    super(props);
    this.state = {
      dataSchema: null
    };
  }

  componentDidMount() {
    this.__unmount = false;
    this.updateFields();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.useDataSources !== this.props.useDataSources) {
      this.updateFields();
    }
  }

  componentWillUnmount() {
    this.__unmount = true;
  }

  updateFields = () => {
    DataSourceManager.getInstance().createAllDataSourcesWithSub().then(dss => {
      let ds = dss.find(ds => this.props.useDataSources && (ds.id === this.props.useDataSources[0].dataSourceId));
      if (!ds) {
        this.dataSourceJson = null;
        !this.__unmount && this.setState({ dataSchema: null });
        return;
      }
      this.dataSourceJson = ds.dataSourceJson;
      ds.getDataSchema && ds.getDataSchema() && ds.getDataSchema().then(schema => {
        !this.__unmount && this.setState({ dataSchema: schema });
      });
    });
  }

  getUsedDataSource = (): DataSource => {
    const dsId = this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId;
    if (dsId) {
      return this.props.dataSources[dsId];
    }
    return null;
  }

  onFeatureSelected = (d: DataSourceJsonWithRootId) => {
    this.dataSourceJson = d.dataSourceJson;
    this.rootDataSourceId = d.rootDataSourceId;
    this.onFeatureChanged();
  }
  onFeatureChanged = () => {
    if (!this.dataSourceJson) {
      return;
    }
    this.props.onSettingChange({
      widgetId: this.props.id,
      useDataSources: Immutable([Immutable({
        dataSourceId: this.dataSourceJson.id,
        rootDataSourceId: this.rootDataSourceId
      })])
    });
  }

  onPropertyChange = (name, value) => {
    if (name === 'style') {
      let styleProps = templateStyles[value];
      let config_temp = this.props.config.merge({ [name]: value });
      if (styleProps && styleProps.config) {
        Object.keys(styleProps.config).forEach(key => {
          config_temp = config_temp.set(key, styleProps.config[key]);
        });
      }
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: config_temp
      });
    } else {
      const field = value && value.field;
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.set(name, value),
        useDataSources: Immutable([Immutable({
          dataSourceId: this.dataSourceJson.id,
          rootDataSourceId: this.rootDataSourceId,
          fields: [field]
        })])
      });
    }
  }

  getFieldOptions = (): JSX.Element[] => {
    const fields = this.state.dataSchema && this.state.dataSchema.fields;
    let optionsElements = Object.keys(fields).map(fId => {
      return <option key={fId} value={fId}>{fields[fId].name}</option>
    });

    optionsElements.splice(0, 0, <option key='_empty' value='' disabled>-- choose --</option>);
    return optionsElements;
  }

  render() {
    const config = this.props.config;
    const ds = this.getUsedDataSource();

    return (
      <div className={classNames(`${prefix}infocard-setting`, `${prefix}setting`, 'h-100')} >
        <SettingSection title='STYLE'>
          <SettingRow>
            <StylePicker
              styles={templateStyles}
              value={config && config.style || 'default'}
              onChange={(value) => this.onPropertyChange('style', value)}>
            </StylePicker>
          </SettingRow>
        </SettingSection>
        <SettingSection title='DATA'>
          <SettingRow label='Datasource' flow='wrap'>
            <DataSourceChooser types={[AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureLayerView]}
              onSelected={this.onFeatureSelected} defaultDataSourceIds={ds ? [ds.id] : []} />
          </SettingRow>
          <SettingRow label={
            <span className='d-flex align-items-center'>
              <span className='flex-grow-1'>Image</span>
              <Switch checked={!!(config && config.image)}
                onChange={evt => this.onPropertyChange('image', evt.target.checked ? { field: '' } : null)}></Switch>
            </span>} flow='wrap'>
            <Input style={{ display: config && config.image ? '' : 'none' }} type='select' value={config && config.image && config.image.field || ''}
              onChange={(e) => { this.onPropertyChange('image', e.target.value !== '' ? { field: e.target.value } : null) }}
            >
              {
                this.state.dataSchema && this.getFieldOptions()
              }
            </Input>
          </SettingRow>
          <SettingRow label={
            <span className='d-flex align-items-center'>
              <span className='flex-grow-1'>Title</span>
              <Switch checked={!!(config && config.title)}
                onChange={evt => this.onPropertyChange('title', evt.target.checked ? { field: '' } : null)}></Switch>
            </span>} flow='wrap'>
            <Input style={{ display: config && config.title ? '' : 'none' }} type='select' value={config && config.title && config.title.field || ''}
              onChange={(e) => { this.onPropertyChange('title', e.target.value !== '' ? { field: e.target.value } : null) }}>
              {
                this.state.dataSchema && this.getFieldOptions()
              }
            </Input>
          </SettingRow>
          <SettingRow label={
            <span className='d-flex align-items-center'>
              <span className='flex-grow-1'>Description</span>
              <Switch checked={!!(config && config.description)}
                onChange={evt => this.onPropertyChange('description', evt.target.checked ? { field: '' } : null)}></Switch>
            </span>} flow='wrap'>
            <div className='w-100' style={{ display: config && config.description ? '' : 'none' }} >
              {
                config && config.description && (config.description.type === DescriptionTypes.list) ?
                  <SettingFieldList fields={config.description.fields} fieldOptions={this.state.dataSchema && this.getFieldOptions()}
                    onChange={newDescriptionJson => {
                      this.onPropertyChange('description', {
                        type: DescriptionTypes.list,
                        fields: newDescriptionJson
                      })
                    }}
                  ></SettingFieldList> :
                  <Input type='select' value={config && config.description && config.description.field || ''}
                    onChange={(e) => { this.onPropertyChange('description', e.target.value !== '' ? { field: e.target.value } : null) }}>
                    {
                      this.state.dataSchema && this.getFieldOptions()
                    }
                  </Input>
              }
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    )
  }
}

// 

interface SettingFieldListProps {
  fields?: ImmutableArray<fieldItem>;
  fieldOptions?: JSX.Element[];
  onChange?: (value: any) => void;
}

interface SettingFieldListState {
}

class SettingFieldList extends React.PureComponent<SettingFieldListProps, SettingFieldListState> {

  constructor(props) {
    super(props);
  }

  onInputChange = (name, value, index) => {
    if (this.props.onChange && this.props.fields[index]) {
      let mutableFields = this.props.fields.asMutable();
      mutableFields[index] = Immutable(mutableFields[index]).set(name, value);
      this.props.onChange(mutableFields);
    }
  }

  onAdd = e => {
    if (this.props.onChange) {
      this.props.onChange(this.props.fields.concat(Immutable([{ icon: Immutable({ name: 'link' }), field: '' }])));
    }
  }

  onRemove = (index: number) => {
    if (this.props.onChange) {
      let mutableFields = this.props.fields.asMutable();
      mutableFields.splice(index, 1);
      this.props.onChange(mutableFields);
    }
  }

  render() {
    const {
      fields,
      fieldOptions
    } = this.props;

    return (
      <div>
        {fields &&
          fields.map((fieldConfig, i) => {
            return <div className='d-flex mb-2 align-items-center' key={fieldConfig.field + fieldConfig.icon && fieldConfig.icon.name + i}>
              <Input type='text' className='mr-1' style={{width: 80}}
                value={fieldConfig.icon && fieldConfig.icon.name}
                onBlur={(e) => { this.onInputChange('icon', { name: e.target.value || '' }, i) }}
              />
              <Input type='select' value={fieldConfig.field || ''} className='mr-1'
                onChange={(e) => { this.onInputChange('field', e.target.value !== '' ? e.target.value : null, i) }}>
                {
                  fieldOptions
                }
              </Input>
              <Button size='sm' color='light' className='rounded' title='remove'
                onClick={e => { this.onRemove(i) }}
              ><Icon icon='close' size={12}></Icon></Button>
            </div>
          })}
        <Button style={{ borderStyle: 'dashed' }} outline className='w-100'
          onClick={this.onAdd}>Add New</Button>
      </div>
    )
  }
}