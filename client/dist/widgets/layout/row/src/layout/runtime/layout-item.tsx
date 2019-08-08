import { React, ReactRedux, classNames, LayoutItemType } from 'jimu-core';
import { styleUtils } from 'jimu-ui';
import {
  mapStateToLayoutItemProps,
  LayoutItemProps,
  StateToLayoutItemProps,
} from 'jimu-layouts/common';
import {
  WidgetRenderer,
  SectionRenderer,
} from 'jimu-layouts/layout-runtime';

interface OwnProps {
  offset: number;
  span: number;
  alignItems?: string;
  children?: any;
  style?: any;
}

class RowItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & OwnProps> {
  render() {
    const {
      span,
      offset,
      layoutId,
      layoutItem,
      itemDisplaySetting,
      style,
      widgetName,
    } = this.props;
    if (!layoutItem) {
      return null;
    }
    const bbox = layoutItem.bbox;
    const layoutSetting = layoutItem.setting || {};
    const isRowWidget = widgetName === 'row';
    const mergedClass = classNames(
      'row-layout-item',
      `col-${span}`,
      `offset-${offset}`,
      {
        'd-flex': !isRowWidget,
      },
    );

    const mergedStyle: any = {
      ...style,
      ...styleUtils.toCSSStyle(layoutSetting.style),
      height: isRowWidget ? 'auto' : bbox.height,
    };

    if (layoutSetting.offsetX || layoutSetting.offsetY) {
      mergedStyle.transform = `translate(${layoutSetting.offsetX || 0}px, ${layoutSetting.offsetY || 0}px)`;
    }

    let LayoutItem: any;
    if (layoutItem.type === LayoutItemType.Widget) {
      LayoutItem = WidgetRenderer;
    } else if (layoutItem.type === LayoutItemType.Section) {
      LayoutItem = SectionRenderer;
    } else {
      return null;
    }

    return (
      <LayoutItem
        style={mergedStyle}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        itemDisplaySetting={itemDisplaySetting}
        isInSection={layoutItem.type === LayoutItemType.Section}
        onClick={this.props.onClick}
        className={mergedClass}
      />
    );
  }
}

export default ReactRedux.connect<StateToLayoutItemProps, {}, LayoutItemProps & OwnProps>(
  mapStateToLayoutItemProps,
)(RowItem);
