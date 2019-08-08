import {BaseWidget, React, AllWidgetProps, MessageManager, StringSelectionChangeMessage} from 'jimu-core';

export default class Widget extends BaseWidget<AllWidgetProps<{}>, any>{

  constructor(props){
    super(props);
  }

  onStateChange = (evt: React.FormEvent<HTMLSelectElement>) => {
    MessageManager.getInstance().publishMessage(new StringSelectionChangeMessage(this.props.id, evt.currentTarget.value));
  };

  render(){
    return <div className="widget-pub">
      <h5>This widget will publish <b>STRING_SELECTION_CHANGE</b> message</h5>
      
      <label>State:</label>
      <select onChange={this.onStateChange}>
        <option value="California">California</option>
        <option value="Colorado">Colorado</option>
      </select>
    </div>;
  }
}
