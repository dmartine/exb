import {React, IMWidgetJson, DataSource, InjectedIntl, ImmutableObject} from 'jimu-core';

import {getDsUsedWidgets, getSortedArrayByLabel} from '../utils';

import defaultMessages from '../translations/default';

//const IconClose = require('jimu-ui/lib/icons/close.svg');

interface Props{
  ds: DataSource | null;
  isDataSourceInited: boolean;
  widgets: ImmutableObject<{ [widgetId: string]: IMWidgetJson }>;
  intl: InjectedIntl;
}

interface State{

}

export default class extends React.PureComponent<Props, State>{

  constructor(props){
    super(props);
    this.state = {

    };
  }

  Item = ({widgetJson}: {widgetJson: IMWidgetJson}) => {
    return (
      <div className="container-fluid field-item mb-3" key={widgetJson.id}>
        <div className="row align-items-center no-gutters d-flex field-name">
          <div className="col-1 flex-shrink-0 widget-icon"><img src={widgetJson.icon} /></div>
          <div className="col-11">{widgetJson.label}</div>
          {/* <div className="col-1"><div className="text-right mw-50"><Icon icon={IconClose} /></div></div> */}
        </div>
      </div>
    );
  }

  render(){
    if(!this.props.ds){
      return <div className="m-2">
        {this.props.intl.formatMessage({id: 'noSupportedDataSource', defaultMessage: defaultMessages.noSupportedDataSource})}
      </div>;
    }
    const relatedWidgetJsons = getDsUsedWidgets(this.props.ds.id, this.props.widgets);
    if(!relatedWidgetJsons || (relatedWidgetJsons && relatedWidgetJsons.length === 0)){
      return <div className="m-2">{this.props.intl.formatMessage({id: 'noRelatedWidget', defaultMessage: defaultMessages.noRelatedWidget})}</div>;
    }

    const Item = this.Item;
    return (
      <>
        <h5 className="m-2 in-use-related-widgets">
          {this.props.intl.formatMessage({id: 'relatedWidgets', defaultMessage: defaultMessages.relatedWidgets})}
        </h5>
        {
          getSortedArrayByLabel(relatedWidgetJsons).map(w => <Item widgetJson={w} key={w.id}/>)
        }
      </>
    );
  }
}
