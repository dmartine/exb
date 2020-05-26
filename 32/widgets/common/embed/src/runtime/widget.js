"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
var jimu_ui_1 = require("jimu-ui");
var config_1 = require("../config");
var default_1 = require("./translations/default");
var embed_version_manager_1 = require("../embed-version-manager");
var Widget = /** @class */ (function (_super) {
    __extends(Widget, _super);
    function Widget(props) {
        var _this = _super.call(this, props) || this;
        _this.iframeOnLoad = function (evt) {
            // if(this.loadTimeOut){
            //   clearTimeout(this.loadTimeOut);
            //   this.loadTimeOut = undefined;
            // }
            var state = {
                isResetting: false
            };
            _this.setState(state);
        };
        _this.iFrameContentRender = function () {
            var embedType = _this.props.config.embedType;
            var content = _this.state.content;
            if (embedType === config_1.EmbedType.Code) {
                return { srcDoc: content };
            }
            if (embedType === config_1.EmbedType.Url) {
                return { src: content };
            }
        };
        _this.processUrl = function (url) {
            var _a, _b;
            if (!url)
                return url;
            //support Google Map, Youtube Facebook Vimeo now.
            var lowerUrl = url.toLowerCase();
            /**
             * support Google Map
             */
            // if(lowerUrl.indexOf('https://www.google.com/maps') > -1 || lowerUrl.indexOf('https://goo.gl/maps') > -1){//google map
            //   return url;
            // }
            /**
             * Vimeo
             */
            if (/https:\/\/vimeo\.com\/.*/.test(lowerUrl)) {
                url = jimu_core_1.urlUtils.removeSearchFromUrl(url);
                var splits = url.split('/');
                var id = splits[splits.length - 1];
                return "https://player.vimeo.com/video/" + id;
            }
            /**
             * Youtube
             */
            if (/https:\/\/www\.youtube\.com\/watch\?.*v=.*/.test(lowerUrl)) {
                var queryObj = (_a = jimu_core_1.queryString.parseUrl(url)) === null || _a === void 0 ? void 0 : _a.query;
                var id = (_b = queryObj) === null || _b === void 0 ? void 0 : _b['v'];
                return "https://www.youtube.com/embed/" + id;
            }
            else if (/https:\/\/youtu\.be\/.*/.test(lowerUrl)) {
                url = jimu_core_1.urlUtils.removeSearchFromUrl(url);
                var splits = url.split('/');
                var id = splits[splits.length - 1];
                return "https://www.youtube.com/embed/" + id;
            }
            /**
             * Facebook video
             */
            if (/https:\/\/www\.facebook\.com\/.*\/videos\/.*/.test(lowerUrl)) {
                return "https://www.facebook.com/plugins/video.php?href=" + lowerUrl + "&show_text=0";
            }
            if (!_this.checkURLFormat(url)) {
                url = 'about:blank';
            }
            return url;
        };
        _this.checkURLFormat = function (str) {
            if (!str || str === '')
                return false;
            var httpsRex = '^(([h][t]{2}[p][s])?://)';
            var re = new RegExp(httpsRex);
            if (!re.test(str)) {
                return false;
            }
            var index = str.indexOf('.');
            if (index < 0 || index === str.length - 1) {
                return false;
            }
            return true;
        };
        _this.formatMessage = function (id) {
            return _this.props.intl.formatMessage({ id: id, defaultMessage: default_1.default[id] });
        };
        _this.fetchUrl = function (url) { return __awaiter(_this, void 0, void 0, function () {
            var headers, result, json;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Access-Control-Allow-Origin': '*',
                            'Content-Type': 'text/json'
                        };
                        return [4 /*yield*/, fetch(url, {
                                method: 'get',
                                headers: headers,
                            }).catch(function (err) { })];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            return [2 /*return*/, Promise.resolve(null)];
                        return [4 /*yield*/, result.json().catch(function (error) { })];
                    case 2:
                        json = _a.sent();
                        return [2 /*return*/, Promise.resolve(json)];
                }
            });
        }); };
        _this.isUsedDataSource = function (props) {
            if (!props) {
                props = _this.props;
            }
            var useDataSources = props.useDataSources, useDataSourcesEnabled = props.useDataSourcesEnabled;
            return useDataSourcesEnabled && useDataSources && useDataSources.length > 0;
        };
        _this.onUrlExpResolveChange = function (result) {
            if (result.isSuccessful) {
                _this.setState({
                    content: _this.processUrl(result.value),
                    resolveErr: false
                });
            }
            else {
                _this.setState({
                    resolveErr: true
                });
            }
        };
        _this.getRecordsFromRepeatedDataSource = function () {
            var _a;
            var dataSourceId = _this.props.useDataSources && _this.props.useDataSources[0] && _this.props.useDataSources[0].dataSourceId;
            if (dataSourceId && _this.props.repeatedDataSource) {
                var record = _this.props.repeatedDataSource.record;
                return _a = {},
                    _a[dataSourceId] = record,
                    _a;
            }
            return null;
        };
        var config = props.config;
        var embedType = config.embedType, embedCode = config.embedCode;
        _this.errMessages = {
            unSupportUrl: _this.formatMessage('unSupportUrl'),
            unSupportIframeUrl: _this.formatMessage('unSupportIframeUrl'),
        };
        _this.checkUrl = _this.checkUrl.bind(_this);
        var state = {
            content: embedType === config_1.EmbedType.Url ? (_this.isUsedDataSource() ? undefined : _this.processUrl(config.staticUrl)) : embedCode,
            loadErr: false,
            resolveErr: false
        };
        if (state.content && state.content.trim().length > 0) {
            state.isResetting = true;
        }
        _this.state = state;
        return _this;
    }
    Widget.prototype.componentDidMount = function () {
        var config = this.props.config;
        var embedType = config.embedType;
        var content = this.state.content;
        if (embedType === config_1.EmbedType.Url) {
            this.checkUrl(content);
        }
    };
    Widget.prototype.componentDidUpdate = function (preProps, preStates) {
        var _this = this;
        var _a = this.props.config, embedCode = _a.embedCode, embedType = _a.embedType, staticUrl = _a.staticUrl;
        if (embedType !== preProps.config.embedType) {
            var content_1 = embedType === config_1.EmbedType.Url ? (this.isUsedDataSource() ? undefined : this.processUrl(staticUrl)) : embedCode;
            this.setState({
                content: content_1
            });
        }
        else {
            if (embedType === config_1.EmbedType.Url) {
                var nowUsedDataSource = this.isUsedDataSource();
                var preUsedDataSource = this.isUsedDataSource(preProps);
                //if usedDataSource, the content will be changed by expression resolver component
                if (!nowUsedDataSource || nowUsedDataSource !== preUsedDataSource) {
                    var content_2 = this.isUsedDataSource() ? undefined : this.processUrl(staticUrl);
                    this.setState({
                        content: content_2
                    });
                }
            }
            else {
                if (preProps.config.embedCode !== embedCode) {
                    this.setState({
                        content: embedCode
                    });
                }
            }
        }
        var content = this.state.content;
        var oldContent = preStates.content;
        if (content !== oldContent) {
            this.setState({
                isResetting: !!content,
                loadErr: false
            }, function () {
                if (embedType === config_1.EmbedType.Url) {
                    _this.checkUrl(content);
                }
            });
        }
    };
    Widget.prototype.checkUrl = function (url) {
        var _this = this;
        var _a, _b, _c;
        if (!this.checkURLFormat(url)) {
            this.setState({
                loadErr: true,
                errMessage: this.errMessages.unSupportUrl
            });
            return;
        }
        var appMode = (_c = (_b = (_a = jimu_core_1.getAppStore()) === null || _a === void 0 ? void 0 : _a.getState()) === null || _b === void 0 ? void 0 : _b.appRuntimeInfo) === null || _c === void 0 ? void 0 : _c.appMode;
        if (!url || !window.jimuConfig.isInBuilder || appMode === jimu_core_1.AppMode.Run)
            return;
        if (url.indexOf('https://www.facebook.com/plugins/video.php?show_text=0&href=') > -1 ||
            url.indexOf('https://www.youtube.com/embed/') > -1 ||
            url.indexOf('https://player.vimeo.com/video/') > -1) {
            this.setState({
                loadErr: false
            });
            return;
        }
        this.fetchUrl(window.location.origin + "/check_url?url=" + url).then(function (res) {
            var _a, _b, _c, _d, _e, _f;
            var canLoadUrl = true;
            if (res && res.success) {
                var data = res.data;
                var status_1 = (_a = data) === null || _a === void 0 ? void 0 : _a.status;
                if (status_1 && status_1 < 400) {
                    var contentSecurityPolicy = (_c = (_b = data) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c['content-security-policy'];
                    if (contentSecurityPolicy) {
                        canLoadUrl = false;
                    }
                    var xFrameOptions = (_f = (_e = (_d = data) === null || _d === void 0 ? void 0 : _d.headers) === null || _e === void 0 ? void 0 : _e['x-frame-options']) === null || _f === void 0 ? void 0 : _f.toLowerCase();
                    if (xFrameOptions) {
                        if (xFrameOptions === 'deny') {
                            canLoadUrl = false;
                        }
                        else if (xFrameOptions === 'sameorigin') {
                            if (!_this.isOriginSameAsLocation(url)) {
                                canLoadUrl = false;
                            }
                        }
                    }
                }
                else {
                    canLoadUrl = false;
                }
            }
            else {
                canLoadUrl = false;
            }
            var alterState = {
                loadErr: !canLoadUrl
            };
            if (!canLoadUrl) {
                alterState.isResetting = false;
                alterState.errMessage = _this.errMessages.unSupportIframeUrl;
            }
            _this.setState(alterState);
        });
    };
    Widget.prototype.isOriginSameAsLocation = function (url) {
        var pageLocation = window.location;
        var URL_HOST_PATTERN = /(\w+:)?(?:\/\/)([\w.-]+)?(?::(\d+))?\/?/;
        var urlMatch = URL_HOST_PATTERN.exec(url) || [];
        var urlparts = {
            protocol: urlMatch[1] || '',
            host: urlMatch[2] || '',
            port: urlMatch[3] || ''
        };
        var defaultPort = function (protocol) {
            return { 'http:': 80, 'https:': 443 }[protocol];
        };
        var portOf = function (location) {
            return location.port || defaultPort(location.protocol || pageLocation.protocol);
        };
        return !!((urlparts.protocol && (urlparts.protocol == pageLocation.protocol)) &&
            (urlparts.host && (urlparts.host == pageLocation.host)) &&
            (urlparts.host && (portOf(urlparts) == portOf(pageLocation))));
    };
    Widget.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.state, isResetting = _b.isResetting, loadErr = _b.loadErr, errMessage = _b.errMessage, resolveErr = _b.resolveErr;
        var _c = this.props, theme = _c.theme, id = _c.id, config = _c.config;
        var embedCode = config.embedCode, embedType = config.embedType, staticUrl = config.staticUrl, expression = config.expression;
        var isDataSourceUsed = this.props.useDataSourcesEnabled;
        var showPlaceholder = embedType === config_1.EmbedType.Code ? !embedCode :
            ((!staticUrl && !isDataSourceUsed) || (isDataSourceUsed && !expression));
        if (showPlaceholder) {
            return jimu_core_1.React.createElement(jimu_ui_1.WidgetPlaceholder, { widgetId: this.props.id, icon: require('./assets/icon.svg'), message: this.formatMessage('embedHint') });
        }
        return (jimu_core_1.React.createElement("div", { style: { width: '100%', height: '100%', position: 'relative' }, className: "jimu-widget widget-embed" },
            jimu_core_1.React.createElement("iframe", __assign({ className: "iframe-" + id, style: { width: '100%', height: '100%' }, sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-presentation", allowFullScreen: true, onLoad: this.iframeOnLoad }, (this.iFrameContentRender()), { frameBorder: "0", ref: function (f) { _this.ifr = f; } })),
            isResetting && jimu_core_1.React.createElement("div", { className: "jimu-secondary-loading" }),
            loadErr &&
                jimu_core_1.React.createElement("div", { className: "mask text-center", style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        paddingTop: '30%',
                        backgroundColor: theme.colors.white
                    } }, errMessage),
            resolveErr && isDataSourceUsed &&
                jimu_core_1.React.createElement("div", { className: "mask text-center", style: {
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        paddingTop: '30%',
                        backgroundColor: theme.colors.white
                    } }, (_a = expression) === null || _a === void 0 ? void 0 : _a.name),
            jimu_core_1.React.createElement("div", { style: { display: 'none' } }, isDataSourceUsed && embedType === config_1.EmbedType.Url && expression &&
                jimu_core_1.React.createElement("div", null,
                    jimu_core_1.React.createElement(jimu_core_1.ExpressionResolverComponent, { useDataSources: this.props.useDataSources, expression: expression, onChange: this.onUrlExpResolveChange })))));
    };
    Widget.versionManager = embed_version_manager_1.versionManager;
    return Widget;
}(jimu_core_1.BaseWidget));
exports.default = Widget;
//# sourceMappingURL=widget.js.map