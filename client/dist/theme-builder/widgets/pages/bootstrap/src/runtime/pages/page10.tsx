import { React } from 'jimu-core';
import { Table, ButtonGroup, Button, Switch } from 'jimu-ui';

type tableSizes = '' | 'sm';
interface pageStates {
  tableSize: tableSizes;
  tableHover: boolean;
  tableBordered: boolean;
}

export class Page10 extends React.PureComponent<{}, pageStates> {
  constructor(props) {
    super(props);

    this.state = {
      tableSize: '',
      tableHover: false,
      tableBordered: true
    };
  }

  render() {
    return (
      <div>
        <h2>Table
          <span className="float-right d-flex align-items-center">
            <small className="h5 text-sm font-weight-normal text-muted m-0 mr-1 ml-3">size:</small>
            <ButtonGroup size="sm" onClick={e => {
              let targetButton = e.target as HTMLButtonElement;
              this.setState({ tableSize: targetButton.value as tableSizes })
            }}>
              <Button value="" outline active={this.state.tableSize === ''}>default</Button>
              <Button value="sm" outline active={this.state.tableSize === 'sm'}>small</Button>
            </ButtonGroup>
            <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">bordered:</small>
            <Switch checked={this.state.tableBordered} onChange={evt => {
              this.setState({ tableBordered: evt.target.checked })
            }}/>
            <small className="h5 font-weight-normal text-muted m-0 mr-1 ml-3">hover:</small>
            <Switch checked={this.state.tableHover} onChange={evt => {
              this.setState({ tableHover: evt.target.checked })
            }}/>
          </span>
        </h2>
        {/* TABLE: START */}
        <h4 className="mt-5 mb-3">Default:</h4>
        <Table bordered={this.state.tableBordered} size={this.state.tableSize} hover={this.state.tableHover}>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
        {/* TABLE: END */}
      </div>
    )
  }
}