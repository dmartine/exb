import {React, FieldSchema, DataSource, DataSourceSchema, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';

import ListItem from './field-list-item';
import ListRemovePopup from './list-remove-popup';

import {getUsedDsSchema, getSortedKeys} from '../utils';
import defaultMessages from '../translations/default';

interface Props{
  ds: DataSource;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
}

interface State{
  isRemoveOptionsShown: boolean;
}

export default class extends React.PureComponent<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      isRemoveOptionsShown: false
    };
  }

  getFields = (ds: DataSource): {[jimuName: string]: FieldSchema} => {
    const schema = getUsedDsSchema(ds) as DataSourceSchema;
    return schema && schema.fields;
  }

  onRemove = (f: FieldSchema) => {
    //const widgets: IMWidgetJson[] = getFieldUsedWidgets(f, this.props.ds.id);
    // TODO: remove fields
    // this.setState({isRemoveOptionsShown: true});
  }

  hideRemovePopup = () => {
    this.setState({isRemoveOptionsShown: false});
  }
  render(){
    if(!this.props.ds){
      return <div className="m-2">{this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}</div>
    }

    const fields = this.getFields(this.props.ds);
    if(!fields || Object.keys(fields).length === 0){
      return <div className="m-2">{this.props.intl.formatMessage({id: 'noUsedField', defaultMessage: defaultMessages.noUsedField})}</div>
    }

    return (
      <>
        <h5 className="m-2 in-use-related-widgets">
          {this.props.intl.formatMessage({id: 'inUse', defaultMessage: defaultMessages.inUse})}
        </h5>
        {
          fields &&
          getSortedKeys(fields).map((jimuName, index) =>
            <ListItem field={fields[jimuName]} key={index} onRemove={this.onRemove} isDataSourceInited={this.props.isDataSourceInited}/>
          )
        }

        <ListRemovePopup dsJson={this.props.ds && this.props.ds.dataSourceJson} isShown={this.state.isRemoveOptionsShown}
          hideRemovePopup={this.hideRemovePopup} intl={this.props.intl} widgets={this.props.widgets}/>
      </>
    );
  }
}
