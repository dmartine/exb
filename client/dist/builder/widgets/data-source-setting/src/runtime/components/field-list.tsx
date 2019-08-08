import {React, DataSource, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {Tabs, Tab} from 'jimu-ui';

import FieldListData from './field-list-data';
import ListWidgets from './list-widgets';
import ListInfo from './list-info';

import defaultMessages from '../translations/default';

interface Props{
  ds: DataSource;
  portalUrl: string;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
  onShowDetailClicked: (ds: DataSource) => void;
  onMappingClicked: (ds: DataSource) => void;
}

interface State{
}

export default class extends React.PureComponent<Props, State>{

  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.ds){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }

    return (
      <div className="field-list">

        <ListInfo ds={this.props.ds} onMappingClicked={this.props.onMappingClicked} widgets={this.props.widgets}
          onShowDetailClicked={this.props.onShowDetailClicked} intl={this.props.intl} portalUrl={this.props.portalUrl} />

        <Tabs>
          <Tab title="Data" active={true}>
            <FieldListData ds={this.props.ds} isDataSourceInited={this.props.isDataSourceInited} intl={this.props.intl}
              widgets={this.props.widgets}
            />
          </Tab>
          <Tab title="Widgets">
            <ListWidgets ds={this.props.ds} isDataSourceInited={this.props.isDataSourceInited} intl={this.props.intl}
              widgets={this.props.widgets}
            />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
