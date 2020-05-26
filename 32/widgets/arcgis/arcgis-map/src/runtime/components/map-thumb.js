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
Object.defineProperty(exports, "__esModule", { value: true });
var jimu_core_1 = require("jimu-core");
var jimu_ui_1 = require("jimu-ui");
var MapThumb = /** @class */ (function (_super) {
    __extends(MapThumb, _super);
    function MapThumb(props) {
        var _this = _super.call(this, props) || this;
        _this.unmount = false;
        _this.setMapThumbUrl = function (mapId) {
            if (!mapId) {
                _this.setState({ mapThumbUrl: null });
            }
            if (!_this.props.portUrl || _this.props.portUrl === jimu_core_1.getAppStore().getState().portalUrl) {
                // if no portalUrl or same to config portalurl, use app config's portalUrl
                var portalUrl_1 = jimu_core_1.getAppStore().getState().portalUrl;
                jimu_core_1.esri.restPortal.searchItems({
                    q: "id:" + mapId,
                    authentication: jimu_core_1.SessionManager.getInstance().getMainSession(),
                    portal: portalUrl_1 + '/sharing/rest'
                }).then(function (items) {
                    if (!_this.unmount) {
                        if (items.results[0]) {
                            var session = jimu_core_1.SessionManager.getInstance().getMainSession();
                            var tempThumbUrl = null;
                            if (session && session.token) {
                                tempThumbUrl = portalUrl_1 + "/sharing/rest/content/items/" + items.results[0].id + "/"
                                    + ("info/" + items.results[0].thumbnail + "?token=" + session.token);
                            }
                            else {
                                tempThumbUrl = portalUrl_1 + "/sharing/rest/content/items/" + items.results[0].id + "/"
                                    + ("info/" + items.results[0].thumbnail);
                            }
                            _this.setState({ mapThumbUrl: tempThumbUrl });
                        }
                        else {
                            _this.setState({ mapThumbUrl: null });
                        }
                    }
                });
            }
            else {
                // use other portalUrl
                jimu_core_1.esri.restPortal.searchItems({
                    q: "id:" + mapId,
                    portal: _this.props.portUrl + '/sharing/rest'
                }).then(function (items) {
                    if (!_this.unmount) {
                        if (items.results[0]) {
                            var tempThumbUrl = _this.props.portUrl + "/sharing/rest/content/items/" + items.results[0].id + "/"
                                + ("info/" + items.results[0].thumbnail);
                            _this.setState({ mapThumbUrl: tempThumbUrl });
                        }
                        else {
                            _this.setState({ mapThumbUrl: null });
                        }
                    }
                });
            }
        };
        _this.state = {
            mapThumbUrl: null
        };
        return _this;
    }
    MapThumb.prototype.componentDidMount = function () {
        this.unmount = false;
        this.setMapThumbUrl(this.props.mapItemId);
    };
    MapThumb.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevProps.mapItemId !== this.props.mapItemId) {
            this.setMapThumbUrl(this.props.mapItemId);
        }
    };
    MapThumb.prototype.componentWillUnmount = function () {
        this.unmount = true;
    };
    MapThumb.prototype.render = function () {
        if (this.state.mapThumbUrl) {
            return jimu_core_1.React.createElement(jimu_ui_1.ImageWithParam, { imageParam: { url: this.state.mapThumbUrl } });
        }
        else {
            return jimu_core_1.React.createElement(jimu_ui_1.ImageWithParam, { imageParam: {} });
        }
    };
    return MapThumb;
}(jimu_core_1.React.PureComponent));
exports.default = MapThumb;
//# sourceMappingURL=map-thumb.js.map