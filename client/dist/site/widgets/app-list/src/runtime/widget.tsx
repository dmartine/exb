/** @jsx jsx */
import {BaseWidget, IMState, AllWidgetProps, Immutable, SessionManager, jsx} from 'jimu-core';
// import {builderActions} from 'jimu-for-builder';
import {Button, Input, Icon} from 'jimu-ui';
import {IItem} from '@esri/arcgis-rest-types';
import DetailView from './components/app-list-detailview';
import ListView from './components/app-list-listview';
import {AppListContext} from './lib/app-list-context'
import SortAppDropDown from './components/app-list-sortappdropdown';
import {ISearchOptions} from '@esri/arcgis-rest-portal';
import {getStyle} from './lib/app-list-style';
import defaultMessages from './translations/default';
import {appServices} from 'site/common';

interface WState {
  apps: IItem[],
  isDetailContent: boolean,
  accessType: 'me' | 'anyone' | 'notme',
  filterField?: string,
  filterTitle: string,
  searchText: string,
  loading: boolean;
}

interface ExtraProps {
  // refreshAppList: boolean;
}

enum AccessType {
  ME = 'me',
  ANYONE = 'anyone',
  NOTME = 'notme'
}

enum FilterField {
  Modified = 'modified',
  Title = 'title',
  NumViews = 'numViews'
}

let IconSearch = require('jimu-ui/lib/icons/search-24.svg');
let IconAdd = require('jimu-ui/lib/icons/add-24.svg');
let IconViewList = require('jimu-ui/lib/icons/app-view-list.svg');
let IconViewCard = require('jimu-ui/lib/icons/app-view-card.svg');

export default class Widget extends BaseWidget<AllWidgetProps<{}> & ExtraProps, WState>{

  contentNode: HTMLDivElement;
  appListContainer: HTMLDivElement;
  static scrollTop: number = 0;
  pageStart: number = 1;
  searchPromise: Promise<any> = null;
  onSearchTextInputed: any;

  static mapExtraStateProps = (state: IMState) => {
    return {
      // refreshAppList: state.builder.refreshAppList
    }
  };

  constructor(props){
    super(props);
    this.state = {
      apps: [],
      isDetailContent: true,
      accessType: AccessType.ME,
      filterTitle: this.props.intl.formatMessage({id: 'labelByModified', defaultMessage: defaultMessages.labelByModified}),
      filterField: FilterField.Modified,
      searchText: '',
      loading: false
    };
  }

  componentDidMount() {
    let requestOption = this.getRequestOption(this.state.accessType, this.state.filterField);
    this.setState({loading: true});
    this.refresh(requestOption as any);
    if (this.contentNode) {
      this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
      this.contentNode.scrollTop = Widget.scrollTop;
    }
  }

  onScrollHandle(event) {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
    const isBottom = (clientHeight + scrollTop === scrollHeight)
    if(!this.state.loading && isBottom){
      let requestOption = this.getRequestOption(this.state.accessType, this.state.filterField, true);
      this.setState({loading: true});
      this.refresh(requestOption as any, true);
    }
  }

  componentWillUnmount() {
    if (this.contentNode) {
      this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
      Widget.scrollTop = this.contentNode.scrollTop;
    }
  }

  getRequestOption = (accessType: string, filterField: string, isMore: boolean = false) => {
    let session = SessionManager.getInstance().getSession();
    if (session) {
      let requestOption = Immutable({});
      switch (accessType) {
        case AccessType.ME:
          requestOption = requestOption.merge({
            q: `type: "Web Experience" AND owner:${session.username}`
          });
          break;
        case AccessType.ANYONE:
          requestOption = requestOption.merge({
            q: `type: "Web Experience"`
          });
          break;
        case AccessType.NOTME:
          requestOption = requestOption.merge({
            q: `type: "Web Experience" NOT owner:${session.username}`
          });
          break;
      }

      if (filterField) {
        requestOption = requestOption.merge({
          sortField: filterField,
          sortOrder: 'desc',
        });
      }

      if(isMore){
        this.pageStart = this.state.apps.length + 1;
        requestOption = requestOption.merge({
          num: 30,
          start: this.pageStart
        });
      }else{
        this.pageStart = 1;
        let containerWidth = this.appListContainer.clientWidth;
        let containerHeight = document.body.clientHeight - 215;
        let pageNum = Math.ceil(containerHeight / 280) * Math.ceil((containerWidth / 240));

        requestOption = requestOption.merge({
          num: pageNum,
          start: this.pageStart
        });
      }
      return requestOption;
    } else {
      return null;
    }
  }

