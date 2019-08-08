import {React, InjectedIntl} from 'jimu-core';
import {IItem} from '@esri/arcgis-rest-types';
import DetailViewItem from './app-list-detailview-item';

interface Props{
  apps: IItem[];
  switchListView: any;
  folderUrl: string;
  portalUrl: string;
  intl?: InjectedIntl;
}

export default class Widget extends React.PureComponent<Props, {}>{

  constructor(props) {
    super(props);
  }

  getViewContent() {
    let appLength = this.props.apps.length;
    if (appLength < 1) {
      return null;
    } else {
      return <div className="app-list-detailview-content">
        {this.props.apps.map((item, index) =>
          <DetailViewItem portalUrl={this.props.portalUrl} intl={this.props.intl} key={index}
          folderUrl={this.props.folderUrl} appItem={item} itemIdx={index}></DetailViewItem>
        )}
      </div>;
    }
  }

  render() {
    let viewContent = this.getViewContent();
    return <div className="app-list-detailview">
        {viewContent}
    </div>;
  }
}