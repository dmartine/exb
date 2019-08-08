/** @jsx jsx */
import {
  React,
  classNames,
  LayoutInfo,
  polished,
  jsx,
  css,
  LayoutItemJson,
  LayoutItemConstructorProps,
  getAppStore,
  appActions,
  lodash,
  AppMode,
  IMLayoutJson,
  IMThemeVariables,
} from 'jimu-core';
import { getAppConfigAction } from 'jimu-for-builder';
import * as SVG from 'svg.js';
// import {calInsertPositionForRow, calInsertPositionForColumn} from './dnd-helper';
import { IMRowConfig } from '../../config';
import RowItemForBuilder from './layout-item';
import {
  LayoutProps,
  DropHandlers,
  autoBindHandlers,
  getBuilderThemeVariables,
  PageContext,
  PageContextProps,
} from 'jimu-layouts/common';
import { withDrop, addItemToLayout } from 'jimu-layouts/layout-builder';
import { snapLeft, resizeItem, moveItem, insertItem } from './utils';
import { ChildRect, IMChildRect, TOTAL_COLS } from '../types';

type RowLayoutProps = LayoutProps & {
  config: IMRowConfig;
  layout: IMLayoutJson,
  transformedLayout: IMLayoutJson,
  rowIndex: number;
  itemIds: string; // items joined with comma
  theme: IMThemeVariables;
  appMode: AppMode;
  isActive: boolean;
  childOfFlowLayout: boolean;
  draggingWidgetInfo?: LayoutItemConstructorProps;
  onActive: (rowIndex: number) => void;
  dragOverBoundary: (
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    itemRect: ClientRect,
    rowIndex: number,
    side: 'top' | 'bottom',
  ) => void;
  dragLeaveBoundary: (
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
  ) => void;
  dropAtBoundary: (
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    itemRect: ClientRect,
    rowIndex: number,
    side: 'top' | 'bottom',
  ) => void;
};

const DRAG_TO_PARENT_TOLERANCE = 16;

const guideOverlay = css`
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 20;
  background: transparent;
  pointer-events: none;
`;

interface State {
  dragEnterred: boolean;
  isResizing: boolean;
  updatingRects: IMChildRect[];
  isDragging: boolean;
  draggingItemId: string;
  dragOutOfBoundary: boolean;
}

class SingleRow extends React.PureComponent<RowLayoutProps, State> implements DropHandlers {
  ref: HTMLElement;
  guideColRef: HTMLElement;
  guideDragOverRef: HTMLElement;
  guideDragOverDraw: SVG.Doc;
  dropArea: SVG.Rect;
  boundingRect: ClientRect;
  isDragging: boolean;
  // childrenRef: { [key: string]: React.RefObject<HTMLDivElement> };
  childRects: ChildRect[];
  domRect: ClientRect;
  resizingRect: ClientRect;
  referenceId: string;
  colWidth: number;
  // paddings: number[];
  space: number;
  flowLayoutId: string;
  maxPageWidth: number;

  state: State = {
    dragEnterred: false,
    isResizing: false,
    updatingRects: null,
    isDragging: false,
    draggingItemId: null,
    dragOutOfBoundary: false,
  };

  constructor(props) {
    super(props);
    // this.childrenRef = {};
    autoBindHandlers(this, [
      'onItemResizeStart',
      'onItemResizing',
      'onItemResizeEnd',
      'onDrop',
      'onDragOver',
      'onDragEnter',
      'onDragLeave',
    ]);
  }

  componentDidMount() {
    this.guideDragOverDraw = SVG(this.guideDragOverRef);
  }

  onItemResizeStart(id: string) {
    this.domRect = this.ref.getBoundingClientRect();
    // const rect = this.childrenRef[id].current.getBoundingClientRect();
    // this.resizingRect = relativeClientRect(rect, this.domRect);
    // this.showColGuide();
    this.props.onActive(this.props.rowIndex);
    this.setState({
      isResizing: true,
    });
  }

  onItemResizing(id: string, x: number, y: number, dw: number, dh: number) {
    const colWidth = this.domRect.width / TOTAL_COLS;
    const deltaX = Math.round(x / colWidth);
    const deltaW = Math.round(dw / colWidth);

    const resizingRects = resizeItem(id, deltaX, deltaW, this.childRects);
    this.setState({
      updatingRects: resizingRects,
    });
  }

