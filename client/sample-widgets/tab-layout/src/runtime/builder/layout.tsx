import {React, ReactRedux, LayoutItemConstructorProps, LayoutInfo, IMState } from 'jimu-core';
import { LayoutProps, StateToLayoutProps, DropHandlers, mapStateToLayoutProps } from 'jimu-layouts/common';
import {withDrop} from 'jimu-layouts/layout-builder';
// import {getAppConfigAction} from 'jimu-for-builder';
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

class Layout extends React.PureComponent<LayoutProps & StateProps & OwnProps> implements DropHandlers {
  constructor(props){
    super(props);
  }
  onDragLeave(draggingItem: LayoutItemConstructorProps | LayoutInfo){
    console.log('onDragLeave')
  }
  onDrop(draggingItem: LayoutItemConstructorProps | LayoutInfo, containerRect: ClientRect, itemRect: ClientRect){
    // const {layout} = this.props;
    // const appConfigAction = getAppConfigAction();
    // const layoutInfo = {
    //   layoutId: layout.layoutId,
    //   layoutItemId: layout.id
    // };
    // let insertIndex = layout.content ? layout.content.length : 0; // append to the layout

    // if ((draggingItem as LayoutInfo).layoutId && (draggingItem as LayoutInfo).layoutItemId) {
    //   // dragging an existing layout item
    //   appConfigAction.moveWidgetBetweenLayouts(draggingItem as LayoutInfo, layoutInfo).exec();
    //   appConfigAction.dndExistingWidgetToFlexbox(draggingItem as LayoutInfo, layoutInfo, {
    //     width: itemRect.width,
    //     height: itemRect.height
    //   }, insertIndex).exec();
    // } else {
    //   // dragging a new item from widget list
    //   appConfigAction.dndItemFromBuilder(draggingItem as WidgetItemInfo, layoutInfo, containerRect, itemRect, insertIndex);
    // }
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

const DroppableLayout = withDrop()(Layout);

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

export default ReactRedux.connect<StateToLayoutProps, {}, LayoutProps>(mapMoreProps)(DroppableLayout as any);
