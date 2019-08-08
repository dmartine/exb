import {React, InjectedIntl, ImmutableObject, IMWidgetJson, IMDataSourceJson} from 'jimu-core';
import {Icon} from 'jimu-ui';

import MoreOptions from './list-more';

import {getDsUsedWidgets, getDsIcon, getDsTypeString} from '../utils';
import defaultMessages from '../translations/default';

const IconMore = require('jimu-ui/lib/icons/more.svg');
//const IconExchange = require('jimu-ui/lib/icons/exchange.svg');

interface ItemProps{
  dsJson: IMDataSourceJson;
  isMoreOptionsShown: boolean;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  dataSources: ImmutableObject<{ [dsId: string]: IMDataSourceJson }>;
  intl: InjectedIntl;
  onToggleMoreOptions: (dsId: string) => void;
}
interface ItemState{

}
export default class extends React.PureComponent<ItemProps, ItemState>{
  rootDom: HTMLElement;

  constructor(props){
    super(props);
  }

  onRemoveItem = () => {
    this.props.onToggleMoreOptions(this.props.dsJson.id);
  }

  onToggleMoreOptions = e => {
    e.stopPropagation();
    this.props.onToggleMoreOptions(this.props.dsJson.id);
  }

  render(){
    if(!this.props.dsJson){
      return null;
    }
    const relatedWidgets = getDsUsedWidgets(this.props.dsJson.id, this.props.widgets);
    return (
      <div className="m-3 p-2 list-item list-error-item" ref={d => {this.rootDom = d}}>

        <div className="d-flex align-items-center ds-thumbnail-type-label">

          <div className="d-flex align-items-center justify-content-center flex-shrink-0 ds-thumbnail">
            <Icon icon={getDsIcon(this.props.dsJson)} size="20"/>
          </div>

          <div className="ml-2 flex-grow-1 two-line-truncate ds-label" title={this.props.dsJson.label || this.props.dsJson.id}>
            {this.props.dsJson.label || this.props.dsJson.id}
          </div>

          {
            this.props.dataSources && Object.keys(this.props.dataSources).some(dsId => !this.props.dataSources[dsId].isOutputFromWidget && dsId === this.props.dsJson.id) ?
            <div className="ml-1 flex-shrink-0 ds-more">
              <span onClick={this.onToggleMoreOptions}>
                <Icon icon={IconMore} className="text-dark align-baseline" />
              </span>
            </div> : null
          }

        </div>

        <div className="mt-2 d-flex justify-content-between ds-type-related-widgets">

          <div className="flex-shrink-0 ds-type">
            <div className="text-truncate ds-type-name">{getDsTypeString(this.props.dsJson.type, this.props.intl)}</div>
          </div>

          <div className="flex-shrink-0 flex-row ds-related-widgets">
            <span className="align-middle">
              {relatedWidgets && relatedWidgets.length} {this.props.intl.formatMessage({id: 'widgets', defaultMessage: defaultMessages.widgets})}
            </span>
          </div>

        </div>

        <div className="d-flex justify-content-between">

          <div className="border-gray-300 text-truncate ds-origin-label" title={this.props.dsJson.label || this.props.dsJson.id}>
            <span className="align-middle">{this.props.dsJson.label || this.props.dsJson.id}</span>
          </div>

        </div>

        <MoreOptions isShown={this.props.isMoreOptionsShown} rootDom={this.rootDom} intl={this.props.intl}
          dsJson={this.props.dsJson} onRemoveItem={this.onRemoveItem} widgets={this.props.widgets}/>
      </div>
    );
  }
}