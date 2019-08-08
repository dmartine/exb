/** @jsx jsx */
import { React, jsx, css, Immutable, appConfigUtils, IMState, ReactRedux,
  IMLayoutJson, IMSectionJson, IMViewJson, ThemeVariables,
  lodash,
  BrowserSizeMode} from 'jimu-core';
import {  SettingSection, SettingRow,
   getAppConfigAction, builderAppSync } from 'jimu-for-builder';
import { Icon, Button } from 'jimu-ui';
import ViewItem from './view-item';

interface SectionProps {
  sectionId: string,
  dispatch: any,
  theme: ThemeVariables,
  formatMessage: (id: string) => string
}

interface StateToProps {
  section?: IMSectionJson;
  views?: Array<IMViewJson>;
  activeViewId?: string;
  browserSizeMode: BrowserSizeMode;
}

interface Stats {
  currentSectionName: string
}

class SectionSetting extends React.PureComponent<SectionProps & StateToProps, Stats> {

  constructor(props){
    super(props)
    const {section} = props
    this.state = {
      currentSectionName: section && section.label || ''
    }
  }

  componentWillReceiveProps(nextProps){
    const {section} = nextProps;
    if(!section){
      return null;
    }
    if(section.id !== this.props.section.id || section.label !== this.props.section.label){
      this.setState({
        currentSectionName: section && section.label || ''
      })
    }
  }

  _updateSectionName = (value) => {
    const { section } = this.props;
    if(!value || value.trim() === ''){
      this.setState({
        currentSectionName: section && section.label || ''
      })
      return;
    }

    const updatedSection = Immutable(section).set('label', value);
    getAppConfigAction().editSection(updatedSection).exec();
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  _addView = () => {
    const { section, browserSizeMode} = this.props;
    const appConfigAction = getAppConfigAction();
    const appConfig = appConfigAction.appConfig;
    let layoutId = appConfigUtils.getUniqueId(appConfig, 'layout');
    let viewLayout = Immutable({}).merge({
      id: layoutId,
    }) as IMLayoutJson;

    let viewJson = Immutable({}).merge({
      id: appConfigUtils.getUniqueId(appConfig, 'view'),
      label: appConfigUtils.getUniqueLabel(appConfig, 'view', 'view'),
      layout: {[browserSizeMode]: layoutId},
    }) as IMViewJson;
    getAppConfigAction().addView(viewJson, section.id, [viewLayout]).exec();
    lodash.defer(() => {
      this._selectView(viewJson.id);
    });
  }

  _duplicateView = () => {
    const { activeViewId, sectionId } = this.props;
    const appConfig = getAppConfigAction().appConfig;
    const nextId = appConfigUtils.getUniqueId(appConfig, 'view');
    getAppConfigAction().duplicateView(activeViewId, sectionId).exec();
    lodash.defer(() => {
      this._selectView(nextId);
    });
  }

  _selectView = (vid: string) => {
    const {section} = this.props;
    builderAppSync.publishViewChangeToApp(section.id, vid);
  }

  _sortView = (dragIndex: number, hoverIndex: number) => {
    const { section } = this.props;
    let views = section.views.asMutable();
    // move dragIndex before the hoverIndex
    const dragView = views[dragIndex];
    const hoverView = views[hoverIndex];
    views = views.splice(dragIndex, 1);
    const idx = views.indexOf(hoverView);
    views = views.splice(idx, 0, dragView);
    const updatedSection = Immutable(section).set('views', views);
    getAppConfigAction().editSection(updatedSection).exec();
  }

  render() {
    const { section, views, theme, dispatch, activeViewId } = this.props;
    if(!section){
      return null;
    }
    // const {currentSectionName} = this.state
    const buttonStyle = css`
      cursor:pointer;
    `;

    return (
      <div className="flexbox-layout-setting">
        <SettingSection>
          {/* <SettingRow label={this.formatMessage('name')}>
            <Input type="text" value={currentSectionName} onAcceptValue={this._updateSectionName}
            onChange={(event) => {this.setState({currentSectionName : event.target.value}); }}
            />
          </SettingRow> */}
          <SettingRow label={this.formatMessage('views')}>
          <Button css={buttonStyle} color="link" onClick={this._addView} title={this.formatMessage('addView')} >
            <Icon icon={require('jimu-ui/lib/icons/add.svg')} className="mr-0"></Icon>
          </Button>
          <Button css={buttonStyle} color="link" onClick={this._duplicateView} title={this.formatMessage('duplicateView')}>
            <Icon icon={require('jimu-ui/lib/icons/duplicate-16.svg')} className="mr-0"></Icon>
          </Button>
          </SettingRow>
          {views.map((view, index) => {
            return <SettingRow key={view.id}>
              <ViewItem index={index} canRemove={views.length > 1} formatMessage={this.formatMessage}
              dispatch={dispatch} sectionId={section.id} theme={theme} view={view}
              onSelect={this._selectView}
              selected={activeViewId === view.id}
              moveItem={this._sortView}></ViewItem>
            </SettingRow>
          })}
        </SettingSection>
      </div>
    );
  }
}

const mapStateToProps = (state: IMState, ownProps: SectionProps) => {
  const {sectionId} = ownProps;
  const {appConfig} = state.appStateInBuilder;
  const section = appConfig.sections[sectionId];
  if (!section) {
    return null;
  }
  const views = section.views.map(viewId => {
    return appConfig.views[viewId];
  });
  let activeViewId;
  if (state.appStateInBuilder.appRuntimeInfo.currentViewId) {
    activeViewId = state.appStateInBuilder.appRuntimeInfo.currentViewId
    if(!views.find(view => view.id === activeViewId)){
      activeViewId = section.views[0];
    }
  } else {
    activeViewId = section.views[0];
  }

  return {
    section,
    views,
    activeViewId,
    browserSizeMode: state.appStateInBuilder && state.appStateInBuilder.browserSizeMode
  }
};

export default ReactRedux.connect<StateToProps, {}, SectionProps>(mapStateToProps)(SectionSetting);