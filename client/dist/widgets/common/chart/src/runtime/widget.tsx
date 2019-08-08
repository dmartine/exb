import { React, FormattedMessage, BaseWidget, AllWidgetProps, UseDataSource, DataSourceComponent, Immutable } from 'jimu-core';
import { moduleLoader } from 'jimu-core';
import { Alert } from 'jimu-ui';
import { IMConfig } from '../config';
import defaultMessages from './translations/default';
import { CedarChart } from './CedarChart';
import { createDefinition, buildQuery, applyOverrides } from './utils';

// TODO: move this to utils once we add a test for this widget?
// lazy load charting library and assets
function loadDependencies() {
  // first, lazy load amCharts
  return moduleLoader.loadModule('amcharts/amcharts.js')
  .then(() => {
    // TODO: what's the best way to load the cedar calcite theme?
    // if we serve the amcharts root locally,
    // then we can merge this under the amcharts theme route
    require('@esri/cedar/dist/esm/themes/amCharts/calcite');
    // lazy load amCharts plugin(s)
    const plugins = [
      'amcharts/pie.js',
      'amcharts/serial.js'
    ];
    return moduleLoader.loadModules(plugins);
  });
}

// TODO: move these fns into utils and or base widget class and add tests?
function getDataSourceId(useDataSources: Immutable.ImmutableArray<Immutable.ImmutableObject<UseDataSource>>, index: number = 0) {
  return useDataSources && useDataSources.length >  0 && useDataSources[index].dataSourceId;
}
function renderChart(definition, config:IMConfig) {
  let height;
  if (config.height) {
    if (config.title) {
      // TODO: really we should calculate the title height
      // for now just hard-coding at 28px
      const titleHeight = 28;
      height = Math.max(config.height - 28, titleHeight);
    } else {
      height = config.height;
    }
  }
  return <CedarChart height={height} definition={Immutable(definition)} loadDependencies={loadDependencies} />;
}
function getContent(props) {
  const {
    useDataSources,
    config,
    stateProps
  } = props;

  if (config.definition) {
    // custom chart definition passed in as JSON,
    // apply the default overrides and render a chart
    return renderChart(applyOverrides(config.definition), config);
  }
  // build definition from data source records
  const dsId = getDataSourceId(useDataSources);
  if (!dsId) {
    // user has not configured a data source yet
    const messageId = 'pleaseConfigureADataSource';
    return <Alert color='danger'><FormattedMessage id={messageId} defaultMessage={defaultMessages[messageId]} /></Alert>;
  }
  // build the data source query from the widget's config and current extent (if any)
  const query = buildQuery(config);
  query.geometry = stateProps && stateProps.queryExtent;
  return <DataSourceComponent query={query} useDataSource={useDataSources[0]}>{(ds) => {
    return renderChart(createDefinition(config, ds.getRecords()), config)
  }}</DataSourceComponent>
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, { /* no internal state yet */ }>{
  render(){
    const {
      config: {title}
    } = this.props;

    return <div className="widget-chart">
      {/* TODO: use standard widget header for this? */}
      {!!title && <div className="jimu-chart-title">{title}</div>}
      {getContent(this.props)}
    </div>;
  }
}
