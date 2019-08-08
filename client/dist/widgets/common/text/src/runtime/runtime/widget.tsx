/** @jsx jsx */
import {
  React, jsx, resolveExpression, RepeatedDataSource, DataRecord, Immutable, MultipleDataSourceComponent, DataSource, IMDataSourceInfo, DataSourceStatus, ImmutableArray,
  IMUseDataSource, InjectedIntl, ImmutableObject, lodash, DataSourceManager, urlUtils, LinkResult, ReactRedux, IMUrlParameters, IMState, IMExpression, ExpressionPartType
} from 'jimu-core';

import { getQuillStyle } from 'jimu-ui';
import { IMConfig } from '../../config';
import { expressionRegular, expressionIdRegular, linkRegular, linkIdRegular, linkHrefRegular, getDataSourceIds } from '../utils';

interface DataSourceMap {
  [dataSourceId: string]: DataSource & { isInherited: boolean };
}

interface DataSourceInfoMap {
  [dataSourceId: string]: IMDataSourceInfo
}

interface RecordMap {
  [dataSourceId: string]: DataRecord
}

interface Props {
  intl?: InjectedIntl
  repeatedDataSource: RepeatedDataSource,
  useDataSources: ImmutableArray<IMUseDataSource>;
  config: IMConfig
}
interface ExpressionValueMap {
  [id: string]: string
}

interface ExtraProps {
  queryObject: IMUrlParameters;
}

type IMExpressionValueMap = ImmutableObject<ExpressionValueMap>

interface State {
  loading: boolean;
  infos: DataSourceInfoMap
  expressionValueMap: IMExpressionValueMap;
}

