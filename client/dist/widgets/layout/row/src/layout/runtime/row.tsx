/** @jsx jsx */
import {
  React,
  classNames,
  jsx,
  css,
  lodash,
  IMLayoutJson,
  IMThemeVariables,
} from 'jimu-core';
import { IMRowConfig } from '../../config';
import RowItem from './layout-item';
import {
  LayoutProps,
  PageContext,
  PageContextProps,
} from 'jimu-layouts/common';
import { ChildRect, TOTAL_COLS } from '../types';

type RowLayoutProps = LayoutProps & {
  config: IMRowConfig;
  layout: IMLayoutJson;
  transformedLayout: IMLayoutJson;
  rowIndex: number;
  itemIds: string; // items joined with comma
  theme: IMThemeVariables;
};

export class Row extends React.PureComponent<RowLayoutProps> {
  childRects: ChildRect[];

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
    const { layout, config } = this.props;
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
      <RowItem
        key={childRect.id}
        offset={offset}
        span={childRect.width}
        layoutId={layout.id}
        layoutItemId={childRect.id}
        alignItems={layoutStyle.alignItems}
        style={{
          paddingLeft: gutter / 2,
          paddingRight: gutter / 2,
        }}
      />
    );
  }

  render() {
    const { layout, className, config } = this.props;
    this.collectBounds();
    const content = this.childRects;

    const layoutStyle: any = config.style || {};
    const gutter = config.space || 0;

    return (
    <PageContext.Consumer>
      {(props: PageContextProps) => {
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
              css={css`
                position: relative;
                margin-left: ${-gutter / 2}px;
                margin-right: ${-gutter / 2}px;
                height: ${content.length === 0 ? '100%' : 'auto'};
              `}>
              {content.length > 0 && (
                content.map((_, index) => this.createItem(content, index, layoutStyle))
              )}
            </div>
          </div>
        </div>;
      }}
    </PageContext.Consumer>
    );
  }
}
