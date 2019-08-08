import { React } from 'jimu-core';
import { Button } from 'jimu-ui';
import {
  BSCard as Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle
} from 'jimu-ui';

export class Page6 extends React.PureComponent<{}, any> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Cards: </h2>
        {/* CARDS: START */}
        <div className="container mb-3">
          <div className="row">
            <div className="col-sm">
              <Card>
                <CardImg top width="100%" src="https://via.placeholder.com/300x180/EDF0F4/6B7E8F" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card"s content.</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-sm">
              <Card>
                <CardImg top width="100%" src="https://via.placeholder.com/300x180/EDF0F4/6B7E8F" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card"s content.</CardText>
                  <Button color="primary" className="w-100">Button</Button>
                </CardBody>
              </Card>
            </div>
            <div className="col-sm">
              <Card>
                <CardImg top width="100%" src="https://via.placeholder.com/300x180/EDF0F4/6B7E8F" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardText>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </CardText>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card"s content.</CardText>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
        {/* CARDS: END */}
      </div>
    )
  }
}