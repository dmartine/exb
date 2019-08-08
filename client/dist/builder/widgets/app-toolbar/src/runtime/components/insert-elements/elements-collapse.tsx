/** @jsx jsx */
import {React, IMAppConfig, InjectedIntl, jsx, ThemeVariables, themeUtils, AppMode, LayoutItemConstructorProps} from 'jimu-core';
import {Collapse, Icon} from 'jimu-ui';

import DraggableElement from './draggable-element';

// import defaultMessages from '../../translations/default';

const IconArrowDown = require('jimu-ui/lib/icons/arrow-down.svg');
const IconArrowUp = require('jimu-ui/lib/icons/arrow-up-8.svg');

interface Props{
  title: string;
  elementList: LayoutItemConstructorProps[];
  appConfig: IMAppConfig;
  appMode: AppMode;
  intl: InjectedIntl;
}
interface State{
  selectedItemName: string;
  isOpen: boolean;
}
export class _ElementsCollapse extends React.PureComponent<Props & {theme: ThemeVariables}, State>{

  constructor(props){
    super(props);
    this.state = {
      selectedItemName: '',
      isOpen: true
    };
  }

  componentDidMount(){

  }

  getListItemJSX = (item: LayoutItemConstructorProps) => {
    if(!item){
      return <div className="col-6" style={{visibility: 'hidden'}}></div>;
    }

    const ItemInCollapse = this.ItemInCollapse;
    return (
      <div key={item.name || item.id}>
        <DraggableElement item={item} fullLine={true} appMode={this.props.appMode} onSelect={this.onSelectItem} className="elements-collapse-item">
          {
            () => <ItemInCollapse item={item} />
          }
        </DraggableElement>
      </div>
    );
  }

  onSelectItem = (item: LayoutItemConstructorProps) => {

    let selectedItemName = item.name;
    this.setState({selectedItemName});

    if(!selectedItemName || !this.props.appConfig){
      return;
    }
  }

  toggle = () => this.setState({isOpen: !this.state.isOpen})

  ItemInCollapse = ({item}: {item: LayoutItemConstructorProps}) => {
    return (
        <div title={item.label} className="d-flex align-items-center pl-3 pr-3 elements-collapse-item">
          <div className="elements-collapse-item-icon-container d-flex justify-content-center align-items-center">
            <img className="elements-collapse-item-icon" src={item.icon} />
          </div>
          <div className="text-truncate elements-collapse-item-label">{item.label}</div>
        </div>
    )
  }

  render(){

    return (
      <div className="w-100">
        <div className="d-flex pl-3 pr-3 pt-3 justify-content-between">
          <h5 className="text-truncate w-75" title={this.props.title}>{this.props.title}</h5>
          <div onClick={this.toggle} className="mb-1 collapse-btn w-25 d-flex justify-content-end">
            <Icon icon= {this.state.isOpen ? IconArrowUp : IconArrowDown} size="14"/>
          </div>
        </div>
        <Collapse isOpen={this.state.isOpen}>
        {
          this.props.elementList && this.props.elementList.map(e => {
            return this.getListItemJSX(e)
          })
        }
        </Collapse>
      </div>
    );
  }
}

export const ElementsCollapse = themeUtils.withTheme(_ElementsCollapse);
