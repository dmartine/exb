/** @jsx jsx */
import { IMState, classNames as classnames, ThemeVariables, SerializedStyles, ImmutableArray,
  Immutable, ImmutableObject, urlUtils, css, jsx, IMUseDataSource, Expression } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps, BorderSetting, FourSides, DataSourceChooser, AllDataSourceTypes, ExpressionInput, ExpressionInputFrom,
  BoxShadowSetting, ColorChooser, LinkParam, SettingSection, SettingRow, LinkSettingPopup, ImageChooser, expressionUtils} from 'jimu-for-builder';
import {Button, Icon, Col, Input, Switch, Collapse, BorderSides, ImageParam} from 'jimu-ui';
import {IMConfig, ShapeStyle, ImgSourceType} from '../config';
import {PreDefinedConfigs} from './predefined-configs';
import defaultMessages from './translations/default';

interface ExtraProps{
  preDefinedConfigs: PreDefinedInfo;
}

interface PreDefinedInfo {
  shapes: ImmutableObject<{ [shapeName: string]: ShapeStyle }>;
}

interface State {
  currentTipInput: string;
  currentAltTextInput: string;
  isShowLinkSetting: boolean;
  shadowOpen: boolean;
  isSrcPopupOpen: boolean;
  isToolTipPopupOpen: boolean;
  isAltTextPopupOpen: boolean;
}

let IconRefesh = require('jimu-ui/lib/icons/link-12.svg');

export default class Setting extends BaseWidgetSetting<AllWidgetSettingProps<IMConfig> & ExtraProps, State>{
  supportedTypes = Immutable([AllDataSourceTypes.FeatureLayer, AllDataSourceTypes.FeatureQuery]);

  constructor(props) {
    super(props);
  }

  getStyle(theme: ThemeVariables): SerializedStyles{
    return css`
      .widget-setting-image {
        font-size: 13px;
        font-weight: lighter;
        overflow-y: auto;
      
        .setting-function {
      
          .setting-function-item {
            overflow: hidden;
      
            .setting-function-item-input {
              width: 200px;
            }
          }
        }

        .border-selected {
          border: 2px solid ${theme.colors.cyans.cyan500} !important;
        }
      
        .uploadInput {
          position: absolute;
          opacity: 0;
          left: 0;
          top: 0;
          cursor: pointer;
        }

        .uploadFileName {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          opacity: 0.5;
        }
      
        .uploadInput-container {
          position: relative;
        }
        
        .setting-exterior {
      
          .exterior-shape-item {
            padding-bottom: 100%;
            cursor: pointer;
          }
        }
      
        .setting-stylepicker-selected {
          border-width: 2px !important;
        }

        .set-link-btn{
          background-color: ${theme.colors.grays.gray300};
        }
        .set-link-btn:hover, .set-link-btn:hover.set-link-btn:active{
          background-color: ${theme.colors.grays.gray200};
        }

        .set-clear-image {
          &:focus {
            outline: none;
            box-shadow: none !important;
            text-decoration: none;
          }
        }
      }
    `;
  }

  componentWillMount() {
    this.setState({
      currentTipInput: this.props.config.functionConfig.toolTip,
      currentAltTextInput: this.props.config.functionConfig.altText,
      shadowOpen: this.props.config.styleConfig.boxShadow ? true : false,
      isSrcPopupOpen: false,
      isToolTipPopupOpen: false,
      isAltTextPopupOpen: false
    });
  }

  componentDidUpdate(prevProps: AllWidgetSettingProps<IMConfig>) {
    if (this.props.useDataSourcesEnabled !== prevProps.useDataSourcesEnabled) {
      let checked = this.props.useDataSourcesEnabled;

      let functionConfig = Immutable(this.props.config.functionConfig);
  
      if (checked) {
        if (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByStaticUrl) {
          functionConfig = functionConfig.set('imgSourceType', ImgSourceType.ByDynamicUrl);
        }
      } else {
        if (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl) {
          functionConfig = functionConfig.set('imgSourceType', ImgSourceType.ByStaticUrl);
        }
      }
  
      this.props.onSettingChange({
        widgetId: this.props.id,
        config: this.props.config.set('functionConfig', functionConfig)
      });
    }
  }

