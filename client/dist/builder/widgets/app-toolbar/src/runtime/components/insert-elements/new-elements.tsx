/** @jsx jsx */
import {React, InjectedIntl, jsx, ThemeVariables, themeUtils, WidgetType, AppMode, LayoutItemType, LayoutItemConstructorProps} from 'jimu-core';

import DraggableElement from './draggable-element';
import NewElementItem from './new-element-item';
import defaultMessages from '../../translations/default';

interface Props{
  //isOnScreen: boolean;
  //onTogglePopup: (isOnScreen: boolean) => void;
  // appConfig: IMAppConfig;
  widgetList: LayoutItemConstructorProps[];
  dispatch: any;
  currentPageId: string;
  currentViewId: string;
  appPath: string;
  appMode: AppMode;
  intl: InjectedIntl;
}
interface State{
  selectedItemName: string;
}
export class _NewElements extends React.PureComponent<Props & {theme: ThemeVariables}, State>{
  sectionList: LayoutItemConstructorProps[] = [{
    itemType: LayoutItemType.Section,
    label: this.props.intl.formatMessage({id: 'section', defaultMessage: defaultMessages.section}),
    path: '',
    manifest: {
      properties: {} as any,
      defaultSize: {
        width: 500,
        height: 500
      },
    },
    icon: './widgets/app-toolbar/dist/runtime/assets/section.svg',

  }];

  constructor(props){
    super(props);
    this.state = {
      selectedItemName: ''
    };
  }

  getListItemJSX = (item: LayoutItemConstructorProps, hideLabel?: boolean, fullLine?: boolean) => {
    if(!item){
      return <div className="col-6" style={{visibility: 'hidden'}}></div>;
    }
    return (
      <DraggableElement item={item} fullLine={fullLine} className="widget-card-item"
        appMode={this.props.appMode} onSelect={this.onSelectItem}
      >
        {
          (item, fullLine) => <NewElementItem item={item} hideLabel={hideLabel} />
        }
      </DraggableElement>
    );
  }

  onSelectItem = (item: LayoutItemConstructorProps) => {
    let selectedItemName = item.name;
    this.setState({selectedItemName});
  }

  render(){
    let widgetList = this.props.widgetList;
    let normalWidgetList = [], layoutWidgetList = [];
    if (widgetList && widgetList.length > 0) {
      widgetList.forEach(item => {
        if (item.manifest.properties.type === WidgetType.Layout) {
          layoutWidgetList.push(item);
        } else {
          normalWidgetList.push(item);
        }
      });
    }
    return (
      <div className="flex-column bg-gray-100 d-flex">
        <div className="jimu-builder-panel--content choose-widget-popup-content text-black"
          onClick={() => {this.setState({selectedItemName: ''})}}>

          <section className="mb-4 mt-2 px-3">
            <h4 className="mb-0 new-elements-title">
              {this.props.intl.formatMessage({id: 'section', defaultMessage: defaultMessages.section})}
            </h4>
            <div className="container-fluid p-0">
              {this.sectionList.map((l, i, list) => {
                if(i % 2 === 0){
                  return(
                    <div className="row no-gutters" key={i}>
                      {this.getListItemJSX(l, true, true)}
                      {this.getListItemJSX(list[i + 1], true, true)}
                    </div>
                  )
                }
                return null;
              })}
            </div>
          </section>
          {normalWidgetList.length > 0 && <section className="mb-4 px-3">
            <h4 className="mb-0 new-elements-title">
              {this.props.intl.formatMessage({id: 'widget', defaultMessage: defaultMessages.widget})}
            </h4>
            <div className="container-fluid p-0">
              {normalWidgetList.map((l, i, list) => {
                if(i % 2 === 0){
                  return(
                    <div className="row no-gutters"  key={i}>
                      {this.getListItemJSX(l)}
                      {this.getListItemJSX(list[i + 1])}
                    </div>
                  )
                }
                return null;
              })}
            </div>
          </section>}
          {layoutWidgetList.length > 0 && <section className="mb-4 px-3">
            <h4 className="mb-0 new-elements-title">
              {this.props.intl.formatMessage({id: 'layoutWidget', defaultMessage: defaultMessages.layoutWidget})}
            </h4>
            <div className="container-fluid p-0">
              {layoutWidgetList.map((l, i, list) => {
                if(i % 2 === 0){
                  return(
                    <div className="row no-gutters"  key={i}>
                      {this.getListItemJSX(l)}
                      {this.getListItemJSX(list[i + 1])}
                    </div>
                  )
                }
                return null;
              })}
            </div>
          </section>}

        </div>
      </div>
    );
  }
}

export const NewElements = themeUtils.withTheme(_NewElements);
