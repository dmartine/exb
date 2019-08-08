"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const utils = require("util");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const SystemJS = require("systemjs");
const fetch = require("cross-fetch");
const queryString = require("query-string");
const exb_path_util_1 = require("exb-path-util");
const arcgis_rest_request_1 = require("@esri/arcgis-rest-request");
const arcgis_rest_portal_1 = require("@esri/arcgis-rest-portal");
const arcgis_rest_auth_1 = require("@esri/arcgis-rest-auth");
//copy code here for simple.
var ArcGISDataSourceTypes;
(function (ArcGISDataSourceTypes) {
    ArcGISDataSourceTypes["Map"] = "MAP";
    ArcGISDataSourceTypes["WebMap"] = "WEB_MAP";
    ArcGISDataSourceTypes["WebScene"] = "WEB_SCENE";
    ArcGISDataSourceTypes["MapView"] = "MAP_VIEW";
    ArcGISDataSourceTypes["SceneView"] = "SCENE_VIEW";
    ArcGISDataSourceTypes["FeatureLayer"] = "FEATURE_LAYER";
    ArcGISDataSourceTypes["FeatureLayerView"] = "FEATURE_LAYER_VIEW";
})(ArcGISDataSourceTypes || (ArcGISDataSourceTypes = {}));
const readFile = utils.promisify(fs.readFile);
function default_1(options) {
    initSystemJS(options);
    let $;
    return function ssr(ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let urlPath = options.urlPath;
            let ctxPath = ctx.path;
            if (urlPath === '/site/' && ctxPath === '/') {
                ctxPath = '/site';
            }
            if (!new RegExp(`^${urlPath}`).test(exb_path_util_1.fixPath(ctxPath))) {
                yield next();
                return;
            }
            if (!exb_path_util_1.isIndexPath(ctxPath, urlPath)) {
                yield next();
                return;
            }
            console.time('SSR');
            initGlobal(ctx.request, options);
            try {
                //what the following does is similar to client/stemapp/index.tsx
                if (!$) {
                    $ = yield loadIndexHTML(options);
                }
                if (ctx.app.env === 'development') {
                    let systemjsRegistrySymbol = Object.getOwnPropertySymbols(SystemJS.registry)[0];
                    Object.keys(SystemJS.registry[systemjsRegistrySymbol]).forEach(key => {
                        // if(!/^@/.test(key)){
                        SystemJS.delete(key);
                        // }
                    });
                }
                let jimuCore = yield SystemJS.import('jimu-core/index.js');
                yield jimuCore.init();
                setSizeMode(jimuCore, ctx);
                let jimuArcGISExt = yield SystemJS.import('jimu-arcgis/dependency-extension.js');
                jimuCore.ExtensionManager.getInstance().registerExtension({
                    epName: jimuCore.extensionSpec.ExtensionPoints.DependencyDefine,
                    extension: new jimuArcGISExt.ArcGISDependencyDefineExtension()
                });
                jimuCore.ExtensionManager.getInstance().registerExtension({
                    epName: jimuCore.extensionSpec.ExtensionPoints.DataSourceFactoryUri,
                    extension: new jimuArcGISExt.ArcGISDataSourceFactoryUriExtension()
                });
                initSession(jimuCore, ctx);
                yield jimuCore.initPortal();
                if (options.urlPath === '/builder/') {
                    let jimuForBuilderExt = yield SystemJS.import('jimu-for-builder');
                    jimuCore.ExtensionManager.getInstance().registerExtension({
                        epName: jimuCore.extensionSpec.ExtensionPoints.ReduxStore,
                        extension: new jimuForBuilderExt.AppStateReduxStoreExtension()
                    });
                    jimuCore.ExtensionManager.getInstance().registerExtension({
                        epName: jimuCore.extensionSpec.ExtensionPoints.ReduxStore,
                        extension: new jimuForBuilderExt.AppStateHistoryExtension()
                    });
                    jimuCore.ExtensionManager.getInstance().registerExtension({
                        epName: jimuCore.extensionSpec.ExtensionPoints.ReduxStore,
                        extension: new jimuForBuilderExt.BuilderStateReduxStoreExtension()
                    });
                }
                let rawAppConfig = yield loadRawAppConfig(jimuCore, ctx, options);
                let appConfig = yield jimuCore.ConfigManager.getInstance({ intl: {} }).processRawConfig(rawAppConfig);
                jimuCore.getAppStore().dispatch(jimuCore.appActions.appConfigLoaded(appConfig));
                yield loadLayoutPageRender(jimuCore.moduleLoader);
                yield loadAllWidgets(appConfig, jimuCore);
                yield loadTheme(appConfig.theme, jimuCore);
                let AppRoot = jimuCore.AppRoot;
                let appRootString = ReactDOMServer.renderToString(React.createElement(AppRoot, null));
                // let allWidgetStyles = await loadAllWidgetStyle(appConfig, options);
                let initState = jimuCore.getAppStore().getState();
                let inistStateStr = JSON.stringify(initState, (key, value) => {
                    return typeof value === 'string' ? encodeURIComponent(value) : value;
                });
                yield appendMeta(jimuCore, $, appConfig);
                $('head title').html(appConfig.attributes.title);
                // $('head').append(allWidgetStyles);
                $('head').append(`<script>window.initStoreState = JSON.parse(\`${inistStateStr}\`, function(key, value){return typeof value === 'string'? decodeURIComponent(value): value})</script>`);
                $('#app').html(appRootString);
                ctx.body = $.html();
                console.timeEnd('SSR');
                return;
            }
            catch (err) {
                ctx.body = err.stack || err.message;
                return;
            }
        });
    };
}
exports.default = default_1;
const PACKAGES_IN_APP_FOLDER = false;
function initGlobal(req, options) {
    let window = {};
    window.isNode = true;
    window.SystemJS = SystemJS;
    window.fetch = fetch;
    window.jimuConfig = {
        locale: getLocaleFromRequest(req),
        isBuilder: false,
        isInBuilder: false,
        mountPath: options.mountPath,
        rootPath: options.urlPath,
        packagesInAppFolder: PACKAGES_IN_APP_FOLDER,
        useStructuralUrl: options.useStructuralUrl
    };
    window.require = require;
    window.location = {
        host: req.host,
        hostname: req.hostname,
        href: req.href,
        protocol: req.protocol + ':',
        pathname: req.path,
        search: req.search,
        origin: req.origin
    };
    global.window = window;
    global.fetch = fetch;
    global.document = undefined;
}
function getLocaleFromRequest(req) {
    let header = req.headers['accept-language'];
    return header.split(';')[0].split(',')[0];
}
function initSystemJS(options) {
    SystemJS.config({
        baseURL: PACKAGES_IN_APP_FOLDER ? options.path : path.join(options.path, '..'),
        map: {
            'css-loader': 'jimu-core/systemjs-plugin-css.js',
            'dojo-loader': 'jimu-core/systemjs-plugin-dojo.js'
        },
        packages: {
            'jimu-core': {
                main: 'index.js',
                format: 'amd'
            },
            'jimu-arcgis': {
                main: 'index.js',
                format: 'amd'
            },
            'jimu-for-builder': {
                main: 'index.js',
                format: 'amd'
            },
            'jimu-ui': {
                main: 'index.js',
                format: 'amd'
            },
            'jimu-layouts': {
                main: 'index.js',
                format: 'amd'
            },
            'hub-common': {
                main: 'index.js',
                format: 'amd'
            },
            widgets: {
                format: 'amd'
            },
            skins: {
                format: 'amd'
            },
            builder: {
                format: 'amd',
            }
        },
        meta: {
            '*/dojo.js': {
                scriptLoad: true,
                format: 'global'
            },
            'css-loader': { format: 'cjs' },
            'dojo-loader': { format: 'cjs' },
            '*.css': { loader: 'css-loader' },
            'dojo/*': { loader: 'dojo-loader', format: 'amd' },
            'dijit/*': { loader: 'dojo-loader', format: 'amd' },
            'dojox/*': { loader: 'dojo-loader', format: 'amd' },
            'dgrid/*': { loader: 'dojo-loader', format: 'amd' },
            'moment/*': { loader: 'dojo-loader', format: 'amd' },
            '@dojo/*': { loader: 'dojo-loader', format: 'amd' },
            'tslib/*': { loader: 'dojo-loader', format: 'amd' },
            'cldrjs/*': { loader: 'dojo-loader', format: 'amd' },
            'globalize/*': { loader: 'dojo-loader', format: 'amd' },
            'maquette/*': { loader: 'dojo-loader', format: 'amd' },
            'maquette-jsx/*': { loader: 'dojo-loader', format: 'amd' },
            'maquette-css-transitions/*': { loader: 'dojo-loader', format: 'amd' },
            'esri/*': { loader: 'dojo-loader', format: 'amd' }
        }
    });
}
function loadIndexHTML(options) {
    return readFile(`${options.path}index.html`, 'utf-8')
        .then(content => {
        content = exb_path_util_1.replaceContent(content);
        return cheerio.load(content);
    });
}
function loadRawAppConfig(jimuCore, ctx, options) {
    let queryObject = queryString.parse(ctx.request.search);
    if (queryObject.config) {
        let rawAppConfig = JSON.parse(fs.readFileSync(path.join(options.path, `${queryObject.config}`), 'utf-8'));
        return Promise.resolve(rawAppConfig);
    }
    let session = jimuCore.SessionManager.getInstance().getSession();
    let token = session ? session.token : null;
    let pathInfo = jimuCore.urlUtils.getAppIdPageIdFromUrl();
    let getPortalRestUrl = jimuCore.portalUrlUtils.getPortalRestUrl;
    if (pathInfo.appId) {
        if (queryObject.draft === 'true' || queryObject.draft === '1') {
            return arcgis_rest_request_1.request(`${getPortalRestUrl(jimuCore.getAppStore().getState().portalUrl)}/content/items/${pathInfo.appId}/resources/config/config.json`, {
                params: token ? { token: token } : null
            });
        }
        return arcgis_rest_portal_1.getItemData(pathInfo.appId, {
            params: token ? { token: token } : null
        });
    }
    let rawAppConfig = JSON.parse(fs.readFileSync(path.join(options.path, 'config.json'), 'utf-8'));
    return Promise.resolve(rawAppConfig);
}
function initSession(jimuCore, ctx) {
    const builderSetting = require('../../../../client/dist/builder/setting.json');
    const hostEnv = global.hostEnv || 'prod';
    const info = builderSetting.env[hostEnv];
    const CLIENT_ID = info.clientId;
    let esriCookie = ctx.cookies.get('esri_auth');
    if (esriCookie) {
        const cookieJson = JSON.parse(decodeURIComponent(esriCookie));
        const portal = `https://${cookieJson.urlKey}.${cookieJson.customBaseUrl}/sharing/rest/`;
        jimuCore.SessionManager.getInstance().setSession(new arcgis_rest_auth_1.UserSession({
            clientId: CLIENT_ID,
            token: cookieJson.token,
            tokenExpires: new Date(cookieJson.expires),
            portal,
            username: cookieJson.email
        }));
    }
}
/* function loadAllWidgetStyle(appConfig, options: Options): Promise<string>{
  let widgets = [];
  Object.keys(appConfig.widgets).forEach(wId => {
    if(!widgets.find(w => w.manifest.name === appConfig.widgets[wId].manifest.name)){
      widgets.push(appConfig.widgets[wId]);
    }
  });
  return Promise.all(widgets.map(widget => {
    if(widget.manifest.properties.hasStyle){
      return readFile(path.join(options.path, `../${widget.uri}dist/runtime/css/style.css`), 'utf-8')
        .then(styleStr => {
          return `<style id=${widget.manifest.name}>${styleStr}</style>`
        });
    }else{
      return Promise.resolve('');
    }
  })).then(styles => {
    return styles.filter(style => style).join('');
  });
} */
function loadAllWidgets(appConfig, jimuCore) {
    const widgetManager = jimuCore.WidgetManager.getInstance();
    const utils = jimuCore.utils;
    return Promise.all(Object.keys(appConfig.widgets).map(wId => {
        let widget = appConfig.widgets[wId];
        if (!widget.manifest.properties.hasMainClass) {
            return Promise.resolve();
        }
        if (!utils.isWidgetSupportSSR(appConfig, widget.id, Object.keys(ArcGISDataSourceTypes).map(k => ArcGISDataSourceTypes[k]))) {
            return Promise.resolve();
        }
        return widgetManager.loadWidgetClass(wId);
    }));
}
function loadTheme(themeName, jimuCore) {
    return jimuCore.ThemeManager.getInstance().init(themeName).then(() => {
        return jimuCore.ThemeManager.getInstance().loadThemeVariables(themeName).then(themeVars => {
            jimuCore.getAppStore().dispatch(jimuCore.appActions.themeVariablesLoaded(themeVars));
            return themeVars;
        });
    });
}
function appendMeta(jimuCore, $, appConfig) {
    let attr = appConfig.attributes;
    if (attr && attr.title) {
        _appendMeta($, attr);
        return Promise.resolve();
    }
    let pathInfo = jimuCore.urlUtils.getAppIdPageIdFromUrl();
    if (!pathInfo.appId) {
        // console.error('Not find app id.');
        return Promise.resolve();
    }
    let session = jimuCore.SessionManager.getInstance().getSession();
    let token = session ? session.token : null;
    let getPortalRestUrl = jimuCore.portalUrlUtils.getPortalRestUrl;
    return arcgis_rest_portal_1.getItem(pathInfo.appId, {
        portal: getPortalRestUrl(jimuCore.getAppStore().getState().portalUrl),
        params: token ? { token: token } : null
    }).then(itemInfo => {
        attr = {
            title: itemInfo.title,
            description: itemInfo.description,
            thumbnail: itemInfo.thumbnail
        };
        _appendMeta($, attr);
        return Promise.resolve();
    });
}
function _appendMeta($, attr) {
    let head = $('head');
    head.append(`<meta property="description" content="${attr.description}"/>`);
    head.append(`<meta property="og:type" content="app"/>`);
    head.append(`<meta property="og:title" content="${attr.title}"/>`);
    head.append(`<meta property="og:description" content="${attr.description}"/>`);
    head.append(`<meta property="og:image" content=${attr.thumbnail}/>`);
}
function loadLayoutPageRender(moduleLoader) {
    let pageRendererPath;
    if (global.window.jimuConfig.isInBuilder) {
        pageRendererPath = 'jimu-layouts/layout-builder';
    }
    else {
        pageRendererPath = 'jimu-layouts/layout-runtime';
    }
    return moduleLoader.loadModule(pageRendererPath);
}
function setSizeMode(jimuCore, ctx) {
    // TODO get size mode from device
    jimuCore.getAppStore().dispatch(jimuCore.appActions.browserSizeModeChanged(jimuCore.BrowserSizeMode.LARGE));
}
//# sourceMappingURL=index.js.map