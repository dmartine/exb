import { React, appActions, getAppStore, lodash, ImmutableArray, IMUseDataSource, Immutable, ReactRedux, IMState, IMWidgetJson, IMExpression, InjectedIntl } from 'jimu-core';
import { QuillComponent, getAppConfigAction, StringMap, PluginMap, RangeStatic, Sources, UnprivilegedEditor, Delta } from 'jimu-for-builder/for-app-inbuilder';
import { expressionUtils, IMLinkParam } from 'jimu-for-builder';
import { getDataSourceIds, getIdsFromHtml } from '../utils'
import { IMConfig, IMExpressionMap, IMLinkParamMap } from '../../config';
import { Placement, TextFormats } from 'jimu-ui';
import defaultMessages from '../translations/default';

const DEFAULTTEXT = '<p>Click Edit button to edit text</p>';

const defaultPopperProps = {
  className: 'bg-white border shadow rounded',
  container: 'body',
  placement: 'auto' as Placement,
  zIndex: 51,
  offset: [0, 10],
  modifiers: {
    preventOverflow: {
      enabled: true,
      boundariesElement: document && document.body
    }
  }
}

const imageMatcher = (node, delta: Delta) => {
  return { ops: [], length: 0 };
}

const modules = {
  toolbar: false,
  autoformat: {
    link: {
      trigger: /[\s]/,
      find: /https?:\/\/[\S]+|(www\.[\S]+)/gi,
      transform: function (value, noProtocol) {
        return noProtocol ? 'http://' + value : value;
      },
      format: 'link'
    }
  },
  clipboard: {
    matchers: [
      ['img', imageMatcher]
    ]
  }
};

interface OwnProps {
  widgetId: string;
  config: IMConfig;
  useDataSources: ImmutableArray<IMUseDataSource>;
  intl: InjectedIntl;
}

interface ExtraProps {
  widgetJson: IMWidgetJson;
  widgetState: any;
}

interface State {
  html: string,
  formats?: StringMap
}

class _BuilderWidget extends React.PureComponent<OwnProps & ExtraProps, State> {
  domNode: React.RefObject<any>;

  constructor(props) {
    super(props);
    this.state = {
      html: ''
    }
    this.domNode = React.createRef();
  }

  private getPligins = (): PluginMap => {
    const { formats } = this.state;
    const { useDataSources, widgetState = {} } = this.props;
    const reference = this.domNode.current;
    return {
      formats: lodash.assign({}, defaultPopperProps, {
        draggable: true,
        header: {
          text: this.nls('textFormat'),
          onClose: this.onFormatPluginClose
        },
        formats,
        open: widgetState && widgetState.showFormats,
        reference,
        onChange: this.onPluginChange
      }),
      expression: lodash.assign({}, defaultPopperProps, {
        draggable: true,
        header: {
          text: this.nls('dynamicContent'),
          onClose: this.onExpressionPluginClose
        },
        formats,
        open: widgetState && widgetState.showExpression,
        reference,
        dataSourceIds: getDataSourceIds(useDataSources),
        onChange: this.onPluginChange
      })
    }
  }

  nls = (id: string) => {
    const { intl } = this.props;
    return intl ? intl.formatMessage({ id: id, defaultMessage: defaultMessages[id] }) : '';
  }


  componentDidMount() {
    const { config: { text } } = this.props;
    this.setState({ html: text });
  }

  showExpressionPanel = () => {
    const { widgetId } = this.props;
    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showExpression', true));
    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showFormats', false));
  }

  tryShowExpressionPanel = (formats?: StringMap) => {
    formats = formats || this.state.formats;
    if (formats && formats[TextFormats.EXPRESSION]) {
      this.showExpressionPanel();
    };
  }

  onFormatPluginClose = () => {
    const { widgetId } = this.props;
    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showFormats', false));
  }

  onExpressionPluginClose = () => {
    const { widgetId } = this.props;
    getAppStore().dispatch(appActions.widgetStatePropChange(widgetId, 'showExpression', false));
  }

