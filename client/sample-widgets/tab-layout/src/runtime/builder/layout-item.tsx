import { React, LayoutItemType, ReactRedux } from 'jimu-core';
import { WidgetDisplayMode, mapStateToLayoutItemProps, StateToLayoutItemProps, LayoutItemProps } from 'jimu-layouts/common';
import {WidgetRendererForBuilder, WidgetIconRendererForBuilder, SectionRendererForBuilder} from 'jimu-layouts/layout-builder';

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
        Item = WidgetIconRendererForBuilder;
      } else {
        Item = WidgetRendererForBuilder;
      }
    } else if (layoutItem.type === LayoutItemType.Section) {
      Item = SectionRendererForBuilder;
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
        onResizeStart={this.onResizeStart}
      >
      </Item>
    );
  }
}

export default ReactRedux.connect<StateToLayoutItemProps, {}, LayoutItemProps>(mapStateToLayoutItemProps)(TabItem);