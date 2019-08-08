/** @jsx jsx */
import {React, LinkType, DataSourceComponent, BaseWidget, AllWidgetProps, resolveExpression, DataRecord, ExpressionPartType,
  RepeatedDataSource, Expression, IMDataSourceInfo, jsx} from 'jimu-core';
import {styleUtils, Link} from 'jimu-ui';
import {FeatureLayerDataSource} from 'jimu-arcgis/arcgis-data-source';
import {IMConfig} from '../config';
import {getStyle} from './style';

interface State{
  info: IMDataSourceInfo;
  text: string;
  toolTip: string;
  url: string;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{
  __unmount = false;
  dataSource: FeatureLayerDataSource;

  constructor(props) {
    super(props);
    this.state = {
      info: null,
      text: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.text || 'button',
      toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip || '',
      url: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.value || ''
    };
  }

  componentDidMount(){
    this.__unmount = false;
    if(this.props.useDataSourcesEnabled){
      this.resolveText().then(t => !this.__unmount && this.setState({text: t}));
      this.resolveTooltip().then(t => !this.__unmount && this.setState({toolTip: t}));
      this.resolveLinkSetting().then(t => !this.__unmount && this.setState({url: t}));
    }
  }

  componentDidUpdate(prevProps: AllWidgetProps<IMConfig>, prevState: State){
    if(prevProps.useDataSourcesEnabled !== this.props.useDataSourcesEnabled && !this.props.useDataSourcesEnabled){
      this.setState({
        info: null,
        text: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.text,
        toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip
      });
    }

    if(this.props.useDataSourcesEnabled &&
      (
        this.props.config !== prevProps.config || this.props.useDataSources !== prevProps.useDataSources
        || this.props.repeatedDataSource  !== prevProps.repeatedDataSource
        || !this.getAreRecordsSame(prevProps, prevState) || !this.getAreInheritedSame(prevProps, prevState)
      )
    ){
      this.resolveText().then(t => !this.__unmount && this.setState({text: t}));
      this.resolveTooltip().then(t => !this.__unmount && this.setState({toolTip: t}));
      this.resolveLinkSetting().then(t => !this.__unmount && this.setState({url: t}));
    }else if(!this.props.useDataSourcesEnabled &&
      (
        this.props.config !== prevProps.config || this.props.useDataSources !== prevProps.useDataSources
      )
    ){
      this.setState({
        text: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.text,
        toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip,
        url: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.value
      });
    }
  }

  componentWillUnmount(){
    this.__unmount = true;
  }

  getAreRecordsSame = (prevProps: AllWidgetProps<IMConfig>, prevState: State): boolean => {
    let isInherited = this.props.useDataSources && this.props.useDataSources[0] ? this.props.useDataSources[0].isInherited : false;
    if(isInherited){
      let contextDataSource = this.props.repeatedDataSource as RepeatedDataSource;
      let record = contextDataSource && contextDataSource.record as DataRecord;
      let prevContextDataSource = this.props.repeatedDataSource as RepeatedDataSource;
      let prevRecord = prevContextDataSource && prevContextDataSource.record as DataRecord;
      return record === prevRecord;
    }else{
      return prevState.info === this.state.info;
    }
  }

  getAreInheritedSame = (prevProps: AllWidgetProps<IMConfig>, prevState: State): boolean => {
    let isInherited = this.props.useDataSources && this.props.useDataSources[0] ? this.props.useDataSources[0].isInherited : false;
    let prevletIsInherited = prevProps.useDataSources && prevProps.useDataSources[0] ? prevProps.useDataSources[0].isInherited : false;
    return isInherited === prevletIsInherited;
  }

  getRecord = (): DataRecord => {
    let isInherited = this.props.useDataSources && this.props.useDataSources[0] ? this.props.useDataSources[0].isInherited : false;
    let record: DataRecord;
    if(isInherited){
      let contextDataSource = this.props.repeatedDataSource as RepeatedDataSource;
      record = contextDataSource && contextDataSource.record as DataRecord;
    }else{
      record = this.getSelectedRecord(this.dataSource);
    }

    return record;
  }

  resolveText = (): Promise<string> => {
    let record = this.getRecord();
    let textExp = this.getTextExpression();

    return resolveExpression(textExp, record, this.props.intl).then(res => res || '');
  }

  resolveTooltip = (): Promise<string> => {
    let record = this.getRecord();
    let toolTipExp = this.getTipExpression();

    return resolveExpression(toolTipExp, record, this.props.intl).then(res => res || '');
  }

  resolveLinkSetting = (): Promise<string> => {
    let record = this.getRecord();
    let linkSettingExp = this.getLinkSettingExpression();

    return resolveExpression(linkSettingExp, record, this.props.intl).then(res => res || '');
  }

  getSelectedRecord = (dataSource: FeatureLayerDataSource): DataRecord => {
    if(dataSource){
      return dataSource.getSelectedRecords()[0];
    }
    return null;
  }

  onDataSourceInfoChange = (info: IMDataSourceInfo) => {
    this.setState({info});
  }

  onDataSourceCreated = (dataSource: FeatureLayerDataSource) => {
    this.dataSource = dataSource;
    this.setState({info: dataSource && dataSource.getInfo()});
  }

  getTipExpression = (): Expression => {
    return this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression.asMutable({deep: true})
      || {name: 'default expression', parts: [{type: ExpressionPartType.String, exp: `"${this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip}"`}]};
  }

  getTextExpression = (): Expression => {
    return this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.textExpression &&
      this.props.config.functionConfig.textExpression.asMutable({deep: true})
      || {name: 'default expression', parts: [{type: ExpressionPartType.String, exp: `"${this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.text}"`}]};
  }

  getLinkSettingExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.linkParam &&
      this.props.config.functionConfig.linkParam && this.props.config.functionConfig.linkParam.expression;

    return (expression && expression.asMutable({deep: true})) || null;
  }