  onItemResizeEnd(id: string, x: number, y: number, dw: number, dh: number, layoutItem: LayoutItemJson) {
    const { layout, rowIndex } = this.props;
    const colWidth = this.domRect.width / TOTAL_COLS;
    const deltaX = Math.round(x / colWidth);
    const deltaW = Math.round(dw / colWidth);

    const appConfigAction = getAppConfigAction();
    const resizingRects = resizeItem(id, deltaX, deltaW, this.childRects);
    resizingRects.forEach((rectItem) => {
      appConfigAction.editLayoutItemBBox(
        {
          layoutId: layout.id,
          layoutItemId: rectItem.id,
        },
        {
          left: rectItem.left + TOTAL_COLS * rowIndex,
          width: rectItem.width,
          height: rectItem.id === id ? rectItem.height + dh : rectItem.height,
        },
      );
    });
    appConfigAction.exec();

    // this.hideColGuide();
    this.props.onActive(null);
    this.setState({
      isResizing: false,
      updatingRects: null,
    });
  }

  onItemDragStart = () => {
    this.setState({ isDragging: true });
  }

  onItemDragging = (id: string, dx: number, dy: number, outOfBoundary: boolean) => {
    // only triggered once when outOfBoundary is true
    if (outOfBoundary) {
      this.setState({
        draggingItemId: id,
        dragOutOfBoundary: outOfBoundary,
      });
    }
  }

  onItemDragEnd = (id: string, dx: number, dy: number, outOfBoundary: boolean) => {
    this.setState({ isDragging: false });
  }

  onDragOver(
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    draggingElement: HTMLElement,
    containerRect: Partial<ClientRect>,
    itemRect: Partial<ClientRect>,
    clientX: number,
    clientY: number,
  ) {
    const rowWidth = this.maxPageWidth > 0 ? Math.min(this.maxPageWidth, containerRect.width) : containerRect.width;

    if (this.props.dragOverBoundary &&
      (clientY < DRAG_TO_PARENT_TOLERANCE || containerRect.height - clientY < DRAG_TO_PARENT_TOLERANCE)) {
      const side = clientY < DRAG_TO_PARENT_TOLERANCE ? 'top' : 'bottom';
      if (!this.dropArea) {
        const builderTheme = getBuilderThemeVariables();
        this.dropArea = this.guideDragOverDraw.rect(rowWidth, 10)
        .fill(polished.rgba(builderTheme.colors.cyans.cyan500, 0.4)).stroke('none').attr({
          x: 0,
          y: side === 'top' ? 0 : containerRect.height - 10,
        });
      } else {
        this.dropArea.move(0, side === 'top' ? 0 : containerRect.height - 10)
        .size(rowWidth, 10);

        if (!this.dropArea.visible()) {
          this.dropArea.show();
        }
      }
      this.props.onActive(this.props.rowIndex);
      return this.props.dragOverBoundary(
        draggingItem,
        itemRect as ClientRect,
        this.props.rowIndex,
        side,
      );
    }

    if (this.props.dragLeaveBoundary) {
      this.props.dragLeaveBoundary(draggingItem);
    }

    // const { layout } = this.props;
    const layoutInfo = draggingItem as LayoutInfo;

    const updatedRects: IMChildRect[] = this.reCalculateRects(
      draggingItem,
      containerRect,
      itemRect,
      clientX,
    );
    let targetRect: IMChildRect;

    updatedRects.some((childRect) => {
      if (!childRect.id || (childRect.layoutId === layoutInfo.layoutId && childRect.id === layoutInfo.layoutItemId)) {
        targetRect = childRect;
        return true;
      }
    });
    let available = true;
    let insertPos = targetRect.left;
    this.childRects.some((childRect) => {
      if (childRect.layoutId === targetRect.layoutId && childRect.id === targetRect.id) {
        return;
      }
      if (childRect.left <= targetRect.left && (childRect.left + childRect.width) > targetRect.left) {
        available = false;
      }
      if (!available) {
        const updatedChildRect = updatedRects.find(item => item.layoutId === item.layoutId && item.id === childRect.id);
        if (updatedChildRect.left + updatedChildRect.width <= targetRect.left) {
          insertPos = childRect.left + childRect.width;
        } else {
          insertPos = childRect.left;
        }
        return true;
      }
    });

    const builderTheme = getBuilderThemeVariables();
    if (!this.dropArea) {
      if (available) {
        this.dropArea = this.guideDragOverDraw.rect(targetRect.width * this.colWidth - this.space, targetRect.height)
        .fill(polished.rgba(builderTheme.colors.cyans.cyan500, 0.2)).stroke('none').attr({
          x: insertPos * this.colWidth + this.space / 2,
          y: 0,
        });
      } else {
        const restrainedInsertPos = Math.min(
          containerRect.width - this.space / 2,
          Math.max(0, insertPos * this.colWidth - this.space / 2),
        );
        this.dropArea = this.guideDragOverDraw.rect(10, containerRect.height)
        .fill(polished.rgba(builderTheme.colors.cyans.cyan500, 1)).stroke('none').attr({
          x: restrainedInsertPos,
          y: 0,
        });
      }
    } else {
      if (available) {
        this.dropArea.move(insertPos * this.colWidth + this.space / 2, 0)
        .fill(polished.rgba(builderTheme.colors.cyans.cyan500, 0.2))
        .size(targetRect.width * this.colWidth - this.space, targetRect.height);
      } else {
        const restrainedInsertPos = Math.min(
          containerRect.width - this.space / 2,
          Math.max(0, insertPos * this.colWidth - this.space / 2),
        );
        this.dropArea.move(restrainedInsertPos, 0)
        .fill(polished.rgba(builderTheme.colors.cyans.cyan500, 1))
        .size(10, containerRect.height);
      }

      if (!this.dropArea.visible()) {
        this.dropArea.show();
      }
    }
    this.props.onActive(this.props.rowIndex);
    // this.showColGuide();
  }

