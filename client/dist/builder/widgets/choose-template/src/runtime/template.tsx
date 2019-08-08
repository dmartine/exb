/** @jsx jsx */
import { React, jsx, css, classNames, ThemeVariables, polished, InjectedIntl } from 'jimu-core';
import { Button, Image, Icon } from 'jimu-ui';
import defaultMessages from './translations/default';

const previewIcon = require('jimu-ui/lib/icons/app-preview.svg');

export interface TemplateInfo {
  name: string;
  title: string;
  image?: {
    src: string
  };
  author?: string;
  description?: string;
}

interface Props {
  disabled?: boolean;
  show: boolean;
  info: TemplateInfo;
  onCreateClick: (templateName: string) => void;
  intl?: InjectedIntl;
  theme?: ThemeVariables;
  style?: React.CSSProperties;
}

interface State {
  showDesc?: boolean;
}

export default class Template extends React.PureComponent<Props, State>{

  static defaultProps: Partial<Props> = {
    disabled: false
  }

  constructor(props) {
    super(props);
    this.state = {
      showDesc: false
    }
  }

  onCreateClick = () => {
    const { name } = this.props.info;
    this.props.onCreateClick(name);
  }

  nls = (id: string) => {
    return this.props.intl ? this.props.intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : id;
  }

  getStyle = () => {
    const { theme } = this.props;
    const gray600 = theme ? theme.colors.grays.gray600 : '';
    const gray800 = theme ? theme.colors.grays.gray800 : '';
    const white = theme ? theme.colors.white : '';

    return css`
      width: ${polished.rem(238)};
      height: ${polished.rem(260)};
      margin: 0 ${polished.rem(16)}  ${polished.rem(30)}  ${polished.rem(16)};
      display: flex;
      flex-direction: column;
      .image-container {
        position: relative;
        height: ${polished.rem(160)};
        width: ${polished.rem(238)};
        > img {
          width: 100%;
          max-width: 100%;
          max-height: 100%;
        }
        flex-shrink: 0;
        flex-grow: 0;
        .description {
          user-select: text;
          cursor: text;
          position: absolute;
          padding: ${polished.rem(16)};
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: ${white};
          opacity: 0.8;
          color: ${gray800};
          font-size: 13px;
          .content {
            overflow: hidden;
            width: 100%;
            height: 100%;
          }
        }
      }
      .info{
        padding: ${polished.rem(16)};
        flex-shrink: 1;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          ${{ ...polished.ellipsis() }}
          font-size: ${polished.rem(16)};
        }
      }
      .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-btn:first-of-type {
          margin-left: -4px;
        }
      }
      &.disabled {
        > img {
          opacity: 0.6;
        }
        .jimu-icon {
          color: ${gray600};
          cursor: default;
        }
        .info{
          .title {
            color: ${theme.colors.grays.gray700};
          }
        }
      }
    `;
  }

  showDesc = () => {
    this.setState({ showDesc: true });
  }

  hideDesc = () => {
    this.setState({ showDesc: false });
  }

  render() {
    const { show, disabled, style } = this.props;
    if (!show) {
      return null;
    }
    const { title, image, description, name } = this.props.info;
    const { showDesc } = this.state;
    let previewUrl = `${window.location.origin}/stemapp/?config=/templates/${name}/config.json`;
    return <div css={this.getStyle()} className={classNames('template bg-secondary', { disabled: disabled })} style={style}>
      <div className="image-container" onMouseEnter={this.showDesc} onMouseLeave={this.hideDesc}>
        <Image src={image.src} alt={title}></Image>
        {showDesc && <div className="description">
          <div className="content">{description}</div>
        </div>}
      </div>
      <div className="info">
        <div className="title">{title}</div>
        <div className="buttons">
          <Button size="sm" text icon color="dark" href={previewUrl} target="_blank"><Icon size="16" icon={previewIcon}></Icon> </Button>
          <Button disabled={disabled} className="action-button" color="primary" onClick={this.onCreateClick}>{this.nls('create')} </Button>
        </div>
      </div>
    </div>;
  }
}
