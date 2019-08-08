import {React, DataSource, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {getAppConfigAction} from 'jimu-for-builder';
import {Icon, Input, Link} from 'jimu-ui';

import ListMore from './list-more';

import {traverseSchema, getDsIcon, getDsSchema, getDsTypeString} from '../utils';
import defaultMessages from '../translations/default';

const IconMore = require('jimu-ui/lib/icons/more.svg');
//const IconExchange = require('jimu-ui/lib/icons/exchange.svg');

interface Props{
  ds: DataSource;
  portalUrl: string;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
  onShowDetailClicked: (ds: DataSource) => void;
  onMappingClicked?: (ds: DataSource) => void;
}

interface State{
  isMoreOptionsShown: boolean;
  isMappingDetailShown: boolean;
  isRenameShown: boolean;
  newName: string;
}

export default class extends React.PureComponent<Props, State>{
  rootDom: HTMLElement;
  renameInput: HTMLInputElement;

  constructor(props){
    super(props);
    this.state = {
      isMoreOptionsShown: false,
      isMappingDetailShown: false,
      isRenameShown: false,
      newName: this.props.ds ? this.props.ds.label || this.props.ds.id : ''
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State){
    if(prevState.isRenameShown !== this.state.isRenameShown && this.state.isRenameShown && this.renameInput){
      this.renameInput.focus();
      this.renameInput.select();
    }
    if(prevProps.ds !== this.props.ds){
      this.setState({
        newName: this.props.ds ? this.props.ds.label || this.props.ds.id : ''
      });
    }
  }

  onRootClicked = e => {
    if(e.currentTarget.className && e.currentTarget.className.indexOf && e.currentTarget.className.indexOf('ds-info') > -1){
      this.setState({
        isMoreOptionsShown: false
      });
    }
  }

  onRemoveItem = () => {
    this.setState({isMoreOptionsShown: false});
  }

  onShowDetailClicked = () => {
    this.props.onShowDetailClicked(this.props.ds);
  }

  onRenameItem = () => {
    this.setState({
      isMoreOptionsShown: false,
      isRenameShown: true
    });
  }

  onRename = () => {
    const isChild = !!this.props.ds.parentDataSource;
    const newLabel = this.state.newName.trim();

    if(!newLabel){
      this.setState({isRenameShown: false});
      return;
    }

    if(!isChild){
      getAppConfigAction().editDataSource(this.props.ds.dataSourceJson.set('label', newLabel)).exec();

      this.setState({isRenameShown: false});
    }else{
      const rootDs = this.props.ds.getRootDataSource();
      let rootSchema = getDsSchema(rootDs);
      let schema = getDsSchema(this.props.ds);
      let configRootSchema = {};
      schema.label = newLabel;
      delete schema.layerDefinition;
      traverseSchema(rootSchema, schema, configRootSchema);

      getAppConfigAction().editDataSource(rootDs.dataSourceJson.set('schema', configRootSchema)).exec();

      this.setState({isRenameShown: false});
    }
  }

  onRenameChange = e => {
    this.setState({
      newName: e.target.value
    });
  }

  onToggleMoreOptions = e => {
    e.stopPropagation();
    this.setState({isMoreOptionsShown: !this.state.isMoreOptionsShown});
  }

  onMappingClicked = () => {
    this.props.onMappingClicked(this.props.ds);
  }

  render(){
    if(!this.props.ds){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }
    const isChild = !!this.props.ds.parentDataSource;
    const itemDetailUrl = this.props.ds.dataSourceJson && this.props.ds.dataSourceJson.itemId && this.props.portalUrl ?
      `${this.props.portalUrl.replace(/\/sharing\/rest/, '').replace(/\/$/, '')}/home/item.html?id=${this.props.ds.dataSourceJson.itemId}` : null;
    return (
      <div className="p-2 ds-info" ref={d => this.rootDom = d} onClick={this.onRootClicked}>

        <div className="d-flex align-items-center justify-content-between ds-thumbnail-type-label">
          <div className="d-flex">
            <div className="d-flex align-items-center justify-content-center mr-1 flex-shrink-0 ds-thumbnail">
              <Icon icon={getDsIcon(this.props.ds)} className="text-dark" size="20"/>
            </div>
          </div>

          {
            this.state.isRenameShown ?
            <Input className="m-2 flex-grow-1 text-truncate ds-label-input ds-label" ref={n => this.renameInput = n}
              onBlur={this.onRename} onKeyUp={this.onRename} onChange={this.onRenameChange} value={this.state.newName} /> :

            <div className="ml-2 flex-grow-1 two-line-truncate ds-label" title={this.props.ds.label || this.props.ds.id} onClick={this.onShowDetailClicked}>
              {this.props.ds.label || this.props.ds.id}
            </div>
          }
          <div className="d-flex">
            {
              !isChild ?
              <div className="ml-1 flex-shrink-0 ds-more">
                <span className="ds-more" onClick={this.onToggleMoreOptions}>
                  <Icon icon={IconMore} className="text-dark" />
                </span>
              </div> : null
            }
          </div>
        </div>

        <div className="mt-2 d-flex ds-type">
          <div className="flex-shrink-0 text-gray-700 text-truncate ds-type-name">{getDsTypeString(this.props.ds.type, this.props.intl)}</div>
        </div>

        <div className="mt-2 d-flex justify-content-between">
          <div className="border-gray-300 text-truncate ds-origin-label" title={this.props.ds.label || this.props.ds.id}>
            {
              itemDetailUrl ?
              <Link to={itemDetailUrl} className="p-0 ds-origin-label-link" color="link" target="_blank">
                <span className="align-middle text-truncate ds-origin-label-link-text">{this.props.ds.label || this.props.ds.id}</span>
              </Link>
              : <span className="align-middle">{this.props.ds.label || this.props.ds.id}</span>
            }
          </div>

          {
            /* !isChild ?
            <div title="mapping" onClick={this.onMappingClicked} className="ml-2 ds-mapping-icon">
              <Icon icon={IconExchange} className="text-dark" />
            </div> : null */
          }
        </div>

        <ListMore isShown={this.state.isMoreOptionsShown} rootDom={this.rootDom} intl={this.props.intl} widgets={this.props.widgets}
          dsJson={this.props.ds && this.props.ds.dataSourceJson} onRemoveItem={this.onRemoveItem} onRenameItem={this.onRenameItem}/>
      </div>
    );
  }
}
