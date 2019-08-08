/** @jsx jsx */
import {BaseWidget, jsx, css, WidgetState, ReactDOM, WidgetManager} from 'jimu-core';
import {AllWidgetProps} from 'jimu-core';
import Panel from './panel';

export default class Widget extends BaseWidget<AllWidgetProps<{}>, any>{
  wm: WidgetManager;

  constructor(props){
    super(props);
    this.wm = WidgetManager.getInstance();
    this.state = {
    };
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  toggleWidgetState = (widgetId: string) => {
    if(!this.props.widgetsRuntimeInfo[widgetId]){
      this.wm.loadWidgetClass(widgetId);
    }
    if(this.props.widgetsRuntimeInfo[widgetId] && this.props.widgetsRuntimeInfo[widgetId].state === WidgetState.Opened){
      this.wm.closeWidget(widgetId);
    }else{
      this.wm.openWidget(widgetId);
    }
  }

  renderWidgets(){
    let runInfo = this.props.widgetsRuntimeInfo;
    let openWidgetIds = Object.keys(runInfo).filter(wId =>
      runInfo[wId] && (runInfo[wId].state === WidgetState.Opened || runInfo[wId].state === WidgetState.Active ));
    return ReactDOM.createPortal(<div className="widget-container" css={this.getWidgetContainerStyle()}>{openWidgetIds.map(wId => this.renderWidget(wId))}</div>, document.getElementById('app'));
  }

  renderWidget(widgetId: string){
    let widgetContent;

    if(this.props.widgetsRuntimeInfo[widgetId].isClassLoaded){
      let Widget = this.wm.getWidgetClass(widgetId);
      widgetContent = <Widget/>
    }else{
      widgetContent = <div>Loading...</div>;
    }
    return <Panel key={widgetId} label={this.props.widgetsJson[widgetId].label} widgetId={widgetId}>
      {widgetContent}
    </Panel>
  }

  getStyle(){
    return css`
      .controller-bar{
        display: flex;
        background-color: #ccc;

        .widget-icon{
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-left: 10px;
          background-color: #aaa;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
      }
    `;
  }

  getWidgetContainerStyle(){
    return css`
      position: absolute;
      left: 0;
      top: 0;

      .demo-panel{
        background-color: #eee;

        .title{
          background-color: #bbb;
          display: flex;
          justify-content: space-between;
        }
      }
    `;
  }

  render(){
    return <div className="demo-controller" css={this.getStyle()}>
      <div className="controller-bar">
        {this.props.widgets.map(wId => {
          let widgetJson = this.props.widgetsJson[wId];
          return <div onClick={() => this.toggleWidgetState(widgetJson.id)} key={widgetJson.id} className="widget-icon">{widgetJson.id}</div>
        })}
      </div>
      {!window.isNode && this.renderWidgets()}
    </div>;
  }
}
