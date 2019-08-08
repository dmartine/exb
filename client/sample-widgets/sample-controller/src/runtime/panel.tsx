import {React, WidgetManager} from 'jimu-core';

interface Props{
  widgetId: string;
  label: string;
}

export default class Panel extends React.PureComponent<Props>{

  closeWidget = () => {
    WidgetManager.getInstance().closeWidget(this.props.widgetId);
  }

  render(){
    return <div className="demo-panel">
      <div className="title">
        <span>{this.props.label}</span>
        <button onClick={this.closeWidget}>X</button>
      </div>
      <div className="content">{this.props.children}</div>
    </div>
  }
}