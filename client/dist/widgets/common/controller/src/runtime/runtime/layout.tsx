import { React, IMSizeModeLayoutJson} from 'jimu-core'
import { FlexboxType, FlexboxLayout } from 'jimu-layouts/flexbox-runtime';
import { LayoutItemDisplaySetting, WidgetDisplayMode, IconTextSize } from 'jimu-layouts/common';
import { ImageShapeType } from 'jimu-ui';

interface Props {
  activeIds?: string;
  layouts: IMSizeModeLayoutJson,
  start: number,
  end: number,
  direction: FlexboxType,
  space: number,
  onClick?: (widgetId: string, ndoe: any) => any;
  itemStyle: {
    size: IconTextSize,
    shape: ImageShapeType,
    showText?: boolean
  },
}

export class Layout extends React.PureComponent<Props> {

  handleOnClick = (e: React.MouseEvent<MouseEvent>, widgetId) => {
    this.props.onClick(widgetId, e.target);
  }

  render() {
    const { layouts, space, direction = FlexboxType.Row, start, end, itemStyle, activeIds } = this.props;
    const controllerSetting: LayoutItemDisplaySetting = {
      displayMode: WidgetDisplayMode.IconText,
      icon: itemStyle
    }
    return <FlexboxLayout
      start={start}
      end={end}
      layouts={layouts}
      direction={direction}
      config={{ space, style: { alignItems: 'center', justifyContent: 'center' } } as any}
      itemDisplaySetting={controllerSetting}
      onItemClick={this.handleOnClick}
      activeIds={activeIds}
    ></FlexboxLayout>;
  }
}