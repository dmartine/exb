import {React, classNames} from 'jimu-core';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'jimu-ui';

interface Props{
  layoutId: string;
  layoutItemIds: string[];
  showIcon: boolean;
  widgetsInfo: {[layoutItemId: string]: {
    label: string;
    icon: string;
  }},
  LayoutItem: any
}

interface State{
  activeTabItem: string;
}
export default class Tab extends React.PureComponent<Props, State>{
  constructor(props){
    super(props);
    this.state = {activeTabItem: null};
  }

  selectTab(itemId: string){
    this.setState({activeTabItem: itemId});
  }

  componentDidMount(){
    if(!this.state.activeTabItem && this.props.layoutItemIds.length > 0){
      this.setState({activeTabItem: this.props.layoutItemIds[0]});
    }
  }

  componentDidUpdate(){
    if(!this.state.activeTabItem && this.props.layoutItemIds.length > 0){
      this.setState({activeTabItem: this.props.layoutItemIds[0]});
    }
  }
  render(){
    let {showIcon, layoutItemIds, widgetsInfo, LayoutItem, layoutId} = this.props;
    return <>
      <Nav tabs>
        {layoutItemIds.map((layoutItemId, index) => {
          return <NavItem key={layoutItemId}>
            <NavLink className={classNames({ active: this.state.activeTabItem === layoutItemId })}
              onClick={() => { this.selectTab(layoutItemId); }}>
              {showIcon ? <img style={{background: 'blue'}} src={widgetsInfo[layoutItemId].icon}/> : null}
              {widgetsInfo[layoutItemId].label}

            </NavLink>
          </NavItem>
        })}
      </Nav>

      <TabContent activeTab={this.state.activeTabItem} className="flex-grow-1 d-flex">
        {layoutItemIds.map((subLayoutItemId, index) => {
          return <TabPane key={subLayoutItemId} tabId={subLayoutItemId} className="flex-grow-1">
            <LayoutItem layoutId={layoutId} layoutItemId={subLayoutItemId}></LayoutItem>
          </TabPane>
        })}
      </TabContent>
    </>
  }
}