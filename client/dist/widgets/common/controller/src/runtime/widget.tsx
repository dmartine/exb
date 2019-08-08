/** @jsx jsx */
import { BaseWidget, jsx, css, AllWidgetProps, IMState, AppMode } from 'jimu-core';
import { IMConfig } from '../config';
import { WidgetRuntime } from './runtime';
import defaultMessages from './translations/default';

interface ExtraProps {
  isInBuilder: boolean;
  appMode: AppMode;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig> & ExtraProps>{
  constructor(props) {
    super(props);
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      isInBuilder: state.appContext.isInBuilder,
      appMode: state.appRuntimeInfo.appMode
    }
  };

  getStyle = () => {
    return css`
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      .jimu-link {
        font-size: 1rem;
        flex-shrink: 1 !important;
      }
    `;
  }

  isBuilder = () => {
    const { isInBuilder, appMode } = this.props;
    return isInBuilder && appMode !== AppMode.Run;
  }

  nls = (id: string) => {
    return this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] })
  }

  render() {
    const { builderSupportModules: bsm, id, config } = this.props;
    const isBuilder = this.isBuilder();
    const WidgetInBuilder = isBuilder && bsm && bsm.widgetModules.WidgetInBuilder;
    return <div className="widget-controller jimu-widget shadow" css={this.getStyle()}>
      {!isBuilder && <WidgetRuntime id={id} config={config} nls={this.nls}></WidgetRuntime>}
      {isBuilder && WidgetInBuilder && <WidgetInBuilder id={id} config={config} nls={this.nls}></WidgetInBuilder>}
    </div>
  }
}