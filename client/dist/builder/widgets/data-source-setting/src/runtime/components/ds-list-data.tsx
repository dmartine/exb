import {React, DataSource, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {IItem} from '@esri/arcgis-rest-types';

import ListItem from './ds-list-item';

import {getDsUsedWidgets, getSortedArrayByLabel} from '../utils';
import defaultMessages from '../translations/default';

interface Props{
  ds: DataSource;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
  onDsClicked: (ds: DataSource) => void;
  portalUrl: string;
  dispatch: any;
}

interface State{
  isMapping: boolean;
  isMoreOptionsShown: boolean;
  childDataSources: DataSource[];
  moreOptionsDsId: string;
}

export default class extends React.PureComponent<Props, State>{
  item: IItem;
  __unmount = false;

  constructor(props){
    super(props);
    this.state = {
      isMoreOptionsShown: false,
      isMapping: false,
      childDataSources: null,
      moreOptionsDsId: null
    };
  }

  componentDidMount(){
    this.__unmount = false;
    if(this.props.ds){
      this.setState({
        childDataSources: this.props.ds.getChildDataSources()
      });
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State){
    if(prevProps.ds !== this.props.ds){
      if(this.props.ds){
        this.setState({
          childDataSources: this.props.ds.getChildDataSources()
        });
      }else{
        this.setState({
          childDataSources: null
        });
      }
    }
  }

  componentWillUnmount(){
    this.__unmount = true;
  }

  getInUseAndOthers = () => {
    let inUseDss = [];
    let otherDss = [];
    if(this.state.childDataSources){
      this.state.childDataSources.forEach(ds => {
        if(ds && ds.id){
          if(getDsUsedWidgets(ds.id, this.props.widgets).length > 0){
            inUseDss.push(ds);
          }else{
            otherDss.push(ds);
          }
        }
      });
    }

    return {inUseDss, otherDss};
  }

  onToggleMoreOptions = (dsId: string) => {
    this.setState({
      moreOptionsDsId: dsId
    });
  }

  render(){
    if(!this.props.ds){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }
    const dss = this.getInUseAndOthers();
    return (
      <>
        {
          dss.inUseDss.length > 0 ?
          <div>
            <h5 className="m-2 in-use-related-widgets">
              {this.props.intl.formatMessage({id: 'inUse', defaultMessage: defaultMessages.inUse})}
            </h5>
            <div>
              {
                getSortedArrayByLabel(dss.inUseDss).map((ds, index) => {
                  if(ds && ds.id){
                    return <ListItem ds={ds} key={index} onDsClicked={this.props.onDsClicked} isMoreOptionsShown={this.state.moreOptionsDsId === ds.id}
                      onToggleMoreOptions={this.onToggleMoreOptions} isDataSourceInited={this.props.isDataSourceInited} intl={this.props.intl}
                      widgets={this.props.widgets} portalUrl={this.props.portalUrl}
                    />
                  }
                  return null;
                })
              }
            </div>
          </div> : null
        }

        {
          dss.otherDss.length > 0 ?
          <div>
            <h5 className="m-2 in-use-related-widgets">
              {this.props.intl.formatMessage({id: 'others', defaultMessage: defaultMessages.others})}
            </h5>
            <div>
              {
                  getSortedArrayByLabel(dss.otherDss).map((ds, index) => {
                    if(ds && ds.id){
                      return <ListItem ds={ds} key={index} onDsClicked={this.props.onDsClicked} isMoreOptionsShown={this.state.moreOptionsDsId === ds.id}
                        onToggleMoreOptions={this.onToggleMoreOptions} isDataSourceInited={this.props.isDataSourceInited} intl={this.props.intl}
                        widgets={this.props.widgets} portalUrl={this.props.portalUrl}
                      />
                    }
                    return null;
                  })
              }
            </div>
          </div> : null
        }
      </>
    );
  }
}