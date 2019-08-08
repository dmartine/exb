/** @jsx jsx */
import { BaseWidget, appActions, css, jsx, getAppStore, AllWidgetProps, SessionManager } from 'jimu-core';
import { IMConfig } from '../config';
import { WidgetPlaceholder } from 'jimu-ui';
import MultiSourceMap from './components/multisourcemap';
import { IFeature } from '@esri/arcgis-rest-types';

let IconMap = require('./assets/icon.svg');

export interface ActionRelatedProps {
  zoomToFeatureActionValue?: {
    value: __esri.FeatureSet | __esri.Graphic[] | IFeature[] | __esri.Extent | __esri.Geometry[],
    relatedWidgets?: string[];
  };
  newFeatureSetActionValue?: {
    value: {[layerID: string]: __esri.FeatureSet},
    promise?: Promise<any>
  };
  changedFeatureSetActionValue?: {[layerID: string]: __esri.FeatureSet};
  selectFeatureActionValue?: IFeature[] | __esri.Graphic[];
  panToActionValue?: {
    value: __esri.FeatureSet | __esri.Graphic[] | IFeature[] | __esri.Extent,
    relatedWidgets?: string[];
  };
  flashActionValue?: {
    layerId: string,
    querySQL: string
  }
}

export interface MapWidgetProps extends AllWidgetProps<IMConfig>{
  mutableStateProps: ActionRelatedProps
}

interface State{
  startLoadModules: boolean;
}

export default class Widget extends BaseWidget<MapWidgetProps, State>{
  constructor(props) {
    super(props);
    this.state = {} as State;
  }

  getStyle() {
    let theme = this.props.theme;

    return css`
      .widget-map{
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        .overview-container{
          position: absolute;
          top: 12px;
          right: 12px;
          width: 300px;
          height: 200px;
          border: 1px solid black;
          z-index: 1;
        }
      
        .extent-container{
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          z-index: 2;
        }
      
        .extent-btn-container{
          button{
            outline: none;
          }
          .previous-extent-btn{
            color: #111;
          }
          .next-extent-btn{
            color: #222;
          }
        }
      }
      
      .mapswitch-container {
        position: absolute;
        z-index: 7;
        width: 32px;
        height: 32px;
        bottom: 10px;
        right: 10px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3)
      }

      .mapswitch-icon {
        fill: black;
        left: 8px;
        top: 8px;
        position: absolute;
        display: block;
      }

      .widget-map-background {
        background-color: ${theme.colors.white};
        position: absolute;
        z-index: 1;
      }

      @keyframes appear {
        0%{opacity:0}
        25%{opacity:.25}
        50%{opacity:.5;}
        75%{opacity:.75}
        100%{opacity:1;}
      }

      @keyframes disappear {
        0%{opacity:1}
        25%{opacity:.75}
        50%{opacity:.5;}
        75%{opacity:.25}
        100%{opacity:0;}
      }

      .multisourcemap-item-appear {
        animation: appear 300ms;
        -webkit-animation: appear 300ms;
        -moz-animation: appear 300ms;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
      }

      .multisourcemap-item-disappear {
        animation: disappear 300ms;
        -webkit-animation: disappear 300ms;
        -moz-animation: disappear 300ms;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        animation-timing-function: ease-in;
        -webkit-animation-timing-function: ease-in;
        -moz-animation-timing-function: ease-in;
      }

      .multisourcemap-item-appear-noanimate {
        opacity: 1;
      }

      .multisourcemap-item-disappear-noanimate {
        opacity: 0;
      }
      `;
  }

  startRenderMap = () => {
    this.setState({
      startLoadModules: true
    })

    this.props.dispatch(appActions.setWidgetReadyInjectDataSource(this.props.id));
  }

  componentDidMount(){
    if(!this.state.startLoadModules){
      if(window.jimuConfig.isInBuilder || !this.props.config.canPlaceHolder){
        this.startRenderMap();
      }
      return;
    }
  }

  componentWillUnmount() {
    let widgets =  getAppStore().getState().appConfig.widgets;
    if (!widgets[this.props.id]) {
      this.props.dispatch(appActions.widgetMutableStatePropChange(this.props.id, 'restoreData', null));
    }
  }

  getPlaceHolderImage = () => {
    let placeHolderImage = this.props.config.placeholderImage;
    if (placeHolderImage) {
      let isPortalThumbExp = new RegExp('^(.)+/sharing/rest/content/items/(.)+/info/(.)+');

      if (isPortalThumbExp.test(placeHolderImage)) {
        if(SessionManager.getInstance().getSession()){
          placeHolderImage = placeHolderImage + `?token=${SessionManager.getInstance().getSession().token}`
        }else{
          placeHolderImage = placeHolderImage
        }
      }
    }

    return placeHolderImage;
  }

  render() {
    if (!(this.props.useDataSources && this.props.useDataSources[0] && this.props.useDataSources[0].dataSourceId)) {
      return <div css={this.getStyle()} className="jimu-widget">
        <WidgetPlaceholder icon={IconMap} message="Map" widgetId={this.props.id}/>
        </div>;
    } else if (!this.state.startLoadModules) {
      return <div css={this.getStyle()} className="jimu-widget">
        <div className="widget-map jimu-widget">
          <div className="jimu-widget" style={{position: 'absolute', cursor: 'pointer', 
            backgroundImage: `url(${this.getPlaceHolderImage()})`, backgroundSize: 'cover'}} 
            onClick={this.startRenderMap}>
          </div>
        </div>
      </div>;
    } else {
      return <div css={this.getStyle()} className="jimu-widget">
        {<MultiSourceMap baseWidgetProps={this.props} startLoadModules={this.state.startLoadModules}></MultiSourceMap>}
      </div>;
    }
  }
}
