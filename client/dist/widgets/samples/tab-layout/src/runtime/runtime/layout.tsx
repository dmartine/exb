import {React, ReactRedux, IMState } from 'jimu-core';
import { LayoutProps, StateToLayoutProps, mapStateToLayoutProps } from 'jimu-layouts/common';
import TabLayoutItem from './layout-item';
import {IMConfig} from '../../config';
import Tab from '../common';

interface StateProps extends StateToLayoutProps{
  widgetsInfo: {[layoutItemId: string]: {
    label: string;
    icon: string;
  }}
}

interface OwnProps{
  config: IMConfig;
}

class Layout extends React.PureComponent<LayoutProps & StateProps & OwnProps> {
  constructor(props){
    super(props);
  }

  render(){
    const { layout, config, widgetsInfo } = this.props;

    const content = layout.order || [];

    // step 1, construct style of the layout from its setting
    let style = {};

    if(content.length === 0){
      return 'Please add widget';
    }
    // step 2, render children
    return (
      <div style={style}
        data-layoutid={layout.id}>
        <Tab layoutId={layout.id} showIcon={config.showIcon} layoutItemIds={content} LayoutItem={TabLayoutItem} widgetsInfo={widgetsInfo}></Tab>
      </div>
    );
  }
}

const mapMoreProps = (state: IMState, ownProps: LayoutProps): StateProps  => {
  let p1 = mapStateToLayoutProps(state, ownProps);
  let widgetsInfo = {};
  p1.layout.order && p1.layout.order.forEach(layoutItemId => {
    let wId = state.appConfig.layouts[p1.layout.id][layoutItemId].widgetId;
    widgetsInfo[layoutItemId] = {
      label: state.appConfig.widgets[wId].label,
      icon: state.appConfig.widgets[wId].icon,
    };
  })
  return {...p1, widgetsInfo: widgetsInfo};
}

export default ReactRedux.connect<StateToLayoutProps, {}, LayoutProps & OwnProps>(mapMoreProps)(Layout as any);
