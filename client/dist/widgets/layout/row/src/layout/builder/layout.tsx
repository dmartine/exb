/** @jsx jsx */
import {
  React,
  ReactRedux,
  classNames,
  LayoutInfo,
  jsx,
  css,
  LayoutItemConstructorProps,
  AppMode,
  BrowserSizeMode,
  lodash,
  getAppStore,
  appActions,
  ExtensionManager,
  extensionSpec,
  LayoutTransformFunc,
  IMLayoutJson,
  polished,
} from 'jimu-core';
import { styleUtils } from 'jimu-ui';
import { getAppConfigAction } from 'jimu-for-builder';
import { IMRowConfig } from '../../config';
import {
  LayoutProps,
  StateToLayoutProps,
  mapStateToLayoutProps,
  autoBindHandlers,
  getBuilderThemeVariables,
} from 'jimu-layouts/common';
import { FlowLayoutContext, FlowLayoutContextProps, addItemToLayout } from 'jimu-layouts/layout-builder';
import { TOTAL_COLS } from '../types';
import { Row } from './row';

type RowLayoutProps = LayoutProps & {
  config: IMRowConfig;
  parentLayoutId?: string;
  parentLayoutItemId?: string;
};

interface State {
  activeRowIndex: number;
}

class RowLayout extends React.PureComponent<RowLayoutProps & StateToLayoutProps, State> {
  layoutTransform: LayoutTransformFunc;
  finalLayout: IMLayoutJson;
  ref: HTMLElement;
  flowLayoutId: string;
  rows: string[][];
  dragOverBoundary: (
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    itemRect: ClientRect,
    parentLayoutInfo: LayoutInfo,
    side: 'top' | 'bottom',
  ) => void;
  dragLeaveBoundary: (
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
  ) => void;
  dropAtBoundary: (
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    itemRect: ClientRect,
    parentLayoutInfo: LayoutInfo,
    side: 'top' | 'bottom',
  ) => void;

  constructor(props) {
    super(props);
    // this.childrenRef = {};
    autoBindHandlers(this, [
      'dragOverInnerRowBoundary',
      'dragLeaveInnerRowBoundary',
      'dropAtInnerRowBoundary',
      'onRowDragOver',
    ]);
    this.state = {
      activeRowIndex: -1
    };
  }

  findExtension() {
    const exts = ExtensionManager.getInstance().getExtensions(
      `${extensionSpec.ExtensionPoints.LayoutTransformer}`,
    );
    if (exts && exts.length > 0) {
      const ext = exts.find(item => (item as extensionSpec.LayoutTransformer).layoutType === 'ROW');
      this.layoutTransform = lodash.getValue(ext, 'transformLayout');
    }
  }

  collectRowItems() {
    const { layout, browserSizeMode, layouts, mainSizeMode } = this.props;
    if (!this.layoutTransform) {
      this.findExtension();
    }
    let targetLayout = layout;
    const viewOnly = layouts[browserSizeMode] !== layout.id;
    if (viewOnly && this.layoutTransform) {
      targetLayout = this.layoutTransform(layout, mainSizeMode, browserSizeMode);
    }
    this.finalLayout = targetLayout;

    const content = targetLayout.order || [];

    const rows = [];
    let row = [];
    let rowIndex = 0;
    rows.push(row);
    content.forEach((itemId) => {
      const bbox = targetLayout.content[itemId].bbox;
      const left = parseInt(bbox.left, 10);
      const rowNum = Math.floor(left / TOTAL_COLS);
      if (rowNum > rowIndex) {
        row = [];
        rowIndex = rowNum;
        rows.push(row);
      }
      row.push(itemId);
    });
    return rows;
  }

  dragOverInnerRowBoundary(draggingItem: LayoutItemConstructorProps | LayoutInfo,
    itemRect: ClientRect,
    rowIndex: number,
    side: 'top' | 'bottom',
  ) {
    if (this.flowLayoutId === this.props.parentLayoutId && this.dragOverBoundary) {
      return this.dragOverBoundary(
        draggingItem,
        itemRect as ClientRect,
        {
          layoutId: this.props.parentLayoutId,
          layoutItemId: this.props.parentLayoutItemId,
        },
        side,
      );
    }
  }

  dragLeaveInnerRowBoundary(draggingItem: LayoutItemConstructorProps | LayoutInfo) {
    if (this.flowLayoutId === this.props.parentLayoutId && this.dragLeaveBoundary) {
      return this.dragLeaveBoundary(
        draggingItem,
      );
    }
  }

