import { React } from 'jimu-core';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'jimu-ui';

export class Page8 extends React.PureComponent<{}, any> {
  render() {
    return (
      <div>
        <h2>List Group: </h2>
        {/* LIST GROUP: START */}
        <h4 className="mt-5 mb-3">Default:</h4>
        <ListGroup>
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <br/>
        <h4 className="mt-5 mb-3">As Buttons (or Anchors):</h4>
        <ListGroup>
          <ListGroupItem active tag="button" action>Active: Cras justo odio</ListGroupItem>
          <ListGroupItem tag="button" action>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem tag="button" action>Morbi leo risus</ListGroupItem>
          <ListGroupItem tag="button" action>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem disabled tag="button" action>Disabled: Vestibulum at eros</ListGroupItem>
        </ListGroup>
        <br/>
        <h4 className="mt-5 mb-3">Custom Content:</h4>
        <ListGroup>
          <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
            <ListGroupItemText>
            Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        {/* LIST GROUP: END */}
      </div>
    )
  }
}