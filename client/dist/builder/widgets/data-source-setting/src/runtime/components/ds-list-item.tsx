import {React, DataSource, InjectedIntl, ImmutableObject, IMWidgetJson} from 'jimu-core';
import {getAppConfigAction} from 'jimu-for-builder';
import {Icon, Input, Link} from 'jimu-ui';

import MoreOptions from './list-more';

import {getDsUsedWidgets, traverseSchema, getDsIcon, getDsSchema, getDsTypeString} from '../utils';
import defaultMessages from '../translations/default';

const IconMore = require('jimu-ui/lib/icons/more.svg');
//const IconExchange = require('jimu-ui/lib/icons/exchange.svg');

interface ItemProps{
  ds: DataSource;
  portalUrl: string;
  isMoreOptionsShown: boolean;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
  onDsClicked: (ds: DataSource) => void;
  onToggleMoreOptions: (dsId: string) => void;
  onMappingClicked?: (ds: DataSource) => void;
}
interface ItemState{
  isRenameShown: boolean;
  newName: string;
}
export default class extends React.PureComponent<ItemProps, ItemState>{
  rootDom: HTMLElement;
  renameInput: HTMLInputElement;

  constructor(props){
    super(props);
    this.state = {
      isRenameShown: false,
      newName: this.props.ds ? this.props.ds.label || this.props.ds.id : ''
    }
  }

  componentDidUpdate(prevProps: ItemProps, prevState: ItemState){
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

  showRenameInput = () => {
    this.setState({isRenameShown: true});
  }

  onRemoveItem = () => {
    this.props.onToggleMoreOptions(this.props.ds.id);
  }

  onRenameItem = () => {
    this.props.onToggleMoreOptions(this.props.ds.id);
    this.setState({
      isRenameShown: true
    });
  }

  onToggleMoreOptions = e => {
    e.stopPropagation();
    this.props.onToggleMoreOptions(this.props.ds.id);
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

  onDsClicked = e => {
    this.props.onDsClicked(this.props.ds);
  }

  onMappingClicked = () => {
    this.props.onMappingClicked(this.props.ds);
  }

  stopPropagation = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  render(){
    if(!this.props.ds){
      return null;
    }
    const relatedWidgets = getDsUsedWidgets(this.props.ds.id, this.props.widgets);
    const itemDetailUrl = this.props.ds.dataSourceJson && this.props.ds.dataSourceJson.itemId && this.props.portalUrl ?
      `${this.props.portalUrl.replace(/\/sharing\/rest/, '').replace(/\/$/, '')}/home/item.html?id=${this.props.ds.dataSourceJson.itemId}` : null;
    return (
      <div className="m-3 p-2 list-item" ref={d => {this.rootDom = d}} onClick={this.onDsClicked}>

        <div className="d-flex align-items-center ds-thumbnail-type-label">

          <div className="d-flex align-items-center justify-content-center flex-shrink-0 ds-thumbnail">
            <Icon icon={getDsIcon(this.props.ds)} className="text-dark" size="20"/>
          </div>

          {
            this.state.isRenameShown ?
            <Input className="m-2 flex-grow-1 text-truncate p-1 ds-label ds-label-input" ref={n => this.renameInput = n}
              onBlur={this.onRename} onKeyUp={this.onRename} onChange={this.onRenameChange} value={this.state.newName} onClick={this.stopPropagation} /> :

            <div className="ml-2 flex-grow-1 two-line-truncate ds-label" title={this.props.ds.label || this.props.ds.id}
              /* onDoubleClick={this.showRenameInput} onClick={this.stopPropagation} */
            >
              {this.props.ds.label || this.props.ds.id}
            </div>
          }

          {
            !this.props.ds.parentDataSource ?
            <div className="ml-1 flex-shrink-0 ds-more">
              <span onClick={this.onToggleMoreOptions}>
                <Icon icon={IconMore} className="text-dark align-baseline" />
              </span>
            </div> : null
          }

        </div>

        <div className="mt-2 d-flex justify-content-between ds-type-related-widgets">

          <div className="flex-shrink-0 ds-type">
            <div className="text-truncate ds-type-name">{getDsTypeString(this.props.ds.type, this.props.intl)}</div>
          </div>

          <div className="flex-shrink-0 flex-row ds-related-widgets">
            <span className="align-middle">
              {relatedWidgets && relatedWidgets.length} {this.props.intl.formatMessage({id: 'widgets', defaultMessage: defaultMessages.widgets})}
            </span>
          </div>

        </div>

        <div className="d-flex justify-content-between">

          <div className="border-gray-300 ds-origin-label" title={this.props.ds.label || this.props.ds.id}>
            {
              itemDetailUrl ?
              <Link to={itemDetailUrl} className="p-0 ds-origin-label-link" color="link" target="_blank" onClick={this.stopPropagation}>
                <span className="align-middle text-truncate ds-origin-label-link-text">{this.props.ds.label || this.props.ds.id}</span>
              </Link>
              : null
            }
          </div>

          {
            /* !this.props.ds.parentDataSource ?
            <div title="mapping" onClick={this.onMappingClicked} className="d-flex align-items-center ml-2 ds-mapping-icon">
              <Icon icon={IconExchange} className="text-dark" />
            </div> : null */
          }

        </div>

        <MoreOptions isShown={this.props.isMoreOptionsShown} rootDom={this.rootDom} intl={this.props.intl} widgets={this.props.widgets}
          dsJson={this.props.ds && this.props.ds.dataSourceJson} onRemoveItem={this.onRemoveItem} onRenameItem={this.onRenameItem}/>
      </div>
    );
  }
}