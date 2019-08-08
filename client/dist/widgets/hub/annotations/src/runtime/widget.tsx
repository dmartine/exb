import {css, React, FormattedMessage, SessionManager} from 'jimu-core';

import {BaseWidget, AllWidgetProps, DataSourceComponent} from 'jimu-core';
import { ImageProps } from 'jimu-ui';
import {IMConfig} from '../config';
import { buildWhereClause, getThumbnailUrl } from './utils';
import { HubAnnotation } from './HubAnnotation';
import { HubAnnotationForm } from './HubAnnotationForm';
import { HubAnnotationsDataSource } from 'hub-common';
import { HubSignInModal } from 'jimu-ui/lib/components/hub-sign-in-modal';
import defaultMessages from './translations/default'

HubAnnotationsDataSource
// TODO: we should not need this here:
// instead we should be able to add something like this to this widget's manifest
// "extensions": [{
//   "point": "DATA_SOURCE_FACTORY",
//   "uri": "hub-common/data-source-factory"
// }]
// but the hub-common folder is not served

// TODO: move this a util and add tests
const getFeatureIdFromProps = (props) => {
  const config = props.config;
  const targetDsId = config.targetDataSourceId;
  if (!targetDsId) {
    // we're not getting the target feature_id dynamically from another data source
    // just use the static feature_id from the config (if any)
    return config.feature_id
  }

  // we need to get the target feature_id dynamically from another data source
  let feature_id;

  // for now we try to derive the feature_id from the query params
  const queryObject = props.queryObject;
  const data = queryObject.data;
  const dataParts = data && data.split(':');
  feature_id = dataParts && dataParts[0] === targetDsId && parseInt(dataParts[1], 10);

  return feature_id;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, { modalOpen: boolean }>{
  dataSource: HubAnnotationsDataSource;

  /*static preloadData = (state: IMState, allProps: AllWidgetProps<IMConfig>, dataSources: {[dsId: string]: DataSource}): Promise<{}> => {
    if(!isDataSourceConfigured(allProps)){
      return Promise.resolve([]);
    }
    return loadAllRecords(allProps, dataSources[allProps.useDataSources[0].dataSourceId]).then(records => {
      return {records}
    });
  };*/

  constructor(props){
    super(props);

    this.state = {
      modalOpen: false
    };
    this.onAddAnnotation = this.onAddAnnotation.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modalOpen: !prevState.modalOpen
    }));
  }

  _createQuery(props: AllWidgetProps<IMConfig>): any{
    const q:any = {
      url: 'https://services7.arcgis.com/BBpPn9wZu2D6eTNY/arcgis/rest/services/Hub%20Annotations/FeatureServer/0',
      where: buildWhereClause(props.config),
      outFields: ['OBJECTID', 'author', 'description', 'feature_id']
    };
    return q;
  }

  _isDataSourceConfigured(props: AllWidgetProps<IMConfig>): boolean{
    return props.useDataSources && !!props.useDataSources[0];
  }

  onAddAnnotation (description: string) {
    const feature_id = getFeatureIdFromProps(this.props);
    return this.dataSource.addAnnotation(description, this.props.config.target, feature_id)
    .then(() => {
      if (this.props.config.status === 'pending') {
        // this is showing pending annotations, we need to refresh the list
        // NOTE: this will fail for the case when this widget is showing approved
        // but there is another widget showing the pending using a different data source
        // re-query the annotations
        this._createQuery(this.props);
      }
    });
  }

  onDs = ds => this.dataSource = ds;

  _renderContent = (ds) => { 
    const {user, intl, portalUrl, token, context} = this.props;   
    // configure add comment form if user is logged in
    let addComment;
    if (user) {
      // show the add comment form
      // first, get thumbnail image props from user/portal
      let title = `${user.fullName} (${user.username})`;
      const thumbnailProps: ImageProps = {
        src: getThumbnailUrl(portalUrl, user, token, context),
        title,
        alt: intl.formatMessage({
          id: 'HubAnnotations.thumbnailAlt',
          defaultMessage: defaultMessages['HubAnnotations.thumbnailAlt']
        }, { name: title })
      };
      addComment = (<HubAnnotationForm thumbnailProps={thumbnailProps} onSave={this.onAddAnnotation} />);
    } else {
      // show a sign in message
      const title = intl.formatMessage({
        id: 'HubAnnotations.signIn',
        defaultMessage: defaultMessages['HubAnnotations.signIn']
      });
      addComment = (<div>
        <FormattedMessage
         id='HubAnnotations.youMustBeSignedIn'
         defaultMessage={defaultMessages['HubAnnotations.youMustBeSignedIn']}
         values={{
           signedIn: <a onClick={this.toggleModal}><FormattedMessage id="HubAnnotations.signedIn" defaultMessage={defaultMessages['HubAnnotations.signedIn']} /></a>
         }}
        />
        <HubSignInModal title={title} isOpen={this.state.modalOpen} toggle={this.toggleModal} onSignIn={SessionManager.getInstance().signIn}></HubSignInModal>
      </div>);
    }
    
    // we have a loaded data source, get the records
    const records = ds.getRecords();
    const feature_id = getFeatureIdFromProps(this.props);
    const filterByFeature = feature_id !== undefined;
    // console.log({feature_id});
    // render a list of annotations, filtering by feature id if needed
    let annotations = [];
    records.reduce((annotations, r, i) => {
      const data = r.getData();
      if (!filterByFeature || data.feature_id === feature_id) {
        annotations.push(<HubAnnotation data={data} portalUrl={portalUrl} token={token} context={context} key={i} />);
      }
      return annotations;
    }, annotations);
    let content;
    if (annotations.length === 0) {
      // no annotations, show a message
      const status = this.props.config.status;
      // TODO: allow consumers to change terminology ("comments" vs "annotations", "feature")?
      content = <FormattedMessage
        id="HubAnnotations.thereAreNoComments"
        defaultMessage={defaultMessages["HubAnnotations.thereAreNoComments"]}
        values={{
          status: status ? status : ' ',
          forThisFeature: filterByFeature ? <FormattedMessage id="HubAnnotations.forThisFeature" defaultMessage={defaultMessages['HubAnnotations.forThisFeature']} /> : ''
        }}
      />;
    } else {
      // show the annotations
      content = annotations;
    }
    return <>{addComment}<div>{content}</div></>
  }

  render(){
    // check for data source
    if (!this._isDataSourceConfigured(this.props)) {
      return 'Please set a data source';
    }

    const styleWidgetAnnotations = css`
      .jimu-card {
        border-width: 0;
        + .jimu-card {
          border-top-width: 1px;
        }
      }
    `;

    return <div css={styleWidgetAnnotations}>
      {this.props.config.header && <header className='jimu-widget--header'><h5>{this.props.config.header.title && this.props.config.header.title.text || ''}</h5></header>}
        <DataSourceComponent query={this._createQuery(this.props)} useDataSource={this.props.useDataSources[0]} onDataSourceCreated={this.onDs}>
          {this._renderContent}
        </DataSourceComponent>
    </div>        
  }
}