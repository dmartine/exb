/** @jsx jsx */
import { BaseWidget, Immutable, LinkType, RepeatedDataSource, resolveExpression, 
  css, jsx, DataSourceComponent, AllWidgetProps, DataRecord, Expression } from 'jimu-core';
import { Link, WidgetPlaceholder, styleUtils, ImageWithParam, ImageParam} from 'jimu-ui';
import { IMConfig, ScaleType } from '../config';
import {FeatureLayerDataSource } from 'jimu-arcgis/arcgis-data-source';

let IconImage = require('./assets/icon.svg');

interface State {
  record?: DataRecord;
  imageWidth?: number;
  imageHeight?: number;
  widgetWidth?: number;
  widgetHeight?: number;

  toolTip: string;
  altText: string;
  src: string;
}
export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{
  dataSource?: FeatureLayerDataSource;
  __unmount = false;
  imageContainer: HTMLDivElement;

  constructor(props) {
    super(props);

    this.state = {
      record: null,
      toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip || '',
      altText: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altText || '',
      src: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.imageParam && this.props.config.functionConfig.imageParam.url || ''
    };
  }

  getStyle() {
    return css`
      .widget-image-container {
        .btn-link {
          border-bottom: 0;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          padding: 0;
          width: 100%;
          height: 100%;
        }
      }
    `;
  }

  componentDidMount() {
    this.__unmount = false;
    this.getParsedImageSrcFromConfig(this.props.config, this.getCurrentRecord(this.props, this.state), this.props.useDataSourcesEnabled).then(imageUrl => {
      if (imageUrl !== this.state.src) {
        if (this.__unmount) {
          return;
        }

        this.setState({
          src: imageUrl
        })
      }
    })
  }

  componentWillUnmount() {
    this.__unmount = true;
  }

  getParsedImageSrcFromConfig = (config: IMConfig, record: DataRecord, useDataSourcesEnabled: boolean): Promise<string> => {
    if (config.functionConfig.imageParam && config.functionConfig.imageParam.url) {
      return Promise.resolve(config.functionConfig.imageParam.url);
    } else if (config.functionConfig.srcExpression) {
      if (!useDataSourcesEnabled) {
        return Promise.resolve('');
      }

      let srcExp = config && config.functionConfig && config.functionConfig.srcExpression &&
      config.functionConfig.srcExpression.asMutable({deep: true}) || null;

      return resolveExpression(srcExp, record, this.props.intl).then(res => {return res || ''});
    } else {
      return Promise.resolve('');
    }
  }

  componentWillUpdate(nextProps: AllWidgetProps<IMConfig>, nextState: State) {
    if ((nextProps.config.functionConfig.imageParam !== this.props.config.functionConfig.imageParam) 
      || (nextProps.useDataSourcesEnabled !== this.props.useDataSourcesEnabled)
      || (nextProps.config.functionConfig.srcExpression !== this.props.config.functionConfig.srcExpression)
      || (nextProps.repeatedDataSource !== this.props.repeatedDataSource)
      || (nextProps.useDataSources !== this.props.useDataSources) || (nextState.record !== this.state.record)) {
      this.getParsedImageSrcFromConfig(nextProps.config, this.getCurrentRecord(nextProps, nextState), nextProps.useDataSourcesEnabled).then(imageUrl => {
        if (imageUrl !== this.state.src) {
          if (this.__unmount) {
            return;
          }

          this.setState({
            src: undefined,
          }, () => {
            if (this.__unmount) {
              return;
            }

            this.setState({
              src: imageUrl
            });
          })
        }
      })
    }
  }

  componentDidUpdate(prevProps: AllWidgetProps<IMConfig>, prevState: State){
    if(prevProps.useDataSourcesEnabled !== this.props.useDataSourcesEnabled && !this.props.useDataSourcesEnabled){
      this.setState({
        toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip,
        altText: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altText
      });
    }

    if(this.props.useDataSourcesEnabled && (this.props.config !== prevProps.config || this.state.record !== prevState.record)){
      this.resolveToolTip().then(t => {
        if (!this.__unmount) {
          this.setState({toolTip: t})
        }
      });
      this.resolveAltText().then(t => {
        if (!this.__unmount) {
          this.setState({altText: t})
        }
      });
    } else if(!this.props.useDataSourcesEnabled && (this.props.config !== prevProps.config || this.state.record !== prevState.record)){
      this.setState({
        toolTip: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTip,
        altText: this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altText
      });
    }
  }

  getCurrentRecord = (props: AllWidgetProps<IMConfig>, state: State): DataRecord => {
    const isInherited = props.useDataSources && props.useDataSources[0] ? props.useDataSources[0].isInherited : false;
    if (isInherited) {
      let contextDataSource = props.repeatedDataSource as RepeatedDataSource;
      let record = contextDataSource && contextDataSource.record as DataRecord;
      return record;
    } else {
      return state.record;
    }
  }

  getSrcExpression = (): Expression => {
    return this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.srcExpression &&
      this.props.config.functionConfig.srcExpression.asMutable({deep: true}) || null;
  }

  resolveToolTip = (): Promise<string> => {
    let record = this.getCurrentRecord(this.props, this.state);
    let toolTipExp = this.getToolTipExpression();

    return resolveExpression(toolTipExp, record, this.props.intl).then(res => res || '');
  }

  getToolTipExpression = (): Expression => {
    return this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression.asMutable({deep: true}) || null;
  }

  resolveAltText = (): Promise<string> => {
    let record = this.getCurrentRecord(this.props, this.state);

    let altTextExp = this.getAltTextExpression();
    return resolveExpression(altTextExp, record, this.props.intl).then(res => res || '');
  }

  getAltTextExpression = (): Expression => {
    return this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altTextExpression &&
      this.props.config.functionConfig.altTextExpression.asMutable({deep: true}) || null;
  }

  getSelectedRecord = (dataSource: FeatureLayerDataSource) => {
    if (dataSource) {
      return dataSource.getSelectedRecords()[0] as DataRecord;
    }
  }

  onDataSourceInfoChange = () => {
    const dataSource = this.dataSource;
    const record = this.getSelectedRecord(dataSource);
    if (record) {
      if (this.__unmount) {
        return;
      }

      this.setState({record});
    }
  }

  onDataSourceCreated = (dataSource: FeatureLayerDataSource) => {
    this.dataSource = dataSource;
    const record = this.getSelectedRecord(dataSource);
    if (this.__unmount) {
      return;
    }

    this.setState({
      record: record
    });
  }

  isEmptySource = (): boolean => {
    if ((!this.props.config.functionConfig.imageParam || !this.props.config.functionConfig.imageParam.url) && !this.props.config.functionConfig.srcExpression) {
      return true;
    } else {
      return false;
    }
  }

  onClick = (event: MouseEvent | TouchEvent) => {
    if (this.props.config.functionConfig.linkParam) {
      (event as any).exbEventType = 'linkClick';
    }
  }

  handleImageLoaded = (imageWidth: number, imageHeight: number) => {
    this.setState({
      imageWidth: imageWidth,
      imageHeight: imageHeight
    });
  }

  getWidgetWidth = () => {
    return this.imageContainer && this.imageContainer.clientWidth;
  }

  getWidgetHeight = () => {
    return this.imageContainer && this.imageContainer.clientHeight;
  }

  render() {
    let dataSourceId = null;
    let isInherited = false;

    if (this.props.useDataSources && this.props.useDataSources[0]) {
      dataSourceId = this.props.useDataSources[0].dataSourceId;
      isInherited = this.props.useDataSources[0].isInherited;
    }

    let {scale, linkParam} = this.props.config.functionConfig;
    let {backgroundColor, border, borderRadius, boxShadow} = this.props.config.styleConfig;
    let isDataSourceUsed = this.props.useDataSourcesEnabled;

    let toolTip = this.state.toolTip;
    let altText = this.state.altText;

    let styles = Immutable({});
    styles = styles.merge({
      overflow: 'hidden',
      WebkitMaskImage: '-webkit-radial-gradient(white, black)'
    });

    styles = styles.merge(ScaleType[scale]);

    let otherStyle = styleUtils.toCSSStyle({
      backgroundColor: backgroundColor,
      border: border,
      borderRadius: borderRadius,
      boxShadow: boxShadow
    }) as any;
    styles = styles.merge(otherStyle);

    let renderResult = null;
    let imageContent = null;

    if (this.isEmptySource()) {
      // nodata, show placeholder
      imageContent = <div style={{borderRadius: otherStyle && otherStyle.borderRadius}} className={'jimu-widget'}>
        <div title={toolTip} className="jimu-widget widget-image" style={styles as any}>
          { <WidgetPlaceholder icon={IconImage} message="Image" widgetId={this.props.id}/>}
        </div>
      </div>;
    } else {
      let imageParam = this.props.config.functionConfig.imageParam ? this.props.config.functionConfig.imageParam : Immutable({});
      if (imageParam.set) {
        imageParam = imageParam.set('url', this.state.src);
      } else {
        (imageParam as any).url = this.state.src;
      }

      imageContent = <div style={{borderRadius: otherStyle && otherStyle.borderRadius}} className={'jimu-widget'}>
        <div className="jimu-widget widget-image image-param" style={styles as any}>
          <ImageWithParam imageParam={imageParam as ImageParam} toolTip={toolTip} altText={altText} onImageLoaded={this.handleImageLoaded}
            useFadein></ImageWithParam>
        </div>
      </div>
    }

    // if have link param, add link to image widget
    let linkType = linkParam.linkType as any;
    if (linkType == LinkType.Page || linkType == LinkType.Dialog || linkType == LinkType.View) {
      renderResult = <div className="widget-image-container jimu-widget"><Link to={{linkType: linkType, value: linkParam.value}} queryObject={this.props.queryObject}
        target={linkParam.openType}>{imageContent}
      </Link></div>;
    } else if (linkType == LinkType.WebAddress) {
      renderResult = <div className="widget-image-container jimu-widget"><Link to={linkParam.value} target={linkParam.openType}>{imageContent}
      </Link></div>;
    } else {
      renderResult = imageContent;
    }
    if (this.props.isInlineEditing && this.state.src
      && ( !this.props.repeatedDataSource || (this.props.repeatedDataSource && (this.props.repeatedDataSource as RepeatedDataSource).recordIndex === 0))) {
      // open crop tool
      const WidgetInBuilder = this.props.builderSupportModules.widgetModules.WidgetInBuilder;
      renderResult = <div className="jimu-widget">{renderResult}<WidgetInBuilder widgetId={this.props.id} config={this.props.config}
        widgetWidth={this.getWidgetWidth()} widgetHeight={this.getWidgetHeight()} imageWidth={this.state.imageWidth} imageHeight={this.state.imageHeight}>
        </WidgetInBuilder></div>
    } else {
      renderResult = <div className="jimu-widget" css={this.getStyle()} style={{overflow: 'hidden'}} ref={ref => {this.imageContainer = ref; }}
        onClick={(event) => {this.onClick(event as any)}} onTouchEnd={(event) => {this.onClick(event as any)}}>{renderResult}
        { <div style={{ display: 'none' }}>
          {
            isDataSourceUsed && dataSourceId && !isInherited &&
            <DataSourceComponent useDataSource={this.props.useDataSources[0]}
              onDataSourceCreated={this.onDataSourceCreated} onDataSourceInfoChange={this.onDataSourceInfoChange}
            />
          }
        </div>}
      </div>;
    }

    return renderResult;
  }
}