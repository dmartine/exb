
import { WidgetInfo } from './runtime/render-widget/widget-renderer';
import { IMWidgetInfo } from './runtime/widget'
import { Immutable, IMLayoutJson } from 'jimu-core';
import { getIconSize } from 'jimu-layouts/common';
import { IMConfig } from '../config';

const mo = {
  toggleOpenedWidgets: (openedWidgets: IMWidgetInfo[], onlyOpenOne: boolean, openedWidget: WidgetInfo): IMWidgetInfo[] => {
    if (onlyOpenOne) {
      openedWidgets = mo.updateOpenedWidgetDisplay(openedWidgets, false);
    }
    let newOpenedWidgets: IMWidgetInfo[];
    if (mo.getOpenedWidget(openedWidgets, openedWidget.id)) {
      newOpenedWidgets = openedWidgets.filter((v: IMWidgetInfo) => {
        return v.id !== openedWidget.id;
      });
    } else {
      newOpenedWidgets = openedWidgets.concat(Immutable(openedWidget));
    }
    return newOpenedWidgets;
  },

  updateOpenedWidgetDisplay: (openedWidgets: IMWidgetInfo[], show: boolean): IMWidgetInfo[] => {
    return openedWidgets.map((v: IMWidgetInfo) => {
      return v.set('show', show);
    })
  },

  toggleOpenedWidgetsDisplay: (openedWidgets: IMWidgetInfo[], onlyOpenOne: boolean, id: string): IMWidgetInfo[] => {
    let newOpenedWidgets: IMWidgetInfo[];
    newOpenedWidgets = openedWidgets.map((v: IMWidgetInfo) => {
      if (v.id === id) {
        return v.set('show', !v.show);
      }
      return v;
    });
    if (onlyOpenOne) {
      newOpenedWidgets = newOpenedWidgets.map((v: IMWidgetInfo) => {
        if (v.id !== id) {
          return v.set('show', false);
        }
        return v;
      });
    }
    return newOpenedWidgets;
  },

  getOpenedWidget: (openedWidgets: IMWidgetInfo[], widgetId: string): IMWidgetInfo => {
    return openedWidgets.find(ow => ow.id === widgetId)
  },

  getWidgetIdsFromLayout: (layout: IMLayoutJson): string[] => {
    const content = layout.order || [];
    return content.map(itemId => layout.content[itemId] && layout.content[itemId].widgetId);
  },

  getWidgetCountsFromLayout: (layout: IMLayoutJson): number => {
    const widgets = mo.getWidgetIdsFromLayout(layout) || [];
    return widgets.length;
  },

  getRollListLength: (width: number, height: number, config: IMConfig): number => {
    const { horizontal, space } = config;
    return (horizontal ? width : height) + space;
  },

  getIconUnitLength: (config: IMConfig): number => {
    const { iconSize, space } = config;
    const baseLength = getIconSize(iconSize);
    const offset = 4;
    return baseLength + offset + space;
  },

  getOneScreenNumber: (length: number, config: IMConfig): number => {
    const unitLength = mo.getIconUnitLength(config);
    return Math.floor(length / unitLength);
  },

  calculateStartEnd: (width: number, height: number, config: IMConfig): [number, number] => {
    const length = mo.getRollListLength(width, height, config);
    const number = mo.getOneScreenNumber(length, config);
    let start = 0, end = start + number;
    return [start, end];
  },

  calculateRollListState: (start: number, end: number, layout: IMLayoutJson): { showArrow: boolean, disablePrevious: boolean, disableNext: boolean } => {
    const counts = mo.getWidgetCountsFromLayout(layout);
    const showArrow = (end - start) < counts;
    const disablePrevious = start === 0;
    const disableNext = end >= counts;
    return { showArrow, disablePrevious, disableNext }
  },

  onListArrowClick: (previous: boolean, counts: number, start: number, end: number, rollOne: boolean = true): [number, number] => {
    if (!counts) {
      return [0, 1];
    }
    const oneScreenNumber = end - start;
    const number = rollOne ? 1 : oneScreenNumber;
    start = previous ? start - number : start + number;
    end = previous ? end - number : end + number;
    return [start, end];
  },

  getLayoutIconStyle: (config: IMConfig) => {
    const { iconSize, iconStyle, showLabel } = config;
    return {
      size: iconSize,
      shape: iconStyle,
      showText: showLabel
    }
  }

}

export default mo;