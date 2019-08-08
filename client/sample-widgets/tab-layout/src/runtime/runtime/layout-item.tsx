import { React, LayoutItemType, ReactRedux } from 'jimu-core';
import { WidgetDisplayMode, mapStateToLayoutItemProps, StateToLayoutItemProps, LayoutItemProps } from 'jimu-layouts/common';
import {WidgetRenderer, WidgetIconRenderer, SectionRenderer} from 'jimu-layouts/layout-runtime';

class TabItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps>{
  onResizeStart(){

  }

  render() {
    const { layoutItem, layoutId, itemDisplaySetting } = this.props;

    // step 1, construct style from the setting of the layout item. Omitted here

    // step 2, choose render for the item
    let Item: any;
    if (layoutItem.type === LayoutItemType.Widget) {
      if (itemDisplaySetting &&
        (itemDisplaySetting.displayMode === WidgetDisplayMode.Icon ||
        itemDisplaySetting.displayMode === WidgetDisplayMode.IconText)) {
        Item = WidgetIconRenderer;
      } else {
        Item = WidgetRenderer;
      }
    } else if (layoutItem.type === LayoutItemType.Section) {
      Item = SectionRenderer;
    } else {
      return null;
    }
    // step 3, compose the item
    return (
      <Item
        top={false}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        itemDisplaySetting={itemDisplaySetting}
      >
      </Item>
    );
  }
}

export default ReactRedux.connect<StateToLayoutItemProps, {}, LayoutItemProps>(mapStateToLayoutItemProps)(TabItem);