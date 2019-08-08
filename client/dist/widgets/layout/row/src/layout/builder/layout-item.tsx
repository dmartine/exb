import { React, ReactRedux, classNames, LayoutItemType, LayoutItemJson } from 'jimu-core';
import { styleUtils } from 'jimu-ui';
import {
  mapStateToLayoutItemProps,
  LayoutItemProps,
  StateToLayoutItemProps,
} from 'jimu-layouts/common';
import {
  WidgetRendererForBuilder,
  SectionRendererForBuilder,
} from 'jimu-layouts/layout-builder';

interface OwnProps {
  offset: number;
  span: number;
  order: number;
  alignItems?: string;
  children?: any;
  style?: any;
  onResizeStart: (id: string) => void;
  onResizing: (id: string, x: number, y: number, dw: number, dh: number) => void;
  onResizeEnd: (id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) => void;
  onDragStart: (id: string) => void;
  onDragging: (id: string, dx: number, dy: number, outOfBoundary: boolean) => void;
  onDragEnd: (id: string, dx: number, dy: number, outOfBoundary: boolean) => void;
}

interface State {
  isResizing: boolean;
  dh: number;
}

class RowItem extends React.PureComponent<LayoutItemProps & StateToLayoutItemProps & OwnProps, State> {
  domRect: ClientRect;
  forwardRef: React.RefObject<HTMLElement>;

  state: State = {
    isResizing: false,
    dh: 0,
  };

  constructor(props) {
    super(props);
    this.forwardRef = React.createRef();
  }

  onResizeStart = (id: string) => {
    if (this.forwardRef.current) {
      this.domRect = this.forwardRef.current.getBoundingClientRect();
    }
    this.props.onResizeStart(id);
    this.setState({
      isResizing: true,
    });
  }

  onResizing = (id: string, x: number, y: number, dw: number, dh: number) => {
    this.props.onResizing(id, x, y, dw, dh);
    this.setState({
      dh,
      isResizing: true,
    });
  }

  onResizeEnd = (id: string, x: number, y: number, dw: number, dh: number, shiftKey?: boolean) => {
    const { layoutItem } = this.props;
    this.props.onResizeEnd(id, x, y, dw, dh, layoutItem);
    this.setState({
      isResizing: false,
      dh: 0,
    });
  }

  render() {
    const {
      order,
      span,
      offset,
      layoutId,
      layoutItem,
      itemDisplaySetting,
      selected,
      draggable,
      resizable,
      selectable,
      style,
      widgetName,
    } = this.props;
    if (!layoutItem) {
      return null;
    }
    const { dh, isResizing } = this.state;
    const bbox = layoutItem.bbox;
    const layoutSetting = layoutItem.setting || {};
    const isRowWidget = widgetName === 'row';
    const mergedClass = classNames(
      'row-layout-item',
      `col-${span}`,
      `offset-${offset}`,
      `order-${order}`,
    );

    const mergedStyle: any = {
      ...style,
      ...styleUtils.toCSSStyle(layoutSetting.style),
      height: isRowWidget ? 'auto' : bbox.height,
      zIndex: selected ? 20 : 0,
    };

    if (isRowWidget) {
      mergedStyle.display = 'block';
    }

    if (layoutSetting.offsetX || layoutSetting.offsetY) {
      mergedStyle.transform = `translate(${layoutSetting.offsetX || 0}px, ${layoutSetting.offsetY || 0}px)`;
    }

    if (!isRowWidget && isResizing && dh && this.domRect) {
      mergedStyle.height = this.domRect.height + dh;
      // style.width = this.domRect.width + dw;
    }

    let LayoutItem: any;
    if (layoutItem.type === LayoutItemType.Widget) {
      LayoutItem = WidgetRendererForBuilder;
    } else if (layoutItem.type === LayoutItemType.Section) {
      LayoutItem = SectionRendererForBuilder;
    } else {
      return null;
    }

    return (
      <LayoutItem
        style={mergedStyle}
        forwardRef={this.forwardRef}
        layoutId={layoutId}
        layoutItemId={layoutItem.id}
        onResizeStart={this.onResizeStart}
        onResizing={this.onResizing}
        onResizeEnd={this.onResizeEnd}
        onDragStart={this.props.onDragStart}
        onDragging={this.props.onDragging}
        onDragEnd={this.props.onDragEnd}
        left={true}
        right={true}
        top={false}
        bottom={!isRowWidget}
        itemDisplaySetting={itemDisplaySetting}
        draggable={draggable}
        resizable={resizable}
        selectable={selectable}
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
