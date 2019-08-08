import { React, IMSizeModeLayoutJson, classNames } from 'jimu-core'
import { FlexboxType, FlexboxLayoutForBuilder, IconTextSize } from 'jimu-layouts/flexbox-builder';
import { LayoutItemDisplaySetting, WidgetDisplayMode } from 'jimu-layouts/common';
import { ImageShapeType } from 'jimu-ui';

interface Props {
  activeIds?: string;
  itemStyle: {
    size: IconTextSize,
    shape: ImageShapeType,
    showText?: boolean
  },
  widgetWrapper?: React.Component<any>;
  layouts: IMSizeModeLayoutJson,
  start: number,
  end: number,
  direction: FlexboxType,
  space: number,
  onClick?: (widgetId: string, ndoe: any) => any;
}

export class LayoutForBuilder extends React.PureComponent<Props> {

  handleOnClick = (e: React.MouseEvent<MouseEvent>, widgetId) => {
    this.props.onClick(widgetId, e.target);
  }

  render() {
    const { layouts, space, direction = FlexboxType.Row, start, end, itemStyle, activeIds } = this.props;
    const controllerSetting: LayoutItemDisplaySetting = {
      displayMode: WidgetDisplayMode.Icon,
      icon: itemStyle
    }

    return <FlexboxLayoutForBuilder
      className={classNames({ 'h-100': direction === FlexboxType.Row }, { 'w-100': direction === FlexboxType.Column })}
      start={start}
      end={end}
      layouts={layouts}
      direction={direction}
      itemResizable={false}
      itemSelectable={false}
      config={{ space, style: { alignItems: 'center', justifyContent: 'center' } } as any}
      itemDisplaySetting={controllerSetting}
      onItemClick={this.handleOnClick}
      activeIds={activeIds}
    ></FlexboxLayoutForBuilder>;
  }
}