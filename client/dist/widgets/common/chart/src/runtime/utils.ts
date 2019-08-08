import { IDefinition } from '@esri/cedar';
import { DataRecord } from 'jimu-core';
import { ImmutableObject } from 'seamless-immutable';

// default overrides
const overrides = {
  // don't show JS chart by amCharts in esri products
  hideCredits: true
};

export type statisticType = 'count' | 'sum' | 'average' | 'min' | 'max';

// example settings from Hub chart card
// https://github.com/ArcGIS/Hub/blob/master/cards/chart-card.md
// "mode": "builder", // or 'json'
// "defnition": { datasets, series, overrides }, // this is the cedar definition, built from the props below
// "chartType": "bar", // or pie, scatter, etc
// // category/value fields managed by field pickers
// "categoryField": "Year",
// // "categoryFieldType": "esriFieldTypeString", // we probably don't need this
// "valueFields": ["Number_of_Deaths2015"], // array of field names, one for each series
// // NOTE: don't need types for value fields, limited to numeric, at least initially
// "statType": "count", // or 'sum', 'average', 'min', 'max'
// // filter fields, managed by the filter builder
// "where": "STATE like '%VA%'",
// // we'll need filterEnabled if we want to persist previous where after saving w/ toggle off
// // "filterEnabled": true,
// // split by - note: not sure if we can actually do this in the builder
// // it dramatically alters the cedar definition (multiple datasets)
// // "splitByField": "Gender"
// // options
// // If we are building an EXTRACT statement for a time field
// "timeInterval": "Year",
// "sortField": "category", // or 'value'
// "sortDirection": "ASC", // or 'DESC'
// "numberOfValues": 10, // defaults to undefined = all values
// "height": 400, // card height, in pixels
// "legendEnabled": true,
// "tooltipEnabled": true,
// "title": "Drug Overdose Deaths",
// "titleAlign": "left",
// // we'll need titleVisible if we want to persist previous title after saving w/ toggle off
// // "titleVisible": true,
// "labelsVisible": true,
// "categoryLabel": "Year",
// "valueLabel": "Deaths",
// "chartTextColor": "#000",
// "chartBackgroundColor": "#fff",
// "primaryColor": "#ed0000", // use lib to generate array of colors for series from this,
// "sourceText": "Centers For Disease Control And Prevention"

export interface Config {
  chartType?: string;
  // TODO: default to first 2 fields in dataset if category and value fields not specified?
  categoryField?: string;
  valueFields?: string[];
  statType?: statisticType;
  where?: string;
  categoryLabel?: string;
  valueLabels?: string[];
  title?: string;
  definition?: IDefinition;
  height?: number;
  domains?: any;
  sortField?: string;
  sortDirection?: string;
  // TODO: others
};

export type IMConfig = ImmutableObject<Config>;

// TODO: add tests for exported fns

/**
 * append the statistic type to the field name for summary queries
 *
 * @param valueField value field name
 * @param statType summary statistic type
 */
function getValueFieldName(valueField: string, statType: string) {
  return statType ? `${valueField}_${statType.toUpperCase()}` : valueField;
}

/**
 * build query parameters (where, order by, etc) from chart config
 * @param config chart widget config
 */
export function buildQuery(config: IMConfig) {
  // TODO: bring over actual logic from Hub
  const {
    valueFields,
    categoryField,
    statType,
    sortField,
    sortDirection
  } = config;
  const query: any = {};
  if (statType) {
    let outStatisticFieldName;
    query.groupByFieldsForStatistics = categoryField;
    query.outStatistics = valueFields.map(valueField => {
      outStatisticFieldName = getValueFieldName(valueField, statType);
      return {
        statisticType: statType,
        onStatisticField: valueField,
        outStatisticFieldName: outStatisticFieldName
      }
    });
    query.orderByFields = outStatisticFieldName && `${outStatisticFieldName} DESC`;
  } else {
    if (sortField) {
      let orderByFields = sortField === 'value' ? valueFields[0] : categoryField;
      if (sortDirection) {
        orderByFields = orderByFields + ` ${sortDirection}`;
      }
      query.orderByFields = orderByFields;
    }
  }
  return query;
}

/**
 * create a chart series for each value field
 *
 * @param config chart widget config
 * @param source dataset name
 */
function createSeries(config: IMConfig, source: string) {
  const {
    valueFields,
    categoryField,
    statType,
    categoryLabel,
    valueLabels
  } = config;
  return valueFields.map((valueField, i) => {
    const valueFieldName = getValueFieldName(valueField, statType);
    const valueLabel = valueLabels ? valueLabels[i] : valueFieldName;
    return {
      category: {
        field: categoryField,
        label: categoryLabel
      },
      value: {
        field: valueFieldName,
        label: valueLabel
      },
      source
    }
  });
}

export function applyOverrides(definition: IDefinition) {
  // return a clone of the definition and mix in the default overrides
  const clonedDefinition = JSON.parse(JSON.stringify(definition));
  return { ...clonedDefinition, overrides };
}

/**
 *
 * @param config chart widget config
 * @param dataRecords data records
 */
export function createDefinition(config: IMConfig, dataRecords: DataRecord[]): IDefinition {
  // otherwise build a definition from the other settings
  // extract the data from the records
  const data = dataRecords.map(record => record.getData());

  // build and return a new cedar definition
  // NOTE: this dataset name is arbitrary since we only have one dataset (for now)
  const name = 'dataset0';
  return {
    type: config.chartType,
    datasets: [{
      name,
      data,
      domains: config.domains
    }],
    series: createSeries(config, name),
    overrides
  }
}