  static mapExtraStateProps = (state: IMState) => {
    return {
      preDefinedConfigs: PreDefinedConfigs
    }
  };

  settingLinkConfirm = (linkResult: LinkParam) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'linkParam'], linkResult)
    });

    this.setState({
      isShowLinkSetting: false
    });
  }

  updateStyle = (key: string, value: any) => {
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['styleConfig', key], value)
    });
  }

  shapeChange = (shapeName: string) => {
    let style = Immutable(this.props.config.styleConfig);
    style = style.set('shape', shapeName);
    style = style.set('borderRadius', this.props.preDefinedConfigs.shapes[shapeName].borderRadius);

    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['styleConfig'], style)
    });
  }

  altTextConfigChange = () => {
    let config = {
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'altText'], this.state.currentAltTextInput)
        .setIn(['functionConfig', 'altTextExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields()
    };
    this.props.onSettingChange(config);
  }

  toolTipConfigChange = () => {
    let config = {
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTip'], this.state.currentTipInput)
        .setIn(['functionConfig', 'toolTipExpression'], null),
      useDataSources: this.getUseDataSourcesWithoutFields()
    };
    this.props.onSettingChange(config);
  }

  imgSourceTypeChanged = (imgSourceType: ImgSourceType) => {
    let functionConfig = Immutable(this.props.config.functionConfig);

    functionConfig = functionConfig.set('imgSourceType', imgSourceType);
    functionConfig = functionConfig.set('srcExpression', null);
    functionConfig = functionConfig.set('imageParam', this.resetImageParam(this.props.config.functionConfig.imageParam));

    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set('functionConfig', functionConfig)
    });
  }

  openSrcPopup = () => {
    this.setState({
      isSrcPopupOpen: true,
      isAltTextPopupOpen: false,
      isToolTipPopupOpen: false
    });
  }

  closeSrcPopup = () => {
    this.setState({isSrcPopupOpen: false});
  }

  openToolTipPopup = () => {
    this.setState({
      isSrcPopupOpen: false,
      isAltTextPopupOpen: false,
      isToolTipPopupOpen: true
    });
  }

  closeToolTipPopup = () => {
    this.setState({isToolTipPopupOpen: false});
  }

  openAltTextPopup = () => {
    this.setState({
      isSrcPopupOpen: false,
      isAltTextPopupOpen: true,
      isToolTipPopupOpen: false
    });
  }

  closeAltTextPopup = () => {
    this.setState({isAltTextPopupOpen: false});
  }

  getUseDataSourcesWithoutFields = (): ImmutableArray<IMUseDataSource> => {
    if(this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId){
      return Immutable([this.props.useDataSources[0].without('fields')]);
    }else{
      return Immutable([]);
    }
  }

  getSrcExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.srcExpression &&
      this.props.config.functionConfig.srcExpression;
    return (expression && expression.asMutable({deep: true})) || null;
  }

  getToolTipExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.toolTipExpression &&
      this.props.config.functionConfig.toolTipExpression;
    return (expression && expression.asMutable({deep: true})) || null;
  }

  getAltTextExpression = (): Expression => {
    const expression = this.props.config && this.props.config.functionConfig && this.props.config.functionConfig.altTextExpression &&
      this.props.config.functionConfig.altTextExpression;
    return (expression && expression.asMutable({deep: true})) || null;
  }

  onToolTipExpChange = (expression: Expression) => {
    if (!expression) {
      return;
    }

    const srcExpression = this.getSrcExpression();
    const altTextExpression = this.getAltTextExpression();
    const mergedUseDataSources = this.mergeUseDataSources(srcExpression, expression, altTextExpression);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'toolTipExpression'], expression).setIn(['functionConfig', 'toolTip'], ''),
      useDataSources: mergedUseDataSources
    });
    this.setState({isToolTipPopupOpen: false});
  }

  onAltTextExpChange = (expression: Expression) => {
    if (!expression) {
      return;
    }

    const srcExpression = this.getSrcExpression();
    const toolTipExpression = this.getToolTipExpression();
    const mergedUseDataSources = this.mergeUseDataSources(srcExpression, toolTipExpression, expression);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'altTextExpression'], expression).setIn(['functionConfig', 'altText'], ''),
      useDataSources: mergedUseDataSources
    });
    this.setState({isAltTextPopupOpen: false});
  }

  onSrcExpChange = (expression: Expression) => {
    if (!expression) {
      return;
    }

    const toolTipExpression = this.getToolTipExpression();
    const altTextExpression = this.getAltTextExpression()
    const mergedUseDataSources = this.mergeUseDataSources(expression, toolTipExpression, altTextExpression);
    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.setIn(['functionConfig', 'srcExpression'], expression).setIn(['functionConfig', 'imageParam'], 
        this.resetImageParam(this.props.config.functionConfig.imageParam)),
      useDataSources: mergedUseDataSources
    });
    this.setState({isSrcPopupOpen: false});
  }

  mergeUseDataSources = (srcExpression: Expression, toolTipExpression: Expression, altTextExpression: Expression): ImmutableArray<IMUseDataSource> => {
    const srcDss = expressionUtils.getUseDataSourceFromExpParts(srcExpression && srcExpression.parts);
    const toolTipDss = expressionUtils.getUseDataSourceFromExpParts(toolTipExpression && toolTipExpression.parts);
    const altTextDss = expressionUtils.getUseDataSourceFromExpParts(altTextExpression && altTextExpression.parts);
    return this.mergeUseDataSourcesByDss(srcDss, toolTipDss, altTextDss);
  }

  mergeUseDataSourcesByDss = (srcDss: ImmutableArray<IMUseDataSource>, toolTipDss: ImmutableArray<IMUseDataSource>, altTextDss: ImmutableArray<IMUseDataSource>): ImmutableArray<IMUseDataSource> => {
    let useDataSourcesWithoutFields = this.getUseDataSourcesWithoutFields();
    let mergedUseDss = expressionUtils.mergeUseDataSources(useDataSourcesWithoutFields, toolTipDss)
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, altTextDss);
    mergedUseDss = expressionUtils.mergeUseDataSources(mergedUseDss, srcDss);
    return mergedUseDss;
  }

  onResourceChange = (imageParam: ImageParam) => {
    let tempImageParam: ImageParam = imageParam;
    if (!tempImageParam) {
      tempImageParam = {};
    }

    let functionConfig = Immutable(this.props.config.functionConfig);
    if (functionConfig.imageParam && functionConfig.imageParam.cropParam) {
      tempImageParam.cropParam = {
        svgViewBox: functionConfig.imageParam.cropParam.svgViewBox,
        svgPath: functionConfig.imageParam.cropParam.svgPath,
        cropShape: functionConfig.imageParam.cropParam.cropShape,
      }
    }
    functionConfig = functionConfig.set('imageParam', tempImageParam);
    functionConfig = functionConfig.set('imgSourceType', '');
    functionConfig = functionConfig.set('srcExpression', null);

    this.props.onSettingChange({
      widgetId: this.props.id,
      config: this.props.config.set('functionConfig', functionConfig)
    });
  }

  resetImageParam = (imageParam: ImmutableObject<ImageParam>) => {
    if (!imageParam || !imageParam.cropParam) {
      return null;
    } else {
      return {
        cropParam: imageParam.cropParam
      }
    }
  }

  render() {
    let dataSourceId = null;
    if (this.props.useDataSources && this.props.useDataSources[0]) {
      dataSourceId = this.props.useDataSources[0].dataSourceId;
    }

    const useDataSources = this.props.useDataSources || [];
    const dataSourceIds: ImmutableArray<string> = useDataSources[0] ? Immutable([useDataSources[0].dataSourceId]) : Immutable([]);
    let fileName = this.props.config.functionConfig.imageParam && this.props.config.functionConfig.imageParam.originalName;

    return <div css={this.getStyle(this.props.theme)} className="jimu-widget">
      <div className="widget-setting-image">
      {
        //this.props.useDataSourcesEnabled ?
        <SettingSection>
          <SettingRow>
            <div className="choose-ds w-100">
              <DataSourceChooser types={this.supportedTypes}
                selectedDataSourceIds={Immutable([dataSourceId])}
                /* onSelect={this.onDataSourceSelected} */ widgetId={this.props.id}
                /* onRemove={this.onDataSourceRemoved} *//>
            </div>
          </SettingRow>
        </SettingSection> //: null
      }
      {!this.props.useDataSourcesEnabled && <SettingSection>
        <SettingRow>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <label className="m-0">{this.props.intl.formatMessage({id: 'source', defaultMessage: defaultMessages.source})}</label>
            <div style={{width: '70px'}} className="uploadFileName" 
              title={fileName ? fileName : this.props.intl.formatMessage({id: 'noneSource', defaultMessage: defaultMessages.noneSource})}>
              {fileName ? fileName : this.props.intl.formatMessage({id: 'noneSource', defaultMessage: defaultMessages.noneSource})}
            </div>
            <div style={{width: '60px'}}><ImageChooser className="text-dark uploadInput-container d-flex justify-content-center set-link-btn" color="secondary"
              widgetId={this.props.id} label={this.props.intl.formatMessage({id: 'set', defaultMessage: defaultMessages.set})} size="sm"
              onChange={this.onResourceChange} imageParam={this.props.config.functionConfig.imageParam}/>
            </div>
          </div>
        </SettingRow>
      </SettingSection>}
      {this.props.useDataSourcesEnabled && <SettingSection>
        <SettingRow>
          <div className="d-flex justify-content-between w-100 align-items-start">
            <label>{this.props.intl.formatMessage({id: 'source', defaultMessage: defaultMessages.source})}</label>
          </div>
        </SettingRow>
        <SettingRow>
          <div className="d-flex justify-content-between w-100 align-items-center">
            <div className="align-items-center d-flex">
              <Input type="radio" onChange={() => this.imgSourceTypeChanged(ImgSourceType.ByUpload)} style={{cursor: 'pointer'}}
                checked={!this.props.config.functionConfig.imgSourceType ||
                this.props.config.functionConfig.imgSourceType === ImgSourceType.ByUpload}/>
              <label className="m-0 ml-2" style={{cursor: 'pointer'}} onClick={() => this.imgSourceTypeChanged(ImgSourceType.ByUpload)}>
                {this.props.intl.formatMessage({id: 'staticSource', defaultMessage: defaultMessages.staticSource})}</label>
            </div>
            <div style={{width: '70px'}} className="uploadFileName" 
              title={fileName ? fileName : this.props.intl.formatMessage({id: 'noneSource', defaultMessage: defaultMessages.noneSource})}>
              {fileName ? fileName : this.props.intl.formatMessage({id: 'noneSource', defaultMessage: defaultMessages.noneSource})}
            </div>
            <div style={{width: '80px', height: '30px'}}>
              {(!this.props.config.functionConfig.imgSourceType || this.props.config.functionConfig.imgSourceType === ImgSourceType.ByUpload) 
                && <ImageChooser className="text-dark uploadInput-container d-flex justify-content-center set-link-btn" color="secondary"
                widgetId={this.props.id} label={this.props.intl.formatMessage({id: 'set', defaultMessage: defaultMessages.set})} size="sm"
                disabled={(this.props.config.functionConfig.imgSourceType === ImgSourceType.ByStaticUrl) ||
                  (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl)} onChange={this.onResourceChange} imageParam={this.props.config.functionConfig.imageParam}/>}
            </div>
          </div>
        </SettingRow>
        <SettingRow>
          <div className="d-flex justify-content-between w-100">
            <div className="align-items-center d-flex">
              <Input type="radio" style={{cursor: 'pointer'}}
                onChange={() => this.imgSourceTypeChanged(this.props.useDataSourcesEnabled ? ImgSourceType.ByDynamicUrl : ImgSourceType.ByStaticUrl)}
                checked={(this.props.config.functionConfig.imgSourceType === ImgSourceType.ByStaticUrl) ||
                (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl)}/>
              <label className="m-0 ml-2" style={{cursor: 'pointer'}} onClick={() => this.imgSourceTypeChanged(this.props.useDataSourcesEnabled 
                ? ImgSourceType.ByDynamicUrl : ImgSourceType.ByStaticUrl)}>
                {this.props.intl.formatMessage({id: 'dynamicSource', defaultMessage: defaultMessages.dynamicSource})}</label>
            </div>
          </div>
          {(this.props.config.functionConfig.imgSourceType === ImgSourceType.ByStaticUrl) || (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl) 
            && <div className="d-flex justify-content-between w-100 pt-2">
            <div></div>
            {this.props.config.functionConfig.srcExpression || (this.props.config.functionConfig.imgSourceType === ImgSourceType.ByDynamicUrl) ?
                <div style={{width: '90%', position: 'relative'}}>
                  <ExpressionInput dataSourceIds={dataSourceIds} onChange={this.onSrcExpChange} openExpPopup={this.openSrcPopup}
                    expression={this.getSrcExpression()} isExpPopupOpen={this.state.isSrcPopupOpen} closeExpPopup={this.closeSrcPopup}
                    from={[ExpressionInputFrom.Attribute, ExpressionInputFrom.Statistics, ExpressionInputFrom.Expression]}
                  />
                </div> :
                <div style={{width: '90%', position: 'relative'}}>
                <div className="w-100 h-100" style={{position: 'absolute', opacity: 0.5, backgroundColor: 'gray', zIndex: 100}}></div>
                <ExpressionInput dataSourceIds={dataSourceIds} onChange={this.onSrcExpChange} openExpPopup={this.openSrcPopup}
                  expression={this.getSrcExpression()} isExpPopupOpen={this.state.isSrcPopupOpen} closeExpPopup={this.closeSrcPopup}
                  from={[ExpressionInputFrom.Attribute, ExpressionInputFrom.Statistics, ExpressionInputFrom.Expression]}
                />
              </div>}
          </div>}
        </SettingRow>
      </SettingSection>}
      <SettingSection>
        <SettingRow label={this.props.intl.formatMessage({id: 'toolTip', defaultMessage: defaultMessages.toolTip})}>
          {
            this.props.useDataSourcesEnabled ?
              <div style={{width: '70%', position: 'relative'}}>
                <ExpressionInput dataSourceIds={dataSourceIds} onChange={this.onToolTipExpChange} openExpPopup={this.openToolTipPopup}
                  expression={this.getToolTipExpression()} isExpPopupOpen={this.state.isToolTipPopupOpen} closeExpPopup={this.closeToolTipPopup}
                  from={[ExpressionInputFrom.Static, ExpressionInputFrom.Attribute, ExpressionInputFrom.Statistics, ExpressionInputFrom.Expression]}
                />
              </div> :
              <div style={{width: '70%', position: 'relative'}}>
                <Input style={{width: '100%'}} className="float-right" value={this.state.currentTipInput}
                  onChange={(event) => { this.setState({currentTipInput: event.target.value}); }} 
                  onBlur={() => {this.toolTipConfigChange()}}
                  onKeyUp={() => {this.toolTipConfigChange()}}>
                </Input>
              </div>
          }
        </SettingRow>
        <SettingRow label={this.props.intl.formatMessage({id: 'altText', defaultMessage: defaultMessages.altText})}>
        {
          this.props.useDataSourcesEnabled ?
            <div style={{width: '70%', position: 'relative'}}>
              <ExpressionInput dataSourceIds={dataSourceIds} onChange={this.onAltTextExpChange} openExpPopup={this.openAltTextPopup}
                expression={this.getAltTextExpression()} isExpPopupOpen={this.state.isAltTextPopupOpen} closeExpPopup={this.closeAltTextPopup}
                from={[ExpressionInputFrom.Static, ExpressionInputFrom.Attribute, ExpressionInputFrom.Statistics, ExpressionInputFrom.Expression]}
              />
            </div> :
            <div style={{width: '70%', position: 'relative'}}>
              <Input style={{width: '100%'}} className="float-right" value={this.state.currentAltTextInput}
                onChange={(event) => { this.setState({ currentAltTextInput: event.target.value}); }} 
                onBlur={() => {this.altTextConfigChange()}}
                onKeyUp={() => {this.altTextConfigChange()}}>
              </Input>
            </div>
        }
        </SettingRow>
        <SettingRow>
          <Button className="w-100 text-dark" color="primary"
            onClick={() => { this.setState({ isShowLinkSetting: !this.state.isShowLinkSetting}); }}>
            <Icon icon={IconRefesh} className="mr-3"/>Set link
          </Button>
        </SettingRow>
      </SettingSection>
      <SettingSection title={this.props.intl.formatMessage({id: 'frame', defaultMessage: defaultMessages.frame})}>
        <SettingRow>
          {Object.keys(this.props.preDefinedConfigs.shapes).map((key, index) => {
            let shapeThumb = this.props.preDefinedConfigs.shapes[key].thumbUrl;

            return <Col xs="2" key={index} className="pl-0 pr-2 mr-1">
              <div className={classnames('border',
                {'border-selected setting-stylepicker-selected': (!this.props.config.styleConfig.shape && key === 'square') || (this.props.config.styleConfig.shape
                && this.props.config.styleConfig.shape === key)})} 
                style={{position: 'relative', paddingBottom: '95%', 
                  cursor: 'pointer', height: '30px', width: '30px'}} 
                onClick={() => this.shapeChange(key)}>
                <div className="w-100 h-100 p-1"
                  style={{position: 'absolute'}}>
                  <div className="w-100 h-100" 
                    style={{backgroundImage: `url(${shapeThumb})`, 
                      backgroundSize: '100% 100%', backgroundPosition: 'center center'}}>
                  </div>
                </div>
              </div>
            </Col>
          })}
        </SettingRow>
        <SettingRow label={this.props.intl.formatMessage({id: 'background', defaultMessage: defaultMessages.background})}>
          <ColorChooser className="d-flex" style={{
            width: '40px', height: '20px'}} color={this.props.config.styleConfig.backgroundColor} 
            onChange={(color) => {this.updateStyle('backgroundColor', color)}}/>
        </SettingRow>
        <SettingRow label={this.props.intl.formatMessage({id: 'border', defaultMessage: defaultMessages.border})}>
          <BorderSetting value={this.props.config.styleConfig.border} 
            onChange={(board) => {this.updateStyle('border', board)}}>
          </BorderSetting>
        </SettingRow>
        <SettingRow label={this.props.intl.formatMessage({id: 'corner', defaultMessage: defaultMessages.corner})}>
          <FourSides sides={[BorderSides.TL, BorderSides.TR, BorderSides.BR, BorderSides.BL]} 
            value={this.props.config.styleConfig.borderRadius} 
            onChange={(borderRadius) => this.updateStyle('borderRadius', borderRadius)}>
          </FourSides>
        </SettingRow>
        <SettingRow label={this.props.intl.formatMessage({id: 'shadow', defaultMessage: defaultMessages.shadow})}>
          <Switch checked={this.state.shadowOpen}
          onChange={() => { this.setState({
            shadowOpen: !this.state.shadowOpen
          }) }}
          ></Switch>
        </SettingRow>
        <Collapse isOpen={this.state.shadowOpen}>
          <BoxShadowSetting value={this.props.config.styleConfig.boxShadow} 
            onChange={(boxShadow) => this.updateStyle('boxShadow', boxShadow)}>
          </BoxShadowSetting>
        </Collapse>
      </SettingSection>
      {this.state.isShowLinkSetting && !urlUtils.getAppIdPageIdFromUrl().pageId 
        && <LinkSettingPopup showDialog={this.state.isShowLinkSetting}
          onSettingCancel={() => {this.setState({ isShowLinkSetting: false}); }}
          onSettingConfirm={this.settingLinkConfirm}
          linkParam={this.props.config.functionConfig.linkParam}>
        </LinkSettingPopup>}
      </div>
    </div>
  }
}