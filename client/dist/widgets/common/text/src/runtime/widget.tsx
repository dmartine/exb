/** @jsx jsx */
import { BaseWidget, classNames, AllWidgetProps, IMState, jsx, RepeatedDataSource, css, appActions, AppMode } from 'jimu-core';
import { IMConfig } from '../config';
import WidgetRunTime from './runtime/widget'
interface ExtraProps {
  isInBuilder: boolean;
  isInlineEditing?: boolean;
  appMode: AppMode;
}

enum RepeatType { None, Main, Sub };
interface State {
  repeat: RepeatType
}
export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps, State>{

  constructor(props) {
    super(props);
    this.state = {
      repeat: 0
    }
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      appMode: state.appRuntimeInfo.appMode,
      isInBuilder: state.appContext.isInBuilder
    }
  };

  componentDidMount() {
    this.setRepeatType();
    const { id } = this.props;
    this.props.dispatch(appActions.widgetStatePropChange(id, 'showExpressionTool', this.showExpressionTool()));
  }

  componentDidUpdate(preProps) {
    const { useDataSources, id, isInlineEditing, appMode, useDataSourcesEnabled } = this.props;
    const { useDataSources: preUseDataSources, useDataSourcesEnabled: preUseDataSourcesEnabled, isInlineEditing: preIsInlineEditing, appMode: preAppMode } = preProps;
    if (useDataSources !== preUseDataSources || useDataSourcesEnabled !== preUseDataSourcesEnabled) {
      this.props.dispatch(appActions.widgetStatePropChange(id, 'showExpressionTool', this.showExpressionTool()));
    }
    if (appMode !== preAppMode && appMode === AppMode.Run) {
      this.props.dispatch(appActions.setWidgetIsInlineEditingState(id, false));
    }
    if (isInlineEditing !== preIsInlineEditing && !isInlineEditing) {
      this.hideQuillPluginPanel();
    }
  }

  showExpressionTool = (): boolean => {
    const { useDataSources, useDataSourcesEnabled } = this.props;
    return !!(useDataSourcesEnabled && useDataSources && useDataSources.length);
  }

  hideQuillPluginPanel = () => {
    const { id } = this.props;
    this.props.dispatch(appActions.widgetStatePropChange(id, 'showExpression', false));
    this.props.dispatch(appActions.widgetStatePropChange(id, 'showFormats', false));
  }

  setRepeatType = () => {
    const repeatedDataSource = this.props.repeatedDataSource as RepeatedDataSource;
    let repeat;
    if (!repeatedDataSource) {
      repeat = RepeatType.None;
    } else {
      if (repeatedDataSource.recordIndex === 0) {
        repeat = RepeatType.Main;
      } else {
        repeat = RepeatType.Sub;
      }
    }
    this.setState({ repeat })
  }

  hasEditingAbility = () => {
    const { repeat } = this.state;
    return repeat === RepeatType.None || repeat === RepeatType.Main;
  }

  private getStyle = () => {
    return css`
      overflow-x: hidden;
      overflow-y: auto;
      word-break: break-word;
      .hidden {
          display: none !important;
      }
      &.in-builder{
        cursor: text;
      }
    `
  }

  private isEditable = () => {
    const { repeat } = this.state;
    const { isInBuilder, isInlineEditing } = this.props;
    return isInBuilder && (repeat === RepeatType.None || repeat === RepeatType.Main) && isInlineEditing
  }


  private widgetRenderer = () => {
    const { repeatedDataSource, useDataSources, useDataSourcesEnabled, intl, config } = this.props;
    const editable = this.isEditable();
    return !editable ? <WidgetRunTime config={config} repeatedDataSource={repeatedDataSource as RepeatedDataSource}
      useDataSources={useDataSourcesEnabled ? useDataSources : undefined} intl={intl}></WidgetRunTime> : null;
  }

  private builderRenderer = () => {
    const { config, builderSupportModules, id, useDataSources, useDataSourcesEnabled, intl } = this.props;
    const editable = this.isEditable();
    const WidgetInBuilder = editable ? builderSupportModules.widgetModules.WidgetInBuilder : null;
    return WidgetInBuilder ? <WidgetInBuilder config={config} widgetId={id} useDataSources={useDataSourcesEnabled ? useDataSources : undefined} intl={intl}>
    </WidgetInBuilder> : null;
  }

  render() {
    const editable = this.isEditable();
    return <div
      css={this.getStyle()}
      className={classNames('widget-text jimu-widget p-1', { 'run-time': !editable, 'in-builder': editable })}>
      {this.builderRenderer()}
      {this.widgetRenderer()}
    </div>;
  }
}
