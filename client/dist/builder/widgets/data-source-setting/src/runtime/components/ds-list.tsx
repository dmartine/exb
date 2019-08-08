import {React, DataSource, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {Tabs, Tab} from 'jimu-ui';

import DsListData from './ds-list-data';
import ListInfo from './list-info';
import ListWidgets from './list-widgets';

import defaultMessages from '../translations/default';

interface Props{
  ds: DataSource;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
  onDsItemClicked: (ds: DataSource) => void;
  onMappingClicked: (ds: DataSource) => void;
  onShowDetailClicked: (ds: DataSource) => void;
  portalUrl: string;
  dispatch: any;
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
      <div className="ds-list">
        <ListInfo ds={this.props.ds} onMappingClicked={this.props.onMappingClicked} widgets={this.props.widgets}
          onShowDetailClicked={this.props.onShowDetailClicked} intl={this.props.intl} portalUrl={this.props.portalUrl} />

        <Tabs>
          <Tab title={this.props.intl.formatMessage({id: 'data', defaultMessage: defaultMessages.data})} active={true}>
            <DsListData  portalUrl={this.props.portalUrl} ds={this.props.ds} key={this.props.ds.id} intl={this.props.intl}
              dispatch={this.props.dispatch} onDsClicked={this.props.onDsItemClicked} isDataSourceInited={this.props.isDataSourceInited}
              widgets={this.props.widgets}
            />
          </Tab>
          <Tab title={this.props.intl.formatMessage({id: 'widgets', defaultMessage: defaultMessages.widgets})}>
            <ListWidgets ds={this.props.ds} isDataSourceInited={this.props.isDataSourceInited} intl={this.props.intl}
              widgets={this.props.widgets}
            />
          </Tab>
        </Tabs>

      </div>
    );
  }
}
