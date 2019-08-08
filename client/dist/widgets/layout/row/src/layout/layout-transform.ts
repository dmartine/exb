import { extensionSpec, IMLayoutJson, Immutable, BrowserSizeMode, lodash, IMLayoutItemJson, } from 'jimu-core';
import { getAppConfigAction } from 'jimu-for-builder';
import { TOTAL_COLS } from './types';

export default class RowLayoutTransformer implements extensionSpec.LayoutTransformer {
  id = 'row-layout-transformer';

  layoutType = 'ROW';

  transformLayout(
    layout: IMLayoutJson,
    fromSizeMode: BrowserSizeMode,
    toSizeMode: BrowserSizeMode,
  ): IMLayoutJson {
    if (fromSizeMode === toSizeMode) {
      return layout;
    }

    let updatedLayout: IMLayoutJson = Immutable(layout);

    if (toSizeMode === BrowserSizeMode.Small) {
      (layout.order || []).forEach((itemId, index) => {
        updatedLayout = updatedLayout.setIn(['content', itemId, 'bbox', 'left'], index * TOTAL_COLS)
          .setIn(['content', itemId, 'bbox', 'width'], TOTAL_COLS);
      });
    } else if (fromSizeMode === BrowserSizeMode.Small) {
      // compact all items in one row
      let totalWidth = 0;
      Object.keys(layout.content || []).forEach((itemId) => {
        const itemWidth = parseInt(lodash.getValue(layout, `content.${itemId}.bbox.width`, 0), 10);
        totalWidth += itemWidth;
      });
      const ratio = totalWidth > TOTAL_COLS ? Math.ceil(totalWidth / TOTAL_COLS) : 1;
      let left = 0;
      (layout.order || []).forEach((itemId, index) => {
        const itemWidth = parseInt(lodash.getValue(layout, `content.${itemId}.bbox.width`, 0), 10);
        const ratioWidth = Math.max(1, Math.floor(itemWidth / ratio));
        updatedLayout = updatedLayout.setIn(['content', itemId, 'bbox', 'left'], left)
          .setIn(['content', itemId, 'bbox', 'width'], ratioWidth);
        left += ratioWidth;
      });
    }

    return updatedLayout;
  }

  transformLayoutItem(
    item: IMLayoutItemJson,
    index: number,
    fromLayoutId: string,
    toLayoutId: string,
    fromSizeMode: BrowserSizeMode,
    toSizeMode: BrowserSizeMode
  ): {item: IMLayoutItemJson, index: number} {
    const appConfig = getAppConfigAction().appConfig;
    const toLayout = appConfig.layouts[toLayoutId];
    let transformedItem = item;
    let newIndex = index;
    if (toSizeMode === BrowserSizeMode.Small) {
      // Add as the last item
      newIndex = (toLayout.order || []).length;
      transformedItem = transformedItem.setIn(['bbox', 'left'], newIndex * TOTAL_COLS)
        .setIn(['bbox', 'width'], TOTAL_COLS);
    } else {
      // Add to last if there is enough space, otherwise add as a new row
      if (toLayout.order && toLayout.order.length > 0) {
        const lastItem = toLayout.content[toLayout.order[toLayout.order.length - 1]];
        const rightSide = parseInt(lastItem.bbox.left, 10) + parseInt(lastItem.bbox.width, 10);
        const space = TOTAL_COLS - rightSide;
        if (space >= 2) {
          transformedItem = transformedItem.setIn(['bbox', 'left'], rightSide)
            .setIn(['bbox', 'width'], space);
        } else {
          transformedItem = transformedItem.setIn(['bbox', 'left'], TOTAL_COLS)
            .setIn(['bbox', 'width'], TOTAL_COLS);
        }
      }
    }
    return {
      item: transformedItem,
      index: newIndex,
    };
  }
}
