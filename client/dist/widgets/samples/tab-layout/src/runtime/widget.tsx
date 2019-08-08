/** @jsx jsx */
import { BaseWidget} from 'jimu-core';
import { AllWidgetProps, jsx } from 'jimu-core';
import LayoutViewer from './runtime/layout';
import {IMConfig} from '../config';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any>{
  render() {

    const { builderSupportModules } = this.props;

    const LayoutComponent: typeof LayoutViewer = !window.jimuConfig.isInBuilder ?
    LayoutViewer : builderSupportModules.widgetModules.LayoutBuilder;

    if (!LayoutComponent) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        No layout component!
    </div>;
    }

    return <div className="widget-row-layout d-flex w-100 h-100">
      {/* <LayoutComponent layouts={layouts} config={this.props.config}>
      </LayoutComponent> */}
    </div>;
  }
}
