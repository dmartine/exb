/** @jsx jsx */
import { AllWidgetProps, BaseWidget, jsx, React } from "jimu-core";
import { IMConfig } from "../config";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import Editor = require('esri/widgets/Editor');

interface State {
  jimuMapView: JimuMapView;
  currentWidget: Editor;
}

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, State>{


  private myRef = React.createRef<HTMLDivElement>();

  constructor(props) {
    super(props);
    this.state = {
      jimuMapView: null,
      currentWidget: null
    };
  }

  activeViewChangeHandler = (jmv: JimuMapView) => {
    if (this.state.jimuMapView) {
       if (this.state.currentWidget) {
        this.state.currentWidget.destroy();
      }
    }

    if (jmv) {
      this.setState({
        jimuMapView: jmv
      });

      if(this.myRef.current) {
        const container = document.createElement("div");
        this.myRef.current.appendChild(container);
  
        const newEditor = new Editor({
          view: jmv.view,
          container: container
        });
    
        this.setState({
          currentWidget: newEditor
        });
      } else {
        console.error('could not find this.myRef.current');
      }
    }
  };

  componentDidUpdate = evt => {
    if (this.props.useMapWidgetIds.length === 0) {
         if (this.state.currentWidget) {
        this.state.currentWidget.destroy();
      }
    }
  };

  render() {
      let mvc = <p>Please select a map.</p>;
    if (
      this.props.hasOwnProperty("useMapWidgetIds") &&
      this.props.useMapWidgetIds &&
      this.props.useMapWidgetIds.length === 1
    ) {
      mvc = (
        <JimuMapViewComponent
          useMapWidgetIds={this.props.useMapWidgetIds}
          onActiveViewChange={this.activeViewChangeHandler}
        />
      );
    }

    return (
      <div
        className="widget-js-api-editor"
        style={{ overflow: "auto" }}
      >
        <div className="here" ref={this.myRef}></div>
        {mvc}
      </div>
    );
  }
}
