import {React, BaseWidget, AllWidgetProps, RepeatedDataSource} from 'jimu-core';

export default class Widget extends BaseWidget<AllWidgetProps<{}>>{
  render(){
    let {repeatedDataSource: contextDataSource} = this.props;

    let renderNode = (cds: RepeatedDataSource) => <div key={cds.dataSourceId}>
      <div>dataSourceId: {cds.dataSourceId}</div>
      <div>recordIndex: {cds.recordIndex}</div>
      <div>record: {JSON.stringify(cds.record.getData())}</div>
      <br/>
    </div>;

    let node;

    if(contextDataSource){
      if(Array.isArray(contextDataSource)){
        node = contextDataSource.map(cds => renderNode(cds));
      }else{
        node = renderNode(contextDataSource);
      }
    }else{
      node = 'no context data';
    }
    return <div>
      {node}
    </div>;
  }
}