class _RuntimeWidget extends React.PureComponent<Props & ExtraProps, State>{
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      infos: {},
      expressionValueMap: Immutable({}) as IMExpressionValueMap
    };
  }

  componentDidMount() {
    const { repeatedDataSource } = this.props;
    if (!repeatedDataSource || !repeatedDataSource.dataSourceId) {
      return;
    }
    this.resolveExpressionValues({ [repeatedDataSource.dataSourceId]: repeatedDataSource.record });
  }

  componentDidUpdate() {
    const { repeatedDataSource } = this.props;
    if (!repeatedDataSource || !repeatedDataSource.dataSourceId) {
      return;
    }
    this.resolveExpressionValues({ [repeatedDataSource.dataSourceId]: repeatedDataSource.record });
  }

  private getRecords = (dss: DataSourceMap = {}, infos?: DataSourceInfoMap): RecordMap => {
    if (!dss || !Object.keys(dss).length) {
      return;
    }
    let recordMap = {};
    Object.keys(dss).forEach(dsid => {
      const ds = dss[dsid];
      let record = null;
      if (ds.isInherited) {
        const repeatedDataSource = this.props.repeatedDataSource as RepeatedDataSource;
        record = repeatedDataSource && repeatedDataSource.record;
      } else {
        //By default, only the first selected record is used
        record = ds && ds.getSelectedRecords()[0] as DataRecord;
      }
      recordMap = lodash.assign(recordMap, { [dsid]: record });
    });
    return recordMap;
  }

  getDataSoruceIdsFromExpression = (expression: IMExpression) => {
    const ds = [];
    const parts = expression.parts;
    parts.filter(p => !!p).forEach(p => {
      if (p.dataSourceId) {
        ds.push(p.dataSourceId);

      }
      if (p.type === ExpressionPartType.Function) {
        const iParts = p.parts;
        iParts.filter(ip => !!ip).forEach(ip => {
          if (ip.dataSourceId) {
            ds.push(ip.dataSourceId);
          }
        });
      }
    });
    return ds;
  }

  isValidExpression = (expression: IMExpression) => {
    if (!expression || !expression.parts || !expression.parts.length) {
      return false;
    }
    const us = getDataSourceIds(this.props.useDataSources);
    const dataSourceIds = this.getDataSoruceIdsFromExpression(expression);
    return dataSourceIds.every(dsId => us.indexOf(dsId) > -1);
  }

  resolveExpressionValue = (expression: IMExpression, records: RecordMap): Promise<string> => {
    const isValid = this.isValidExpression(expression);
    if (!isValid) {
      return Promise.resolve('');
    }
    return resolveExpression(expression, records, this.props.intl);
  }

  resolveExpressionValues = (records: RecordMap) => {
    const { config: { expression = {}, link = {} } } = this.props;

    let promises1 = Object.keys(expression).map((id) => {
      const value = expression[id];
      return new Promise((resolove, reject) => {
        this.resolveExpressionValue(value, records).then((val) => {
          resolove({ id, val });
        }).catch((error) => {
          reject(error)
        });
      });
    });

    let promises2 = Object.keys(link).map((id) => {
      const ret = link[id];
      const val = ret && ret.expression;
      return new Promise((resolove, reject) => {
        this.resolveExpressionValue(val, records).then((val) => {
          resolove({ id, val });
        }).catch((error) => {
          reject(error)
        });
      });
    });

    const promises = promises1.concat(promises2);

    Promise.all(promises).then((valMap: any) => {
      let { expressionValueMap } = this.state;

      valMap.forEach((val) => {
        if (!val) {
          return;
        }
        expressionValueMap = expressionValueMap.set(val.id, val.val)
      });

      const { expressionValueMap: preExpressionValueMap } = this.state;
      if (preExpressionValueMap !== expressionValueMap) {
        this.setState({ expressionValueMap });
      }
    });
  }

  private isLoading = (infos: DataSourceInfoMap): boolean => {
    if (!infos) {
      return false;
    }
    return Object.keys(infos).some(dsid => infos[dsid].status === DataSourceStatus.Loading);
  }

  getExpressionById = (id: string) => {
    const { config: { expression } } = this.props;
    return expression && expression[id];
  }

  getLinkById = (id: string) => {
    const { config: { link } } = this.props;
    return link && link[id];
  }

  resolveExpression = (): string => {
    let { config: { text: html } } = this.props;
    if (!html) {
      return '';
    }
    html = this._resolveExpression(html);
    html = this.resolveLinkExpression(html);
    return html;
  }

  _resolveExpression = (text: string) => {
    const { expressionValueMap } = this.state;
    return text.replace(expressionRegular, (exp) => {
      const ret = exp.match(expressionIdRegular);
      const id = ret && ret[1];
      if (!id) {
        return exp;
      }
      const expression = this.getExpressionById(id);
      if (!expression) {
        return exp;
      }
      const resolved = expressionValueMap[id];
      if (typeof resolved !== 'undefined') {
        return resolved
      } else {
        return '';
      }
    });
  }

  resolveLinkExpression = (text: string) => {
    const { queryObject } = this.props;
    const { expressionValueMap } = this.state;
    return text.replace(linkRegular, (tag) => {
      const ret = tag.match(linkIdRegular);
      const id = ret && ret[1];
      if (!id) {
        return tag;
      }
      let href = '';

      const link = this.getLinkById(id);
      const expression = link && link.expression;

      if (expression) {
        href = expressionValueMap[id] || '';
      } else {
        href = urlUtils.getHrefFromLinkTo(link as LinkResult, queryObject);
      }

      tag = tag.replace(linkHrefRegular, `href="${href}"`);

      return tag;
    });
  }

  getUseDataSourceById = (dsid: string): IMUseDataSource => {
    const { useDataSources = [] } = this.props;
    return useDataSources.filter(e => e.dataSourceId === dsid)[0];
  }

  getDataSources = (infos = {} as DataSourceInfoMap): DataSourceMap => {
    const dss = {};
    const dsm = DataSourceManager.getInstance();

    Object.keys(infos).forEach(dsid => {
      const useDataSource = this.getUseDataSourceById(dsid);
      if (!useDataSource.isInherited) {
        dss[dsid] = dsm.getDataSource(dsid);
      }
    })
    return dss;
  }

  widgetRenderer = (): React.ReactElement<any> => {
    const { loading } = this.state;
    const html = this.resolveExpression();
    return <React.Fragment>
      <div css={getQuillStyle()} className="w-100 ql-runtime" dangerouslySetInnerHTML={{ __html: html }}></div>
      {loading && <div className="jimu-small-loading"></div>}
    </React.Fragment>;
  }

  onDataSourceInfoChange = (infos: DataSourceInfoMap) => {
    const dss = this.getDataSources(infos);
    const records = this.getRecords(dss);
    this.resolveExpressionValues(records);
    const loading = this.isLoading(infos);
    this.setState({ loading });
  }

  render() {
    const { useDataSources = [] } = this.props;
    return <React.Fragment>
      {!!useDataSources.length && <MultipleDataSourceComponent onDataSourceInfoChange={this.onDataSourceInfoChange} useDataSources={useDataSources}></MultipleDataSourceComponent>}
      {this.widgetRenderer()}
    </React.Fragment>
  }
}

const mapStateToProps = (state: IMState) => {
  return {
    queryObject: state.queryObject
  }
}

export default ReactRedux.connect<ExtraProps, {}, Props>(mapStateToProps)(_RuntimeWidget);
