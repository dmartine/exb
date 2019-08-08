import {React, DataSource} from 'jimu-core';

interface Props{
  history: DataSource[];
}

interface State{
}

export default class MappingBreadcrumbs extends React.PureComponent<Props, State>{

  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.history){
      return null;
    }

    return (
      <div className="mapping-breadcrumbs">
        {
          this.props.history.map((ds, i) => <div key={i}>{ds.label} -> </div>)
        }
      </div>
    )
  }
}