  refresh(requestOption?: ISearchOptions, isMore: boolean = false){
    if (!requestOption) {
      return;
    }

    this.searchPromise = null;
    this.searchPromise = this.appServiceSearchApp(requestOption);
    this.searchPromise.then(apps => {
      if (!this.searchPromise) {
        this.setState({loading: false});
        return;
      }

      let newApps = this.state.apps;
      if(isMore){
        newApps = newApps.concat(apps);
      }else{
        newApps = apps;
      }
      this.setState({
        apps: newApps,
        loading: false
      });
    }, () => {
      this.setState({loading: false});
    })
  }

  appServiceSearchApp = (requestOption): Promise<any> => {
    return appServices.searchApp(requestOption);
  }

  newApp = () => {
    window.location.assign(`${window.jimuConfig.mountPath}builder/page/template`);
  }

  deleteApp = (appId: string) => {
    this.setState({ loading: true });
    appServices.deleteApp(appId).then(() => {
      let self = this;

      // since deleteApp api can not update resultdata timely, so add timeout function to fresh
      setTimeout(() => {
        let requestOption = self.getRequestOption(self.state.accessType, self.state.filterField);
        self.refresh(requestOption as any);
      }, 1000);
    }, () => {
      this.setState({loading: false});
    });
  }

  refreshList = () => {
    let self = this;
    this.setState({
      filterField: FilterField.Modified,
      accessType: AccessType.ME,
      filterTitle: this.props.intl.formatMessage({id: 'labelByModified', 
        defaultMessage: defaultMessages.labelByModified}),
      searchText: ''
    });

    // since updateApp api can not update resultdata timely, so add timeout function to fresh
    setTimeout(() => {
      let requestOption = self.getRequestOption(self.state.accessType, self.state.filterField);
      self.refresh(requestOption as any);
    }, 1000);
  }

  duplicateApp = (appId: string) => {
    this.setState({ loading: true });

    appServices.duplicateApp(appId).then(result => {
      if (result) {
        this.refreshList();
      } else {
        this.setState({ loading: false });
      }
    }, () => {
      this.setState({ loading: false });
    })
  }

  switchListView = () => {
    this.setState({
      isDetailContent: !this.state.isDetailContent
    });
  }

  accessChange = (e: any) => {
    let accessType = e.target.value;
    let requestOption = this.getRequestOption(accessType, this.state.filterField);
    this.setState({loading: true});
    this.refresh(requestOption as any);

    this.setState({
      accessType: accessType
    });
  }

  filterFieldChange = (filterField: string) => {
    let requestOption = this.getRequestOption(this.state.accessType, filterField);
    this.setState({loading: true});
    this.refresh(requestOption as any);

    let filterLabel = '';
    if (filterField == FilterField.Title) {
      filterLabel = this.props.intl.formatMessage({id: 'labelByTitle', defaultMessage: defaultMessages.labelByTitle});
    } else if (filterField == FilterField.NumViews) {
      filterLabel = this.props.intl.formatMessage({id: 'labelByView', defaultMessage: defaultMessages.labelByView});
    } else if (filterField == FilterField.Modified) {
      filterLabel = this.props.intl.formatMessage({id: 'labelByModified', defaultMessage: defaultMessages.labelByModified});
    }

    this.setState({
      filterField: filterField,
      filterTitle: filterLabel
    });
  }

  handleKeydown = (e: any) => {
    if (e.keyCode === 13) {
      this.searchExperiences(e.target.value);
    } else {
      return;
    }
  }

  searchExperiences = (content: string) => {
    let requestOption = this.getRequestOption(this.state.accessType, this.state.filterField) as any;
    let q = `${requestOption.q} AND title:"${content}"` ;
    requestOption = requestOption.set('q', q);
    this.setState({loading: true});
    this.refresh(requestOption as any);
  }

