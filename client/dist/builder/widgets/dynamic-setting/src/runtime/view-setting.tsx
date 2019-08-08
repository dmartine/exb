import {React, IMState, ReactRedux, IMViewJson} from 'jimu-core';
import {ColorPicker, getAppConfigAction, SettingSection, ColorResult, SettingRow} from 'jimu-for-builder';
import { Input} from 'jimu-ui';

interface SectionProps {
  viewId: string;
  formatMessage: (id: string) => string
}

interface StateToProps {
  view?: IMViewJson;
}

class ViewSetting extends React.PureComponent<SectionProps & StateToProps> {
  constructor(props){
    super(props);
  }

  formatMessage = (id: string) => {
    return this.props.formatMessage(id);
  }

  getViewName = () => {
    return this.props.view ? this.props.view.label : '';
  }

  updateViewName = e => {
    if(!e.target.value.trim()){
      return;
    }
    const updatedView = this.props.view.set('label', e.target.value.trim());
    getAppConfigAction().editView(updatedView).exec();
  }

  onBackgroundColorChange = (color: ColorResult) => {
    const updatedView = this.props.view.set('backgroundColor', color.hex);
    getAppConfigAction().editView(updatedView).exec();
  }
  render() {
    const {view} = this.props;

    if(!view){
      return null;
    }

    return (
      <div>
        <SettingSection>
          <SettingRow label={this.formatMessage('name')}>
            <Input type="text" value={this.getViewName()}
              onBlur={this.updateViewName} onKeyUp={this.updateViewName}
            />
          </SettingRow>
        </SettingSection>
        <SettingSection>
          <SettingRow label={this.formatMessage('background')}></SettingRow>
          <SettingRow label="Color">
            <div style={{width: '50px', height: '20px'}}>
              <ColorPicker color={view.backgroundColor || '#fff'} onChange={this.onBackgroundColorChange}
                width="100%" height="100%" onChangeComplete={this.onBackgroundColorChange}
              />
            </div>
          </SettingRow>
        </SettingSection>
      </div>
    );
  }
}

const mapStateToProps = (state: IMState, ownProps: SectionProps) => {
  const {viewId} = ownProps;
  const {appConfig} = state.appStateInBuilder;

  const view = appConfig.views[viewId];

  return {
    view
  }
};

export default ReactRedux.connect<StateToProps, {}, SectionProps>(mapStateToProps)(ViewSetting);