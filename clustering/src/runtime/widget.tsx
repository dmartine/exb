/** @jsx jsx */
import {React, AllWidgetProps, jsx } from 'jimu-core';
import {JimuMapViewComponent, JimuMapView} from "jimu-arcgis";
import {Label, Checkbox, WidgetPlaceholder} from 'jimu-ui';
import { IMConfig } from "../config";

interface State {
 jimuMapView: JimuMapView;
 clusterLayer: string;
 clusterStatus: boolean;
 errorTip: boolean;
}

export default class Widget extends React.PureComponent<AllWidgetProps<IMConfig>, State> {

 constructor(props){
   super(props);
 
   this.state = {
     jimuMapView: undefined, 
     clusterLayer: undefined,
     clusterStatus: false,
     errorTip: true
     };
 } 

 clusterConfig = {
  type: "cluster",
  clusterRadius: "100px",
  popupTemplate: {
    content: "This cluster represents <b>{cluster_count}</b> points.",
    fieldInfos: [{
      fieldName: "cluster_count",
      format: {
        digitSeparator: true,
        places: 0
      }
    }]
  },
    clusterMinSize: "24px",
    clusterMaxSize: "60px",
          labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')"
            },
         
            labelPlacement: "center-center",
          }]

}

 onCheckBoxChange = (e) => {
  const valueState = e.target.value
   this.setState({ 
    clusterStatus: valueState 
    },  () => {
      this.clusterSwitch(this.state.clusterStatus);
      })
}

clusterSwitch = (e) => {
  if (this.state.clusterStatus){ 
       this.state.jimuMapView.jimuLayerViews[this.state.clusterLayer].layer.featureReduction = this.clusterConfig
    } 
    if (!this.state.clusterStatus)
   
      this.state.jimuMapView.jimuLayerViews[this.state.clusterLayer].layer.featureReduction = this.state.clusterStatus ? this.clusterConfig : null

}

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (jmv) {
    const jimuLayerViews = jmv.jimuLayerViews;
    const jimuLayerViewIds = Object.keys(jimuLayerViews)[0];
    const layerViewId = jimuLayerViewIds;
 
      if (layerViewId === undefined) {
        jmv = null;
        return
      }

     if (this.state.clusterStatus){
      jmv.jimuLayerViews[layerViewId].layer.featureReduction = this.clusterConfig
         
     }
     this.setState({
       jimuMapView: jmv,
       clusterLayer: jimuLayerViewIds,
       errorTip: false
      })
   }
 } 

renderWidgetPlaceholder() {
  return <WidgetPlaceholder icon={require('./assets/cluster.svg')} widgetId={this.props.id} message={'Please select a web map with a feature layer to enable point clustering.'} />;
}
 render() {
  const mapContent = <JimuMapViewComponent useMapWidgetId={this.props.useMapWidgetIds?.[0]} onActiveViewChange={this.activeViewChangeHandler} />
  let clusterContent = null;
  if (this.state.errorTip){
    clusterContent = this.renderWidgetPlaceholder();
  } else {
    clusterContent = 
    <Label style={{ cursor: "pointer"}} >
        <Checkbox  checked={this.state.clusterStatus} disabled={this.props.config.checkboxStatus} onChange={(e) => {this.onCheckBoxChange({
					target: {
					  	value: e.target.checked,
						},
					}); 
					}}
				/> Cluster points </Label>
  }
  return <div style={{height:'100%'}} className="cluster-map">
      {clusterContent}
      <div>{mapContent}</div>
    </div>
 }
}
