/** @jsx jsx */
import {React, jsx, css, ThemeVariables, SerializedStyles, Immutable, InjectedIntl, PageMode} from 'jimu-core';
import defaultMessages from '../translations/default';
import CommonModal from './common-modal';

interface props {
  theme: ThemeVariables,
  isOpen: boolean,
  template: string,
  title: string,
  intl: InjectedIntl,
  description: string,
  onSelected: (pageJson: any) => void,
  toggle: () => void,
}

const templates = [
  {
    width: '100%',
    mode: PageMode.FitWindow,
    layout: {
      LARGE: 'default-layout-desktop'
    },
    layouts: {
      'default-layout-desktop': {
        type: 'FIXED'
      }
    },
  },
  {
    width: '100%',
    mode: PageMode.AutoScroll,
    layout: {
      LARGE: 'default-layout-desktop'
    },
    layouts: {
      'default-layout-desktop': {
        type: 'FLOW'
      }
    },
  },
  // {
  //   width: '960',
  //   height: 'auto',
  //   layout: {
  //     DESKTOP: 'default-layout-desktop'
  //   },
  //   layouts: {
  //     'default-layout-desktop': {
  //       type: 'FLOW'
  //     }
  //   },
  // }
]
export default class TemplatePopover extends React.PureComponent<props, {selectedIndex: number}>{

  constructor(props){
    super(props);
    this.state = {
      selectedIndex: 0
    }
  }

  handlModelClosed = (isOk) => {
    this.props.onSelected(isOk ? Immutable(templates[this.state.selectedIndex]) : undefined);
  }

  onSelected = (index: number) => {
    this.setState({
      selectedIndex: index
    })

  }

  formatMessage = (id: string) => {
    return this.props.intl.formatMessage({id: id, defaultMessage: defaultMessages[id]})
  }

  getStyle = (): SerializedStyles => {
    const {theme} = this.props;
    return css `
      margin-left: 20px;
      margin-right: 30px;
      .item {
        width: 198px;
        height: 280px;
        user-select: none;
        margin-left: 25px;
        &.item-first {
          margin-left: 0px;
        }
        .img-container {
          width: 100%;
          height: 148px;
          cursor: pointer;
          border: 1px solid ${theme.colors.grays.gray400};
          &.active {
            border: 1px solid ${theme.colors.cyans.cyan500};
          }
          .thumbnail {
            width: 180px;
          }
        }

        .name {
          margin-top: 26px;
          font-size: 14px;
        }
        .description {
          margin-top: 13px;
          font-size: 12px;
          color: ${theme.colors.grays.gray600};
        }
      }
    `
  }

  render(){
    const {theme, toggle, title, intl, isOpen} = this.props;
    const {selectedIndex} = this.state;
    return(
      <CommonModal theme={theme} toggle={toggle} onClosed={this.handlModelClosed} title={title} isOpen={isOpen} intl={intl}>
        <div css={this.getStyle()}>
          <div className="d-flex justify-content-between">
            <div className="item item-first d-flex flex-column">
              <div className={`img-container d-flex align-items-center justify-content-center ${selectedIndex === 0 ? 'active' : ''}`}
                onClick={evt => this.onSelected(0)}>
                <img className="thumbnail" src={require('../assets/T1.svg')}/>
              </div>
              <div className="name w-100 text-center">
                {this.formatMessage('fullScreenApp')}
              </div>
              <div className="description w-100 text-left">
              {this.formatMessage('fullScreenAppTip')}
              </div>
            </div>

            <div className="item d-flex flex-column">
              <div className={`img-container d-flex align-items-center justify-content-center ${selectedIndex === 1 ? 'active' : ''}`}
                onClick={evt => this.onSelected(1)}>
                <img className="thumbnail" src={require('../assets/T3.svg')}/>
              </div>
              <div className="name w-100 text-center">
                {this.formatMessage('scrollingPage')}
              </div>
              <div className="description w-100 text-left">
                {this.formatMessage('scrollingPageTip')}
              </div>
            </div>

            {/* <div className="item d-flex flex-column">
              <div className={`img-container d-flex align-items-center justify-content-center ${selectedIndex === 2 ? 'active' : ''}`}
                onClick={evt => this.onSelected(2)}>
                <img src={require('../assets/T3.svg')}/>
              </div>
              <div className="name w-100 text-center">
                Full Width Page
              </div>
              <div className="description w-100 text-left">
                Best for creating a scrollable web page with all content taking the full width of the browser window.
              </div>
            </div> */}
          </div>
        </div>
      </CommonModal>

    )
  }
}