  onPluginChange = (key: TextFormats, value: IMExpression | IMLinkParam, id?: string) => {
    const { config } = this.props;
    if (key === TextFormats.EXPRESSION) {
      this.editWidgetConfig(config.setIn(['expression', id], value));
    }
    if (key === TextFormats.LINK) {
      this.editWidgetConfig(config.setIn(['link', id], value));
    }
  }

  getExpressionById = (id: string) => {
    const { config: { expression } } = this.props;
    return expression && expression[id];
  }

  getLinkById = (id: string) => {
    const { config: { link } } = this.props;
    return link && link[id];
  }

  componentWillUnmount() {
    const { config: { text: preHtml } } = this.props;
    const { html } = this.state;
    if (html !== preHtml) {
      this.updateWidgetJson(html);
    }
  }

  updateWidgetJson = (html) => {
    let { config, widgetJson } = this.props;
    const updateNeededExpression = this.getUpdateNeededExpression(html);
    const updateNeededLink = this.getUpdateNeededLink(html);

    config = config.set('text', html);
    if (updateNeededExpression) {
      config = config.set('expression', updateNeededExpression);
    }
    if (updateNeededLink) {
      config = config.set('link', updateNeededLink);
    }
    const useDataSources = this.getUseDataSources(config);

    if (useDataSources) {
      widgetJson = widgetJson.set('useDataSources', useDataSources);
    }

    widgetJson = widgetJson.set('config', config);
    this.setWidegtJsonToAppConfig(widgetJson);
  }

  getUseDataSources = (config: IMConfig): ImmutableArray<IMUseDataSource> => {
    const expressionUseDataSources = this.getExpressionUseDataSources(config);
    if (!expressionUseDataSources) {
      return;
    }
    return this.mergeUseDataSourcesWithExpressionDataSources(expressionUseDataSources);
  }

  getExpressionUseDataSources = (config: IMConfig): ImmutableArray<IMUseDataSource> => {
    const { expression = {}, link = {} } = config;

    let parts = [];
    Object.keys(expression).forEach(id => {
      const value = expression[id] || { parts: [] };
      const iparts = value.parts;
      parts = parts.concat(iparts);
    });
    Object.keys(link).forEach(id => {
      const linkparam = link[id] || {} as IMLinkParam;
      const value = linkparam.expression || { parts: [] };
      const iparts = value.parts;
      parts = parts.concat(iparts);
    });
    if (!parts.length) {
      return;
    }
    return expressionUtils.getUseDataSourceFromExpParts(parts);
  }

  mergeUseDataSourcesWithExpressionDataSources = (expressionUseDataSources: ImmutableArray<IMUseDataSource>): ImmutableArray<IMUseDataSource> => {
    const { useDataSources } = this.props;
    if (!useDataSources) {
      return useDataSources;
    }
    return useDataSources.flatMap(val => {
      const dsid = val.dataSourceId;
      const dataSource = this.getUseDataSourceById(expressionUseDataSources, dsid);
      if (!dataSource) {
        return [val.set('fields', [])];
      }
      const fields = dataSource.fields;
      return [val.set('fields', fields)];
    })
  }

  getUpdateNeededExpression = (html: string): IMExpressionMap => {
    const ids = getIdsFromHtml(html, 'EXPRESSION');
    let { config: { expression = Immutable({}) } } = this.props;
    let mutableExpression = expression.asMutable();
    const expressionIds = Object.keys(mutableExpression);
    const uselessIds = expressionIds.filter(e => ids.indexOf(e) < 0);
    if (!uselessIds.length) {
      return;
    }
    uselessIds.forEach(id => {
      delete mutableExpression[id];
    });
    return Immutable(mutableExpression) as IMExpressionMap;
  }

  getUpdateNeededLink = (html: string): IMLinkParamMap => {
    const ids = getIdsFromHtml(html, 'LINK');
    let { config: { link = Immutable({}) } } = this.props;
    let mutableLink = link.asMutable();
    const linkIds = Object.keys(mutableLink);
    const uselessIds = linkIds.filter(e => ids.indexOf(e) < 0);
    if (!uselessIds.length) {
      return;
    }
    uselessIds.forEach(id => {
      delete mutableLink[id];
    });
    return Immutable(mutableLink) as IMLinkParamMap;
  }

