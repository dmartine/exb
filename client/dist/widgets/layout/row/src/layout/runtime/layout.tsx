/** @jsx jsx */
import {
  React,
  ReactRedux,
  classNames,
  jsx,
  css,
  ExtensionManager,
  extensionSpec,
  LayoutTransformFunc,
  lodash,
  IMLayoutJson,
} from 'jimu-core';
import { styleUtils } from 'jimu-ui';

import { IMRowConfig } from '../../config';
import { Row } from './row';
import {
  LayoutProps,
  StateToLayoutProps,
  mapStateToLayoutProps,
} from 'jimu-layouts/common';
import { ChildRect, TOTAL_COLS } from '../types';

type FlexboxLayoutProps = LayoutProps & {
  config: IMRowConfig;
};

class RowLayout extends React.PureComponent<FlexboxLayoutProps & StateToLayoutProps> {
  childRects: ChildRect[];
  rows: string[][];
  finalLayout: IMLayoutJson;
  layoutTransform: LayoutTransformFunc;

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
    if (layouts[browserSizeMode] !== layout.id && this.layoutTransform) {
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

  createRow(itemIds: string[], index: number) {
    if (itemIds.length === 0) {
      const content = this.props.layout.order || [];
      if (content.length > 0) {
        return null;
      }
    }
    const { layout, config, layouts, theme } = this.props;
    return <Row key={index}
      rowIndex={index}
      itemIds={itemIds.join(',')}
      layouts={layouts}
      layout={layout}
      transformedLayout={this.finalLayout}
      config={config}
      theme={theme}
    ></Row>;
  }

  // collectBounds() {
  //   const { layout, layouts, browserSizeMode } = this.props;

  //   if (!this.layoutTransform) {
  //     this.findExtension();
  //   }

  //   let targetLayout = layout;
  //   if (layouts[browserSizeMode] !== layout.id && this.layoutTransform) {
  //     let fromSizeMode;
  //     Object.keys(layouts).some((mode) => {
  //       if (layouts[mode] === layout.id) {
  //         fromSizeMode = mode;
  //         return true;
  //       }
  //     });
  //     targetLayout = this.layoutTransform(layout, fromSizeMode, browserSizeMode);
  //   }

  //   const content = targetLayout.order || [];
  //   this.childRects = [];

  //   content.forEach((itemId) => {
  //     const bbox = targetLayout.content[itemId].bbox;
  //     this.childRects.push({
  //       id: itemId,
  //       left: parseInt(bbox.left, 10),
  //       width: parseInt(bbox.width, 10),
  //       height: parseInt(bbox.height, 10),
  //     });
  //   });
  //   return this.childRects.sort((a, b) => a.left - b.left);
  // }

  // createItem(childRects: ChildRect[], index: number, layoutStyle) {
  //   const { layout, config } = this.props;
  //   const childRect = childRects[index];
  //   const gutter = config.space || 0;

  //   let offset;
  //   if (index === 0) {
  //     offset = childRect.left;
  //   } else {
  //     const previousBBox = childRects[index - 1];
  //     offset = childRect.left - previousBBox.left - previousBBox.width;
  //   }
  //   return (
  //     <LayoutItem
  //       key={childRect.id}
  //       offset={offset}
  //       span={childRect.width}
  //       layoutId={layout.id}
  //       layoutItemId={childRect.id}
  //       onClick={this.props.onItemClick}
  //       alignItems={layoutStyle.alignItems}
  //       style={{
  //         paddingLeft: gutter / 2,
  //         paddingRight: gutter / 2,
  //       }}
  //       // itemDisplaySetting={itemDisplaySetting}
  //     />
  //   );
  // }

  render() {
    const { layout, className, config } = this.props;

    this.rows = this.collectRowItems();

    const layoutStyle: any = config.style || {};

    const mergedStyle: any = {
      ...styleUtils.toCSSStyle(layoutStyle as any),
    };

    return (<div className={classNames('layout d-flex flex-column align-items-stretch', className)} css={css`
      width: 100%;
      overflow: hidden;
    `} style={mergedStyle} data-layoutid={layout.id}>
      {this.rows.map((itemIds, index) => this.createRow(itemIds, index))}
    </div>);
  }
}

export default ReactRedux.connect<StateToLayoutProps, {}, FlexboxLayoutProps>(mapStateToLayoutProps)(RowLayout);