  onDragEnter() {
    if (!this.state.dragEnterred) {
      if (this.dropArea) {
        this.dropArea.hide();
      }
      // this.collectBounds();
      this.referenceId = null;
      this.setState({
        dragEnterred: true,
      });
    }
  }

  onDragLeave() {
    if (this.state.dragEnterred) {
      if (this.dropArea) {
        this.dropArea.hide();
      }
      this.referenceId = null;
      this.props.onActive(null);
      // this.hideColGuide();
      this.setState({
        dragEnterred: false,
      });
    }
  }

  // showColGuide() {
  //   if (this.guideColRef && this.props.isActive) {
  //     this.guideColRef.style.display = 'flex';
  //   }
  // }

  // hideColGuide() {
  //   if (this.guideColRef) {
  //     this.guideColRef.style.display = 'none';
  //   }
  // }

  reCalculateRects(
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    containerRect: Partial<ClientRect>,
    itemRect: Partial<ClientRect>,
    clientX: number,
  ) {
    const layoutInfo = draggingItem as LayoutInfo;
    const { config, layout } = this.props;
    this.space = config.space || 0;
    // this.paddings = styleUtils.expandStyleArray(lodash.getValue(config, 'style.padding.number', [0]));
    // width should add the marginLeft and marginRight, which equals to this.space
    const rowWidth = this.maxPageWidth > 0 ? Math.min(this.maxPageWidth, containerRect.width) : containerRect.width;
    const cursorLeft = clientX - (containerRect.width - rowWidth) / 2;
    const itemLeft = itemRect.left - (containerRect.width - rowWidth) / 2;
    this.colWidth = (rowWidth + this.space) / TOTAL_COLS;
    const cursorLeftInRow1 = Math.floor(cursorLeft / this.colWidth);
    const itemLeftInRow = Math.floor(itemLeft / this.colWidth);
    const span = Math.round(itemRect.width / this.colWidth);

    const cursorLeftInRow = snapLeft(layout.id, draggingItem, itemLeftInRow, span, cursorLeftInRow1, this.childRects);

    if (this.isInRow(layoutInfo)) { // move in the same layout
      return moveItem(layoutInfo.layoutItemId, cursorLeftInRow, this.childRects);
    }
    // drag from different layout or from widget list
    return insertItem(
      {
        width: span,
        height: itemRect.height,
        layoutId: layoutInfo.layoutId,
        id: layoutInfo.layoutItemId,
      },
      cursorLeftInRow,
      this.childRects,
    );
  }