  getUseDataSourceById = (useDataSources: ImmutableArray<IMUseDataSource>, id) => {
    return useDataSources.flatMap(val => {
      if (val.dataSourceId !== id) {
        return [];
      }
      return [val];
    })[0];
  }

  private setWidegtJsonToAppConfig = (widgetJson: IMWidgetJson) => {
    let appConfigAction = getAppConfigAction();
    appConfigAction.editWidget(widgetJson).exec();
  }

  private editWidgetConfig = (config: IMConfig) => {
    const { widgetId } = this.props;
    //Save html to config.text
    let appConfigAction = getAppConfigAction();
    appConfigAction.editWidgetConfig(widgetId, config).exec();
  }


  mixinFormatsForLink = (formats: StringMap) => {
    const link = formats && formats.link;
    if (!link) {
      return formats;
    }
    const id = link.id;
    if (!id) {
      return formats;
    }
    const completeLink = this.getLinkById(id);
    formats = lodash.assign({}, formats, { link: completeLink });
    return formats;
  }

  mixinFormatsForExpression = (formats: StringMap) => {
    const expression = (formats && formats.expid) ? formats : undefined;
    if (!expression) {
      return formats;
    }
    const expid = expression.expid;
    if (!expid) {
      return formats;
    }
    let completeExpression = this.getExpressionById(expid);
    completeExpression = lodash.assign({}, completeExpression, { expid });
    formats = lodash.assign({}, formats, { expression: completeExpression });
    return formats;
  }

  onQuillComponentClick = () => {
    this.tryShowExpressionPanel();
  }

  onChangeSelection = (selection: RangeStatic, source: Sources, quill: UnprivilegedEditor) => {
    if (source !== 'user') {
      return;
    }
    if (!selection) {
      return;
    }
    let formats = selection ? quill.getFormat(selection) : {};
    formats = this.mixinFormatsForLink(formats);
    formats = this.mixinFormatsForExpression(formats);
    this.tryShowExpressionPanel(formats);
    this.setState({ formats });
  }

  getLastOps = (delta: Delta) => {
    const ops = (delta && delta.ops) || [];
    let lastOpIndex = ops.length - 1;
    let lastOp = ops[lastOpIndex];

    while (!lastOp.insert && lastOpIndex > 0) {
      lastOpIndex--;
      lastOp = ops[lastOpIndex];
    }
    return lastOp;
  }

  onQuillChange = (value: string, delta: Delta, source: Sources, quill: UnprivilegedEditor) => {
    this.setState({ html: value });
    if (source !== 'user') {
      return;
    }

    const selection = quill.getSelection(false);
    let formats = selection ? quill.getFormat(selection) : {};

    //Fix issue #382
    let lastOp = this.getLastOps(delta);
    const isEnder = lastOp && lastOp.insert === '\n';
    if (isEnder && formats.expid) {
      formats = {};
    }

    formats = this.mixinFormatsForLink(formats);
    formats = this.mixinFormatsForExpression(formats);
    this.setState({ formats });

  }

  render() {
    const { config: { text } } = this.props;
    return <div ref={this.domNode} className="w-100 h-100">
      <QuillComponent
        className="w-100 h-100"
        modules={modules}
        plugins={this.getPligins()}
        readOnly={false}
        onClick={this.onQuillComponentClick}
        onChange={this.onQuillChange}
        onChangeSelection={this.onChangeSelection}
        selallWhenActive={text === DEFAULTTEXT}
        defaultValue={text}>
      </QuillComponent>
    </div>
  }
}

const mapStateToProps = (state: IMState, ownProps: OwnProps) => {
  return {
    widgetJson: state.appConfig.widgets[ownProps.widgetId],
    widgetState: state.widgetsState[ownProps.widgetId] || Immutable({})
  }
}

export const WidgetInBuilder = ReactRedux.connect<ExtraProps, {}, OwnProps>(mapStateToProps)(_BuilderWidget);