  searchTextChange = (e: any) => {
    let searchText = e.target.value;
    this.setState({
      searchText: searchText
    });
    clearTimeout(this.onSearchTextInputed);
    this.onSearchTextInputed = setTimeout(() => {
      this.searchExperiences(searchText);
    }, 500);
  }

  render() {
    return <AppListContext.Provider value = {{deleteApp: this.deleteApp, refreshList: this.refreshList, duplicateApp: this.duplicateApp}}>
      <div css={getStyle(this.props.theme)} className="h-100">
        <div className="widget-builder-app-list bg-gray-100 h-100" ref={ node => this.contentNode = node }>
          <div className="widget-builder-app-list-screen" ref={ref => {this.appListContainer = ref; }}>
            <div style={{overflow: 'hidden'}} className="app-list-search-container">
              <div className="app-list-banner d-flex justify-content-between" style={{position: 'relative'}}>
                <Button color="light" className="mt-2 ml-2 pl-2 pr-2 btn bg-white border-0" style={{position: 'absolute'}}
                  onClick={() => {this.searchExperiences(this.state.searchText)}}>
                  <Icon width={24} height={24} icon={IconSearch} className="app-list-searchIconFill"/>
                </Button>
                <Input className="float-left pt-2 pb-2 app-list-searchbox app-list-h1" 
                  placeholder={this.props.intl.formatMessage({id: 'search', defaultMessage: defaultMessages.search})} 
                  onChange={this.searchTextChange} value={this.state.searchText} onKeyDown ={ (e) => {this.handleKeydown(e)}}>
                </Input>
                <Button className="float-left btn-lg pt-0 pb-0 app-list-newapp" color="primary" onClick={this.newApp}>
                  <Icon className="app-list-newapp-icon" width={24} height={24} icon={IconAdd}/>{this.props.intl.formatMessage({id: 'newApp', defaultMessage: defaultMessages.newApp})}
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 app-list-filterbar">
              <div className="d-flex justify-content-between align-items-center app-list-filterbar-title">
                <h2 className="app-list-h2">{this.state.filterTitle}</h2>
                <div>
                  <Button style={{background: 'transparent'}} className="float-right border-0 btn-white pl-1 pr-1 app-list-switchview" 
                    onClick={this.switchListView}>
                    <Icon icon={this.state.isDetailContent ? IconViewList : IconViewCard} className="app-list-iconfill app-list-iconmargin"/>
                  </Button>
                  <SortAppDropDown onChange={this.filterFieldChange} className="float-right mr-2 ml-2" 
                    intl={this.props.intl} style={{paddingTop: '2px'}}>
                  </SortAppDropDown>
                  <Input type="select" onChange={this.accessChange} value={this.state.accessType} 
                    className="float-right filterbar-input">
                    <option value={AccessType.ME}>{this.props.intl.formatMessage({id: 'ownByMe', defaultMessage: defaultMessages.ownByMe})}</option>
                    <option value={AccessType.ANYONE}>{this.props.intl.formatMessage({id: 'ownByAnyone', defaultMessage: defaultMessages.ownByAnyone})}</option>
                    <option value={AccessType.NOTME}>{this.props.intl.formatMessage({id: 'notOwnByMe', defaultMessage: defaultMessages.notOwnByMe})}</option>
                  </Input>
                </div>
              </div>
            </div>
            <div className="bg-gray-100">
              <div className="app-list-content">
                {this.state.isDetailContent && <DetailView portalUrl={this.props.portalUrl} intl={this.props.intl}
                  folderUrl={this.props.context.folderUrl} apps={this.state.apps} switchListView={this.switchListView}></DetailView>}
                {!this.state.isDetailContent && <ListView portalUrl={this.props.portalUrl} intl={this.props.intl}
                  folderUrl={this.props.context.folderUrl} apps={this.state.apps} switchListView={this.switchListView}></ListView>}
              </div>
            </div>
          </div>
        </div>
        {this.state.loading && <div style={{ position: 'absolute', left: '50%', top: '50%' }} className="jimu-primary-loading"></div>}
      </div>
    </AppListContext.Provider>;
  }
}