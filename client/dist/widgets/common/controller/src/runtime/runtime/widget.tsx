/** @jsx jsx */
import {
  React, jsx, IMState, IMLayoutJson, utils as jimuUtils, IMSizeModeLayoutJson, ReactRedux, ThemeVariables, ImmutableObject, LayoutItemType, ContainerType, appConfigUtils
} from 'jimu-core';
import { IMConfig } from '../../config';
import { RollList, Placeholder } from '../common'
import { FlexboxType } from 'jimu-layouts/flexbox-runtime';
import utils from '../utils';
import { Layout } from './layout'
import { WidgetRenderer, WidgetInfo } from './render-widget/widget-renderer';

const LayoutName = 'controller';

const widgetRenderDefPosition = {
  staring: {
    left: 70,
    top: 70
  },
  offset: 30,
  minSzie: 30,
  space: 30
}

const widgetRenderDefSize = {
  width: 300,
  height: 300
}

interface OwnProps {
  id: string;
  layoutId?: string;
  config: IMConfig;
  nls: (id: string) => string;
};

interface ExtraProps {
  layout: IMLayoutJson;
  layouts: IMSizeModeLayoutJson;
  theme: ThemeVariables;
  pageId: string;
}

export type IMWidgetInfo = ImmutableObject<WidgetInfo>;

interface State {
  openedWidgets: IMWidgetInfo[];
  activeIconNode: HTMLDivElement;
  start: number,
  end: number
}

export class _Widget extends React.PureComponent<OwnProps & ExtraProps, State>{
  constructor(props) {
    super(props);
    this.state = {
      openedWidgets: [],
      activeIconNode: null,
      start: 0,
      end: 1
    }
  }

  componentDidUpdate(preProps: OwnProps & ExtraProps) {
    const { config: { onlyOpenOne: preOnlyOpenOne, displayType: preDisplayType } } = preProps;
    const { config: { onlyOpenOne, displayType } } = this.props;
    if (preOnlyOpenOne !== onlyOpenOne || displayType !== preDisplayType) {
      this.setState({ openedWidgets: [] });
    }
  }

  handleClick = (id: string, activeIconNode?: HTMLDivElement) => {
    this.setState({ activeIconNode });
    let { openedWidgets } = this.state;
    const { config: { onlyOpenOne } } = this.props;

    const openedWidget = utils.getOpenedWidget(openedWidgets, id);
    if (!openedWidget) {
      openedWidgets = utils.toggleOpenedWidgets(openedWidgets, onlyOpenOne, { id, show: true });
    } else {
      openedWidgets = utils.toggleOpenedWidgetsDisplay(openedWidgets, onlyOpenOne, id);
    }
    this.setState({ openedWidgets });
  }

  getActiveIds = () => {
    let activeIds = [];
    const { openedWidgets } = this.state;
    openedWidgets.forEach((ow) => {
      if (ow.show) {
        activeIds.push(ow.id);
      }
    });
    return activeIds;
  }

  onRollLayoutResize = (width: number, height: number) => {
    const { layout, config } = this.props;
    const counts = utils.getWidgetCountsFromLayout(layout);
    if (!counts) {
      return;
    }
    const [start, end] = utils.calculateStartEnd(width, height, config);
    this.setState({ start, end });
  }

  onListArrowClick = (previous: boolean, rollOne: boolean = true) => {
    const { layout } = this.props;
    let { start, end } = this.state;
    const { disablePrevious, disableNext } = this.calculateRollListState();
    if ((disablePrevious && previous) || (disableNext && !previous)) {
      return;
    }

    const counts = utils.getWidgetCountsFromLayout(layout);
    const [s, e] = utils.onListArrowClick(previous, counts, start, end, rollOne);
    this.setState({ start: s, end: e });
  }

  calculateRollListState = () => {
    const { layout } = this.props;
    const { start, end } = this.state;
    const { showArrow, disablePrevious, disableNext } = utils.calculateRollListState(start, end, layout);
    return { showArrow, disablePrevious, disableNext };
  }

  mutableOpenedWidget = () => {
    const { openedWidgets } = this.state;
    return openedWidgets ? openedWidgets.map(ow => ow.asMutable()) : []
  }

  getWidgetPageNode = () => {
    const { pageId } = this.props;
    return document.querySelector(`.page[data-pageid="${pageId}"]`);
  }

  onWidgetPopperClose = (id: string) => {
    let { openedWidgets } = this.state;
    const { config: { onlyOpenOne } } = this.props;
    openedWidgets = utils.toggleOpenedWidgetsDisplay(openedWidgets, onlyOpenOne, id);
    this.setState({ openedWidgets });
  }

  widgetIconList = () => {
    const { layouts, config, config: { horizontal, space }, theme } = this.props;
    const { start, end } = this.state;

    return <RollList horizontal={horizontal} theme={theme} {...this.calculateRollListState()} onResize={this.onRollLayoutResize} onArrowClick={this.onListArrowClick}>
      <Layout itemStyle={utils.getLayoutIconStyle(config)} start={start} end={end} layouts={layouts} space={space} onClick={this.handleClick}
        direction={horizontal ? FlexboxType.Row : FlexboxType.Column} activeIds={this.getActiveIds().join()} >
      </Layout>
    </RollList>
  }

  placeholderRenderer = () => {
    const { layout, theme, nls } = this.props;
    const counts = utils.getWidgetCountsFromLayout(layout);
    return !counts && window.jimuConfig.isInBuilder && <Placeholder theme={theme} text={nls('placeholder')} />;
  }

  openWidgetsRenderer = () => {
    const { config: { horizontal, onlyOpenOne }, theme, id } = this.props;
    const { activeIconNode } = this.state;
    const placement = onlyOpenOne ? horizontal ? 'bottom-start' : 'right-start' : 'bottom-start';
    const container = this.getWidgetPageNode();

    return <WidgetRenderer
      theme={theme}
      widgetsInfo={this.mutableOpenedWidget()}
      activeIconNode={activeIconNode}
      widgetId={id} placement={placement} container={container}
      position={widgetRenderDefPosition} defaultSize={widgetRenderDefSize}
      onClose={this.onWidgetPopperClose} />;
  }


  render() {
    return <React.Fragment>
      {this.placeholderRenderer()}
      {this.openWidgetsRenderer()}
      {this.widgetIconList()}
    </React.Fragment>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  const layouts = state.appConfig.widgets[ownProps.id].layouts;
  const info = appConfigUtils.getWidgetOrSectionContainerInfo(state.appConfig, ownProps.id, LayoutItemType.Widget, state.browserSizeMode);
  return {
    theme: state.theme,
    layout: state.appConfig.layouts[jimuUtils.findLayoutId(layouts[LayoutName], state.browserSizeMode, state.appConfig.mainSizeMode)],
    layouts: layouts[LayoutName],
    appMode: state.appRuntimeInfo.appMode,
    pageId: (info && info.type === ContainerType.Page) ? info.id : ''
  }
}

export const WidgetRuntime = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_Widget);