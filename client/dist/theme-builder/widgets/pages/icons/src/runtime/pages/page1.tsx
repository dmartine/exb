import { React } from 'jimu-core';
import { Icon, ButtonGroup, Button } from 'jimu-ui';

declare global{
  interface Window{
    iconList?: string;
  }
}

const iconNameList = window.iconList && window.iconList.split(',') || [];

const sampleImageIcon = '/site/exb-logo.png';
// tslint:disable-next-line:max-line-length
const sampleImageIcon2 = 'data:image/png;base64,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';

interface State {
  iconsize?: number;
  iconcolor?: string;
}

export class Page1 extends React.PureComponent<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      iconsize: 24,
      iconcolor: '#333'
    };
  }

  render() {

    const style = {
      width: 100,
      lineHeight: 1.5,
      verticalAlign: 'top'
    }

    const classes = 'd-inline-block mr-1 mb-5 text-center';

    const content = iconNameList.map((iconName, i) => {
      let iconComponent = require(`jimu-ui/lib/icons/${iconName}`) || '';
      return <span key={i} style={style} className={classes}>
        <Icon icon={iconComponent} size={this.state.iconsize} color={this.state.iconcolor} />
        <span className="mt-2 text-muted d-block">{iconName.replace('.svg', '')}</span>
      </span>
    });

    return (
      <div>
        {/* Icon: START */}
        <h2 className="pb-5">Icons:
          <div className="float-right d-flex align-items-center">
            <small className="h5 font-weight-normal text-muted mr-3 m-0">color:</small>
            <small className="h5 font-weight-normal text-muted m-0 mr-3 ml-5">size:</small>
            <ButtonGroup size="sm" onClick={e => {
              let targetButton = e.target as HTMLButtonElement;
              if (targetButton.value) {
                this.setState({ iconsize: parseInt(targetButton.value) })
              }
            }}>
              <Button value={16} outline active={this.state.iconsize === 16}>16</Button>
              <Button value={24} outline active={this.state.iconsize === 24}>24</Button>
              <Button value={32} outline active={this.state.iconsize === 32}>32</Button>
            </ButtonGroup>
          </div>
        </h2>
        <h5 className="pb-3">Usage: </h5>
        <code className="pb-4 d-block">
          import &#123;Icon&#125; from &#x27;jimu-ui&#x27;&#59; <br />
          let IconStar = require&#40;&#x27;jimu-ui/lib/icons/star.svg&#x27;&#41;&#59;
        </code>
        <p className="text-muted">Simple usable(recommended): </p>
        <code className="pb-3 d-block">
          &#x3C;Icon icon=&#123;IconStar&#125; size=&#x27;{this.state.iconsize}&#x27; color=&#x27;{this.state.iconcolor}&#x27; /&#x3E;
            </code>
        <p className="text-muted">Or direct use the icon component as a raw svg element, all svg properties can be used here: </p>
        <code className="pb-5 d-block">
          &#x3C;IconStar width=&#x27;{this.state.iconsize}&#x27; height=&#x27;{this.state.iconsize}&#x27; fill=&#x27;{this.state.iconcolor}&#x27; /&#x3E;
            </code>
        <h4 className="pb-3">Icons</h4>
        {content}
        <hr />
        <h4 className="pb-3 text-muted"> As Image </h4>
        <hr />
        <div>
          <h5>URL:</h5>
          <Icon icon={sampleImageIcon} width="auto" height="48" />
        </div>
        <div>
          <h5>base64:</h5>
          <Icon icon={sampleImageIcon2} width="48" height="48" />
        </div>

      </div>
    )
  }
}