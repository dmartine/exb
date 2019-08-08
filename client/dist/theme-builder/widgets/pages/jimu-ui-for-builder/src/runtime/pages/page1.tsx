import { IMDataSourceJson, React } from 'jimu-core';
import { ExternalDataSourceChooser, ItemChooser} from 'jimu-for-builder';
import { ItemTypes } from 'jimu-for-builder/lib/components/item-chooser';

import { IItem } from '@esri/arcgis-rest-types';

interface State{
  webMap: IItem;

  dataSourceJsons: IMDataSourceJson[];
}
export class Page1 extends React.PureComponent<{}, State> {
  portalUrl: string = 'https://www.arcgis.com';

  constructor(props){
    super(props);
    this.state = {
      webMap: null,
      dataSourceJsons: []
    }
  }

  render() {
    return (
      <div>
        <h2>WebMap Chooser</h2>
        <h5>Selected web map: {this.state.webMap && this.state.webMap.id}</h5>
        <ItemChooser portalUrl={this.portalUrl} onSelect={(allItmems, item) => this.setState({webMap: item})} itemType={ItemTypes.WebMap} selectedItems={[this.state.webMap]}/>
        <hr/>


        <h2>External Datasource Chooser</h2>
        <h5>Selected data source: {JSON.stringify(this.state.dataSourceJsons)}</h5>
        <ExternalDataSourceChooser portalUrl={this.portalUrl} onFinish={dsJsons => this.setState({dataSourceJsons: dsJsons})}
          onCancel={() => {}}></ExternalDataSourceChooser>
      </div>
    )
  }
}