  onDrop(
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    containerRect: ClientRect,
    itemRect: ClientRect,
    clientX: number,
    clientY: number,
  ) {
    if (this.props.dropAtBoundary &&
      (clientY < DRAG_TO_PARENT_TOLERANCE || containerRect.height - clientY < DRAG_TO_PARENT_TOLERANCE)) {
      const side = clientY < DRAG_TO_PARENT_TOLERANCE ? 'top' : 'bottom';
      this.props.onActive(null);
      if (this.dropArea) {
        this.dropArea.hide();
      }
      this.setState({
        // dragEnterred: false,
        draggingItemId: null, // new layout item is added, clear this id to avoid conflict
        dragOutOfBoundary: false,
      });
      return this.props.dropAtBoundary(
        draggingItem,
        itemRect,
        this.props.rowIndex,
        side,
      );
    }
    const rowWidth = this.maxPageWidth > 0 ? Math.min(this.maxPageWidth, containerRect.width) : containerRect.width;
    const cursorLeft = clientX - (containerRect.width - rowWidth) / 2;
    const itemLeft = itemRect.left - (containerRect.width - rowWidth) / 2;

    const layoutInfo = draggingItem as LayoutInfo;
    const { layout, rowIndex } = this.props;
    const colWidth = rowWidth / TOTAL_COLS;
    let cursorLeftInRow = Math.floor(cursorLeft / colWidth);
    const itemLeftInRow = Math.floor(itemLeft / this.colWidth);
    const span = Math.round(itemRect.width / colWidth);

    cursorLeftInRow = snapLeft(layout.id, draggingItem, itemLeftInRow, span, cursorLeftInRow, this.childRects);

    let appConfigAction = getAppConfigAction();

    let updatedRects: IMChildRect[];
    if (this.isInRow(layoutInfo)) { // move in the same row
      updatedRects = moveItem(layoutInfo.layoutItemId, cursorLeftInRow, this.childRects);
    } else { // drag from different layout or from widget list
      updatedRects = insertItem(
        {
          width: span,
          height: itemRect.height,
          layoutId: layoutInfo.layoutId,
          id: layoutInfo.layoutItemId,
        },
        cursorLeftInRow,
        this.childRects,
      );
    }

    let addedItemRect;
    let insertIndex;
    const itemIdList = this.props.itemIds.split(',');
    updatedRects.forEach((rectItem, index) => {
      if (rectItem.layoutId === layout.id) { // item that is in the same layout
        appConfigAction.editLayoutItemBBox(
          {
            layoutId: rectItem.layoutId,
            layoutItemId: rectItem.id,
          },
          {
            left: rectItem.left + rowIndex * TOTAL_COLS,
            width: rectItem.width,
            height: rectItem.height,
          },
        );
        // may be dragged from another row in the same layout
        if (!this.isInRow({ layoutId: rectItem.layoutId, layoutItemId: rectItem.id })) {
          const lastIndexInRow = layout.order.indexOf(itemIdList[itemIdList.length - 1]);
          appConfigAction.editLayoutItemIndex(
            {
              layoutId: rectItem.layoutId,
              layoutItemId: rectItem.id,
            },
            {
              layoutId: layout.id,
            },
            lastIndexInRow,
          );
        }
      } else {
        const firstIndexInRow = layout.order ? layout.order.indexOf(itemIdList[0]) : 0;
        addedItemRect = {
          left: rectItem.left + rowIndex * TOTAL_COLS,
          width: rectItem.width,
          height: rectItem.height,
        };
        insertIndex = firstIndexInRow + index;
      }
    });

    if (addedItemRect) {
      addItemToLayout(
        appConfigAction.appConfig,
        draggingItem,
        {
          layoutId: layout.id,
        },
        containerRect, addedItemRect, insertIndex).then((result) => {
          const { layoutInfo, updatedAppConfig } = result;
          appConfigAction = getAppConfigAction(updatedAppConfig);
          appConfigAction.exec();
          getAppStore().dispatch(appActions.selectionChanged(layoutInfo));
        });
    } else {
      appConfigAction.exec();
    }

    if (this.dropArea) {
      this.dropArea.hide();
    }
    // this.hideColGuide();
    this.props.onActive(null);
    this.setState({
      dragEnterred: false,
      draggingItemId: null, // new layout item is added, clear this id to avoid conflict
      dragOutOfBoundary: false,
    });
  }

  isInRow(layoutInfo: LayoutInfo) {
    const { layout, itemIds } = this.props;
    if (layoutInfo.layoutId === layout.id) {
      const content = itemIds.split(',');
      return content.indexOf(layoutInfo.layoutItemId) >= 0;
    }
    return false;
  }

  collectBounds() {
    const { itemIds, transformedLayout, rowIndex } = this.props;
    const content = itemIds.split(',');
    this.childRects = [];

    content.forEach((itemId) => {
      const bbox = lodash.getValue(transformedLayout, `content.${itemId}.bbox`);
      if (bbox) {
        this.childRects.push({
          layoutId: transformedLayout.id,
          id: itemId,
          left: parseInt(bbox.left, 10) - rowIndex * TOTAL_COLS ,
          width: parseInt(bbox.width, 10),
          height: parseInt(bbox.height, 10),
        });
      }
    });
    return this.childRects.sort((a, b) => a.left - b.left);
  }

