import {React, InjectedIntl} from 'jimu-core';
import {IItem} from '@esri/arcgis-rest-types';
import {Container} from 'jimu-ui';
import ListViewItem from './app-list-listview-item';

interface Props{
  apps: IItem[];
  switchListView: any;
  folderUrl: string;
  portalUrl: string;
  intl?: InjectedIntl;
}

interface State{
  tooltipOpen: boolean;
}

export default class Widget extends React.PureComponent<Props, State>{

  constructor(props) {
    super(props);
    this.state = {
      tooltipOpen: false
    }
  }

  getViewContent() {
    let appLength = this.props.apps.length;
    if (appLength < 1) {
      return null;
    } else {
      let itemArr = null;
      let viewContent = null;
      itemArr = this.props.apps.map((appItem, idx) => 
        <ListViewItem portalUrl={this.props.portalUrl} folderUrl={this.props.folderUrl} key={idx} 
          itemIdx={idx} appItem={appItem} intl={this.props.intl}>
        </ListViewItem>);
      viewContent = <Container className="app-list-listview-container" style={{maxWidth: '100%'}}>
        {itemArr}
      </Container>;
      return viewContent;
    }
  }

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    let viewContent = this.getViewContent();
    return <div className="app-list-listview w-100">
      {viewContent}
    </div>;
  }
}