/** @jsx jsx */
import { BaseWidget, AllWidgetProps, jsx, IMThemeVariables } from 'jimu-core';
// import defaultMessages from './translations/default';
import { SidebarLayout, SidebarType, IMSidebarConfig } from 'jimu-layouts/sidebar-runtime';

export default class Widget extends BaseWidget<AllWidgetProps<IMSidebarConfig>> {
  render() {
    const { layouts, theme, builderSupportModules } = this.props;
    const LayoutComponent = !window.jimuConfig.isInBuilder
      ? SidebarLayout
      : builderSupportModules.widgetModules.SidebarLayoutBuilder;

    if (!LayoutComponent) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No layout component!</div>
      );
    }

    return (
      <div className="widget-sidebar-layout d-flex w-100 h-100">
        <LayoutComponent
          theme={theme as IMThemeVariables}
          widgetId={this.props.id}
          direction={SidebarType.Vertical}
          // layouts={layouts[DEFAULT_EMBED_LAYOUT_NAME]}
          firstLayouts={layouts.FIRST}
          secondLayouts={layouts.SECOND}
          config={this.props.config}
        />
      </div>
    );
  }
}
