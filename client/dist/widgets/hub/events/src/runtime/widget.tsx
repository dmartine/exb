/** @jsx jsx */
import {css, jsx, FormattedMessage, BaseWidget, AllWidgetProps, DataSourceComponent, MessageManager, DataRecordSetCreateMessage, DataSource, IMState, DataRecord} from 'jimu-core';
import {IMConfig} from '../config';
import { HubEventsDataSource } from 'hub-common';
import defaultMessages from './translations/default';
//import {DataSourceTypes as HubDataSourceTypes} from 'hub-common/lib/data-source-type';
import { Alert, ListGroup} from 'reactstrap';
import { HubEvent } from './HubEvent';
import {FeatureDataRecord} from 'jimu-core';


// NOTE: for now this is needed to make the data source available to the widget
// TODO: remove this if we end up either moving the DS to jimu-core, or make a Hub extension
/* tslint:disable no-unused-expression */
HubEventsDataSource
/* tslint:enable no-unused-expression */

// TODO: add useDataSources type
/*function isDataSourceConfigured(props: AllWidgetProps<IMConfig>): boolean{
  return props.useDataSources && !!props.useDataSources[0];
}

function createQuery(props: AllWidgetProps<IMConfig>): any{
  let q = {
    where: '1=1',
    outFields: ['*'],
    returnGeometry: true
  } as any;

  if(props.stateProps && props.stateProps.queryExtent){
    q.geometry = props.stateProps.queryExtent;
  }

  const {
    config
  } = this.props;

  const options:any = {};
  if(config.initiativeIds && (config.initiativeIds.length>0)){
    // filter by initiative
    options.where = options.where ? `${options.where} AND ` : '';
    options.where = options.where + `(initiativeId in ('${config.initiativeIds.join('\',\'')}'))`;
  }
  if(this.props.stateProps && this.props.stateProps.queryExtent){
    //TODO: Is this current extent or previous extent? 
    options.geometry = this.props.stateProps.queryExtent;
  }
  return {options, type: config.type};
}

function loadAllRecords(props: AllWidgetProps<IMConfig>, ds: DataSource): Promise<DataRecord[]>{
  let q = createQuery(props);

  if(ds.type === HubDataSourceTypes.HubEvents){
    return (ds as HubEventsDataSource).load(q);
  }
}*/

function renderMessage(messageId: string, type: 'danger' | 'info' = 'info') {
  return <Alert color={type}>
    <FormattedMessage
      id={messageId}
      defaultMessage={defaultMessages[messageId]}
    />
  </Alert>;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, {}>{
  dataSource: HubEventsDataSource;

  /*static preloadData = (state: IMState, allProps: AllWidgetProps<IMConfig>, dataSources: {[dsId: string]: DataSource}): Promise<{}> => {
    if(!isDataSourceConfigured(allProps)){
      return Promise.resolve([]);
    }
    return loadAllRecords(allProps, dataSources[allProps.useDataSources[0].dataSourceId]).then(records => {
      return {records}
    });
  };*/

  _isDataSourceConfigured(props: AllWidgetProps<IMConfig>): boolean{
    return props.useDataSources && !!props.useDataSources[0];
  }
  
  _createQuery(props: AllWidgetProps<IMConfig>): any{
    let q = {
      where: '1=1',
      outFields: ['*'],
      returnGeometry: true
    } as any;
  
    if(props.stateProps && props.stateProps.queryExtent){
      q.geometry = props.stateProps.queryExtent;
    }
  
    const {
      config
    } = this.props;
  
    const options:any = {};
    if(config.initiativeIds && (config.initiativeIds.length>0)){
      // filter by initiative
      options.where = options.where ? `${options.where} AND ` : '';
      options.where = options.where + `(initiativeId in ('${config.initiativeIds.join('\',\'')}'))`;
    }
    if(this.props.stateProps && this.props.stateProps.queryExtent){
      //TODO: Is this current extent or previous extent? 
      options.geometry = this.props.stateProps.queryExtent;
    }
    return {options, type: config.type};
  }

  _renderContent = (ds) => { 
    const {config, context, intl} = this.props;

    // we have a loaded data source, get the records
    const records = ds.getRecords();
    /* if (Array.isArray(records) && config.limit) {
      records = records.slice(0, config.limit);
    } */
    // TODO: Broadcast only if configured to do so
    const eventFeatureSet = {
      features: records.map(r => (r as FeatureDataRecord).feature)
    } as any;
    MessageManager.getInstance().publishMessage(new DataRecordSetCreateMessage(this.props.id, 'eventFeatures', eventFeatureSet));

    const events = records.map((r,i) => <HubEvent index={i} data={r.getData()} key={r.getId()} context={context} target={config.target} intl={intl}/>);
    let content;
    if (events.length === 0) {
      // no events, show a message
      const type = config.type;
      content = <FormattedMessage
        id="HubEvents.thereAreNoEvents"
        defaultMessage={defaultMessages["HubEvents.thereAreNoEvents"]}
        values={{
          type: type ? type : ''
        }}
      />;
    } else {
      // show the events
      content = events;
    }

    return <ListGroup className='jimu-list flex-nowrap selectable list-group'>
      {content}
    </ListGroup>
  }

  onDs = ds => this.dataSource = ds;

  render(){

    // check for data source
    if (!this._isDataSourceConfigured(this.props)) {
      const message = renderMessage('pleaseConfigureADataSource', 'danger');
      return <div className='widget-events'>
      {this.props.config.header && <header className='jimu-widget--header'><h5>{this.props.config.header.title && this.props.config.header.title.text || ''}</h5></header>}
        {message}
      </div>;
    }
  
    // check if data source loaded
    /*const dsInfo = this.props.dataSourcesInfo[dsId];
    const isLoaded = dsInfo && dsInfo.status === DataSourceStatus.Loaded
    if (!isLoaded) {
      return renderMessage('waiting');
    }*/
  
    let defaultFontSize = 0.875,
    textLineHeight = 1.5,
    textLineClamp = 3; // number of lines to show
    const styleEventListItems = css`
      .btn{
        display: inline;
        padding: 0; 
        border: none; 
      }
      .jimu-card {
        border-width: 0;
        + .jimu-card {
          border-top-width: 1px;
        }
        &.card-horizontal {
          flex-direction: row-reverse;
        }
      }
      font-size: ${defaultFontSize}rem;
      .card-body {
        // padding: 0.5rem 1rem;
        overflow: hidden;
      }
      h5.card-title {
        font-size: 1.4rem;
      }
      .card-title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .card-text {
        max-height: ${defaultFontSize * textLineHeight * textLineClamp}rem;
        overflow: hidden;
        line-height: ${textLineHeight};
        -webkit-line-clamp: ${textLineClamp};
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        text-align: left;
      }
      &.horizontal {
        height: auto;
        width: 100%;
      }
      .card-img{
        height: ${defaultFontSize * textLineHeight * textLineClamp + 2}rem; 
        width: 30%;
      }
      button{
        display: none;
      }
    `;

    return <div css={styleEventListItems}>
      {this.props.config.header && <header className='jimu-widget--header'><h5>{this.props.config.header.title && this.props.config.header.title.text || ''}</h5></header>}
        <DataSourceComponent query={this._createQuery(this.props)} useDataSource={this.props.useDataSources[0]} onDataSourceCreated={this.onDs}>
          {this._renderContent}
        </DataSourceComponent>
    </div>
  }
}