  render() {
    const config = this.props.config;
    const isDataSourceUsed = this.props.useDataSourcesEnabled;
    const themeClassName = config.styleConfig.themeStyle.className + ' widget-link text-truncate';
    const linkParam = config.functionConfig.linkParam;
    const text = this.state.text;
    const toolTip = this.state.toolTip;

    let linkType = linkParam.linkType as any;
    let style = styleUtils.toCSSStyle(config.styleConfig.customStyle.regular) as React.CSSProperties;
    let hoverStyle = styleUtils.toCSSStyle(config.styleConfig.customStyle.hover) as React.CSSProperties;
    let visitedStyle = styleUtils.toCSSStyle(config.styleConfig.customStyle.clicked) as React.CSSProperties;
    let tempTarget = linkParam.openType;

    let customStyle = {
      style,
      hoverStyle,
      visitedStyle
    };
    let themeStyle = {
      color: config.styleConfig.themeStyle.color,
      size: config.styleConfig.themeStyle.size,
      outline: config.styleConfig.themeStyle.outline,
      rounded: config.styleConfig.themeStyle.rounded
    };

    let LinkComponent;

    if (linkParam.linkType == LinkType.Page || linkParam.linkType == LinkType.Dialog || linkParam.linkType == LinkType.View) {
      LinkComponent = <Link to={{linkType: linkType, value: linkParam.value}}
        className={themeClassName} queryObject={this.props.queryObject}
        target={tempTarget} title={toolTip} customStyle={customStyle} themeStyle={themeStyle}
      >
        {text}
      </Link>;
    } else if (linkParam.linkType == LinkType.WebAddress) {
      let linkTo = this.state.url;

      LinkComponent = <Link to={linkTo} className={themeClassName} themeStyle={themeStyle}
        target={tempTarget} customStyle={customStyle} title={toolTip}
      >
        {text}
      </Link>
    } else {
      LinkComponent = <Link target={tempTarget} className={themeClassName} themeStyle={themeStyle}
        customStyle={customStyle} title={toolTip}
      >
        {text}
      </Link>
    }

    return (
      <div className="w-100 h-100 p-2" css={getStyle(this.props.theme)}>
        {LinkComponent}

        <div style={{ display: 'none' }}>
          {
            isDataSourceUsed &&
            <DataSourceComponent useDataSource={this.props.useDataSources && this.props.useDataSources[0]}
              onDataSourceCreated={this.onDataSourceCreated} onDataSourceInfoChange={this.onDataSourceInfoChange}
            />
          }
        </div>
      </div>
    )
  }
}
