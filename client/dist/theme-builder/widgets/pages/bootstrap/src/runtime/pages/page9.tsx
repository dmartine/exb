import { React } from 'jimu-core';
import { Progress } from 'jimu-ui';

export class Page9 extends React.PureComponent {
  render() {
    return (
      <div>
        <h2 className="mb-5">Progress: </h2>
        {/* LIST GROUP: START */}
        <div>
          <Progress className="mb-3" value="10" />
          <Progress className="mb-3" color="success" value="25" />
          <Progress className="mb-3" color="info" value="50" />
          <Progress striped className="mb-3" color="warning" value="75" />
          <Progress animated className="mb-3" color="danger" value="100" />
        </div>
        {/* LIST GROUP: END */}
      </div>
    )
  }
}