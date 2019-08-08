/** @jsx jsx */
import { React, jsx } from 'jimu-core';
import { Alert, Badge, Button } from 'jimu-ui';

export class Page1 extends React.PureComponent<{}, any> {
  render() {
    return (
      <div>
        <h2 className="mb-3">Typography (non-components):</h2>
        {/* HEADINGS: START */}
        <h6 className="mt-5 mb-3">Headings:</h6>
        <div className="mb-3">
          <h1>h1. Bootstrap heading</h1>
          <h2>h2. Bootstrap heading</h2>
          <h3>h3. Bootstrap heading</h3>
          <h4>h4. Bootstrap heading</h4>
          <h5>h5. Bootstrap heading</h5>
          <h6>h6. Bootstrap heading</h6>
        </div>
        {/* HEADINGS: END */}
        {/* INLINE TEXT ELEMENTS: START */}
        <h6 className="mt-5 mb-3">Inline Text Elements:</h6>
        <div className="mb-3">
          <p>You can use the mark tag to <mark>highlight</mark> text.</p>
          <p><del>This line of text is meant to be treated as deleted text.</del></p>
          <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
          <p><ins>This line of text is meant to be treated as an addition to the document.</ins></p>
          <p><u>This line of text will render as underlined</u></p>
          <p><small>This line of text is meant to be treated as fine print.</small></p>
          <p><strong>This line rendered as bold text.</strong></p>
          <p><em>This line rendered as italicized text.</em></p>
        </div>
        {/* INLINE TEXT ELEMENTS: END */}
        <hr/>
        {/* ALERTS: START */}
        <h2 className="mb-3">Alerts:</h2>
        <div className="mb-3">
          <Alert color="primary" toggle={ () => {} }>
            This is a primary alert, and it has a close button
          </Alert>
          <Alert color="secondary">
            This is a secondary alert, and it has a <a>link</a>
          </Alert>
          <Alert color="success">
            This is a success alert
          </Alert>
          <Alert color="danger">
            This is a danger alert
          </Alert>
          <Alert color="warning">
            This is a warning alert
          </Alert>
          <Alert color="info">
            This is a info alert
          </Alert>
          <Alert color="light">
            This is a light alert
          </Alert>
          <Alert color="dark">
            This is a dark alert
          </Alert>
        </div>
        {/* ALERTS: END */}
        <hr/>
        {/* BADGES: START */}
        <h2 className="mb-3">Badges:</h2>
        <h4 className="mt-5 mb-3">Defaults:</h4>
        <div className="mb-3">
          <Badge className="mr-2" color="primary">Primary</Badge>
          <Badge className="mr-2" color="secondary">Secondary</Badge>
          <Badge className="mr-2" color="success">Success</Badge>
          <Badge className="mr-2" color="danger">Danger</Badge>
          <Badge className="mr-2" color="warning">Warning</Badge>
          <Badge className="mr-2" color="info">Info</Badge>
          <Badge className="mr-2" color="light">Light</Badge>
          <Badge className="mr-2" color="dark">Dark</Badge>
        </div>
        <h4 className="mt-5 mb-3">Pills:</h4>
        <div className="mb-3">
          <Badge pill className="mr-2" color="primary">Primary</Badge>
          <Badge pill className="mr-2" color="secondary">Secondary</Badge>
          <Badge pill className="mr-2" color="success">Success</Badge>
          <Badge pill className="mr-2" color="danger">Danger</Badge>
          <Badge pill className="mr-2" color="warning">Warning</Badge>
          <Badge pill className="mr-2" color="info">Info</Badge>
          <Badge pill className="mr-2" color="light">Light</Badge>
          <Badge pill className="mr-2" color="dark">Dark</Badge>
        </div>
        <h4 className="mt-5 mb-3">Scale to Parents:</h4>
        <div className="mb-3">
          <h1>H1 Heading <Badge pill color="primary">New</Badge></h1>
          <h2>H2 Heading <Badge pill color="primary">New</Badge></h2>
          <h3>H3 Heading <Badge pill color="primary">New</Badge></h3>
          <h4>H4 Heading <Badge pill color="primary">New</Badge></h4>
          <h5>H5 Heading <Badge pill color="primary">New</Badge></h5>
          <h6>H6 Heading <Badge pill color="primary">New</Badge></h6>
        </div>
        <div className="mb-3">
          <Button color="primary" outline>
            Notifications <Badge className="ml-2" color="danger" pill>4</Badge>
          </Button>
        </div>
        {/* BADGES: END */}
      </div>
    )
  }
}