  createItem(childRects: ChildRect[], index: number, layoutStyle) {
    const { layout, itemDraggable, itemResizable, itemSelectable, config } = this.props;
    // const { isDragging, draggingItemId, dragOutOfBoundary } = this.state;
    const childRect = childRects[index];
    const gutter = config.space || 0;

    let offset;
    if (index === 0) {
      offset = childRect.left;
    } else {
      const previousBBox = childRects[index - 1];
      offset = childRect.left - previousBBox.left - previousBBox.width;
    }

    return (
      <RowItemForBuilder
        key={childRect.id}
        order={index + 1}
        offset={offset}
        span={childRect.width}
        layoutId={layout.id}
        layoutItemId={childRect.id}
        onClick={this.props.onItemClick}
        draggable={itemDraggable}
        resizable={itemResizable}
        selectable={itemSelectable}
        alignItems={layoutStyle.alignItems}
        // itemDisplaySetting={itemDisplaySetting}
        onResizeStart={this.onItemResizeStart}
        onResizing={this.onItemResizing}
        onResizeEnd={this.onItemResizeEnd}
        onDragStart={this.onItemDragStart}
        onDragging={this.onItemDragging}
        onDragEnd={this.onItemDragEnd}
        style={{
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
        }}
      />
    );
  }

  placeholderForDraggingItem() {
    const { draggingItemId } = this.state;
    const index = this.childRects.findIndex(item => item.id === draggingItemId);

    if (index >= 0) {
      const childRect = this.childRects[index];

      let offset;
      if (index === 0) {
        offset = childRect.left;
      } else {
        const previousBBox = this.childRects[index - 1];
        offset = childRect.left - previousBBox.left - previousBBox.width;
      }
      return <div className={`offset-${offset} order-${index + 1} col-${childRect.width}`}
      css={css`height: ${childRect.height}px; background: transparent;`}></div>;
    }
  }

  render() {
    const { layout, className, config, isActive } = this.props;
    const { isDragging, isResizing, dragOutOfBoundary, dragEnterred } = this.state;
    let content: ChildRect[];
    if (isResizing && this.state.updatingRects) {
      content = this.state.updatingRects;
    } else {
      this.collectBounds();
      content = this.childRects;
    }

    const layoutStyle: any = config.style || {};
    const gutter = config.space || 0;
    const builderTheme = getBuilderThemeVariables();

    // this.paddings = styleUtils.expandStyleArray(lodash.getValue(config, 'style.padding.number', [0]));

    return (<PageContext.Consumer>
      {(props: PageContextProps) => {
        this.maxPageWidth = props.maxWidth;

        return <div className={classNames('layout', className)} css={css`
          width: 100%;
          overflow: hidden;
          height: ${content.length === 0 ? '300px' : 'auto'};
          display: flex;
          justify-content: center;
        `} data-layoutid={layout.id}>
          <div css={css`
            width: 100%;
            max-width: ${props.maxWidth > 0 ? props.maxWidth + 'px' : 'none'};
          `}>
            <div
              className="row"
              ref={el => (this.ref = el)}
              css={css`
                position: relative;
                margin-left: ${-gutter / 2}px;
                margin-right: ${-gutter / 2}px;
                height: ${content.length === 0 ? '100%' : 'auto'};
              `}>
              {content.length > 0 && (
                content.map((_, index) => this.createItem(content, index, layoutStyle))
              )}
              {isDragging && dragOutOfBoundary && this.placeholderForDraggingItem()}
              {content.length === 0 && this.props.children}
              <div css={css`
                ${guideOverlay};
                display: ${isActive && this.props.draggingWidgetInfo && dragEnterred ? 'block' : 'none'};
              `} ref={el => (this.guideDragOverRef = el)} />
              <div
                ref={el => this.guideColRef = el}
                css={css`
                  pointer-events: none;
                  top: 0;
                  right: 0;
                  bottom: 0;
                  left: 0px;
                  position: absolute;
                  z-index: 1;
                  display: ${isActive && ((this.props.draggingWidgetInfo && dragEnterred) || isResizing) ? 'flex' : 'none'};
                `}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((key) => {
                  return (
                    <div
                      key={key}
                      css={css`
                        width: 8.333333%;
                      `}>
                      <div
                        css={css`
                          padding-left: ${gutter / 2}px;
                          padding-right: ${gutter / 2}px;
                          height: 100%;
                          width: 100%;
                          overflow: hidden;
                        `}>
                        <div
                          css={css`
                            transform: translateY(-5%);
                            border: 1px dotted ${polished.rgba(builderTheme.colors.grays.gray600, 0.6)};
                            height: 110%;
                            width: 100%;
                          `}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {content.length === 0 && this.props.children}
          </div>
        </div>;
      }}
    </PageContext.Consumer>
    );
  }
}

export const Row = withDrop<RowLayoutProps>()(SingleRow);