  dropAtInnerRowBoundary(
    draggingItem: LayoutItemConstructorProps | LayoutInfo,
    itemRect: ClientRect,
    rowIndex: number,
    side: 'top' | 'bottom',
  ) {
    if (this.props.browserSizeMode === BrowserSizeMode.Small) {
      const { layout } = this.props;
      // Add an item
      const insertRowIndex = side === 'top' ? rowIndex : rowIndex + 1;
      let insertIndex = 0;
      for (let i = 0; i < insertRowIndex; i += 1) {
        insertIndex += this.rows[i].length;
      }
      let appConfigAction = getAppConfigAction();

      // Increase the bbox.left of the following rows
      for (let j = insertRowIndex; j < this.rows.length; j += 1) {
        const row = this.rows[j];
        row.forEach((itemId) => {
          const bbox = lodash.getValue(
            appConfigAction.appConfig,
            `layouts.${layout.id}.content.${itemId}.bbox`);

          appConfigAction.editLayoutItemBBox(
            {
              layoutId: layout.id,
              layoutItemId: itemId,
            },
            bbox.set('left', parseInt(bbox.left, 10) + TOTAL_COLS));
        });
      }
      const bbox = {
        left: insertRowIndex * TOTAL_COLS,
        width: 12,
        height: itemRect.height,
      };
      const containerRect = this.ref.getBoundingClientRect();

      addItemToLayout(
        appConfigAction.appConfig,
        draggingItem,
        {
          layoutId: layout.id,
        },
        containerRect, bbox as ClientRect, insertIndex).then((result) => {
          const { layoutInfo, updatedAppConfig } = result;
          appConfigAction = getAppConfigAction(updatedAppConfig);
          appConfigAction.exec();
          getAppStore().dispatch(appActions.selectionChanged(layoutInfo));
        });
    } else if (this.flowLayoutId === this.props.parentLayoutId && this.dropAtBoundary) {
      return this.dropAtBoundary(
        draggingItem,
        itemRect as ClientRect,
        {
          layoutId: this.props.parentLayoutId,
          layoutItemId: this.props.parentLayoutItemId,
        },
        side,
      );
    }
  }

  onRowDragOver(rowIndex) {
    this.setState({
      activeRowIndex: rowIndex,
    });
  }

  createRow(itemIds: string[], index: number) {
    if (itemIds.length === 0) {
      const content = this.props.layout.order || [];
      if (content.length > 0) {
        return null;
      }
    }
    const isChildOfFlowLayout = this.flowLayoutId === this.props.parentLayoutId;
    const { layout, config, layouts, theme, appMode } = this.props;
    const canDropAtBoundary = this.flowLayoutId === this.props.parentLayoutId && this.rows.length > 1;
    return <Row key={index}
      rowIndex={index}
      childOfFlowLayout={isChildOfFlowLayout}
      itemIds={itemIds.join(',')}
      layouts={layouts}
      layout={layout}
      transformedLayout={this.finalLayout}
      config={config}
      theme={theme}
      appMode={appMode}
      isActive={this.state.activeRowIndex === index}
      dragOverBoundary={canDropAtBoundary ? this.dragOverInnerRowBoundary : null}
      dragLeaveBoundary={canDropAtBoundary ? this.dragLeaveInnerRowBoundary : null}
      dropAtBoundary={canDropAtBoundary ? this.dropAtInnerRowBoundary : null}
      onActive={this.onRowDragOver}
    >{this.props.children}</Row>;
  }

  render() {
    const { layout, className, config, appMode } = this.props;
    this.rows = this.collectRowItems();

    const layoutStyle: any = config.style || {};
    const builderTheme = getBuilderThemeVariables();

    return (
      <FlowLayoutContext.Consumer>
        {(value: FlowLayoutContextProps) => {
          if (value) {
            this.dragOverBoundary = value.dragOverBoundary;
            this.dragLeaveBoundary = value.dragLeaveBoundary;
            this.dropAtBoundary = value.dropAtBoundary;
            this.flowLayoutId = value.flowLayoutId;
          }
          const mergedStyle: any = {
            ...styleUtils.toCSSStyle(layoutStyle as any),
          };
          if (!mergedStyle.border && appMode === AppMode.Design) {
            const isChildOfFlowLayout = this.flowLayoutId === this.props.parentLayoutId;
            if (isChildOfFlowLayout) {
              mergedStyle.borderBottom = `1px dashed ${polished.rgba(builderTheme.colors.grays.gray600, 0.3)}`;
            } else {
              mergedStyle.border = `1px dashed ${polished.rgba(builderTheme.colors.grays.gray600, 0.3)}`;
            }
          }

          return (<div className={classNames('layout d-flex flex-column align-items-stretch', className)} css={css`
            width: 100%;
            overflow: hidden;
          `} style={mergedStyle} data-layoutid={layout.id}
          ref={el => this.ref = el}>
            {this.rows.map((itemIds, index) => this.createRow(itemIds, index))}
          </div>);
        }}
      </FlowLayoutContext.Consumer>
    );
  }
}

export default ReactRedux.connect<StateToLayoutProps, {}, RowLayoutProps>(mapStateToLayoutProps)(
  RowLayout as any,
);
