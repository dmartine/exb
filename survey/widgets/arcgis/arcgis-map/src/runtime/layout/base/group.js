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
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
/** @jsx jsx */
var jimu_core_1 = require("jimu-core");
var ui_component_1 = require("./ui-component");
var base_tool_shell_1 = require("./base-tool-shell");
var tool_modules_1 = require("../tool-modules");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(props) {
        var _this = _super.call(this, props) || this;
        _this.moveY = 0;
        _this.startY = 0;
        _this.sliding = false;
        _this.startDrag = false;
        _this.currentBottomPanelHeight = 0;
        _this.thumbMapElementNames = ['FullScreen', 'Zoom', 'MapSwitch'];
        _this.checkIsHiddenElement = function (elementName) {
            if (_this.props.hiddenElementNames) {
                if (_this.props.hiddenElementNames.indexOf(elementName) > -1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        };
        _this.start = function (event, type) {
            _this.startDrag = true;
            if (type === 'touch') {
                _this.moveY = 0;
                var touch = event.touches[0];
                _this.startY = touch.clientY;
            }
            if (type === 'mouse') {
                _this.moveY = 0;
                _this.startY = event.clientY;
            }
            document.getElementById(_this.props.jimuMapView.id + "-bottom-panel").classList.remove('expand-mobile-panel-transition');
        };
        _this.move = function (event, type) {
            if (type === 'touch') {
                _this.sliding = true;
                var touch = event.touches[0];
                _this.moveY = (touch.clientY - _this.startY) * -1;
            }
            if (type === 'mouse' && _this.startDrag) {
                _this.sliding = true;
                _this.moveY = (event.clientY - _this.startY) * -1;
            }
            if (type === 'mouse' && !_this.startDrag) {
                return;
            }
            var expectHeight = 150;
            if (_this.state.bottomPanelHeight + _this.moveY > expectHeight) {
                expectHeight = _this.state.bottomPanelHeight + _this.moveY;
            }
            document.getElementById(_this.props.jimuMapView.id + "-bottom-panel").style.height = expectHeight + "px";
            _this.currentBottomPanelHeight = expectHeight;
            var aboveHeight = _this.state.widgetHeight - (expectHeight);
            if (aboveHeight > 360) {
                _this.props.onSetHiddenElementNames([]);
            }
            if (aboveHeight > 200 && aboveHeight <= 360) {
                _this.props.onSetHiddenElementNames(_this.props.layoutConfig.mobileResponsiveStrategy['stage1']);
            }
            if (aboveHeight > 54 && aboveHeight <= 200) {
                _this.props.onSetHiddenElementNames(_this.props.layoutConfig.mobileResponsiveStrategy['stage2']);
            }
            if (aboveHeight < 54) {
                _this.props.onSetHiddenElementNames(_this.props.layoutConfig.mobileResponsiveStrategy['stage3']);
            }
        };
        _this.end = function (event, type) {
            if (type === 'mouse' && !_this.startDrag) {
                return;
            }
            _this.startDrag = false;
            _this.sliding = false;
            document.getElementById(_this.props.jimuMapView.id + "-bottom-panel").classList.add('expand-mobile-panel-transition');
            if (type === 'touch') {
                if (Math.abs(_this.moveY) < 10) {
                    document.getElementById(_this.props.jimuMapView.id + "-bottom-panel").style.height = _this.state.bottomPanelHeight + "px";
                    _this.currentBottomPanelHeight = _this.state.bottomPanelHeight;
                    return;
                }
            }
            if (_this.moveY >= 0) {
                // up slider
                var targetBottomPanelHeight = 0;
                if (_this.currentBottomPanelHeight >= 150 && _this.currentBottomPanelHeight < _this.state.widgetHeight * 0.6) {
                    targetBottomPanelHeight = _this.state.widgetHeight * 0.6;
                }
                else if (_this.currentBottomPanelHeight >= _this.state.widgetHeight * 0.6 && _this.currentBottomPanelHeight < _this.state.widgetHeight) {
                    targetBottomPanelHeight = _this.state.widgetHeight - 20;
                }
                else {
                    targetBottomPanelHeight = 150;
                }
                _this.setState({
                    bottomPanelHeight: targetBottomPanelHeight
                }, function () {
                    _this.checkResponsive();
                });
                _this.currentBottomPanelHeight = targetBottomPanelHeight;
            }
            else {
                // down slider
                var targetBottomPanelHeight = 0;
                if (_this.currentBottomPanelHeight > 150 && _this.currentBottomPanelHeight < _this.state.widgetHeight * 0.6) {
                    targetBottomPanelHeight = 150;
                }
                else if (_this.currentBottomPanelHeight >= _this.state.widgetHeight * 0.6 && _this.currentBottomPanelHeight < _this.state.widgetHeight) {
                    targetBottomPanelHeight = _this.state.widgetHeight * 0.6;
                }
                else {
                    targetBottomPanelHeight = 150;
                }
                _this.setState({
                    bottomPanelHeight: targetBottomPanelHeight
                }, function () {
                    _this.checkResponsive();
                });
                _this.currentBottomPanelHeight = targetBottomPanelHeight;
            }
        };
        _this.checkResponsive = function () {
            if (_this.state.isThumbMap) {
                _this.props.onSetHiddenElementNames([]);
                return;
            }
            if (_this.state.bottomPanelHeight === 0) {
                _this.props.onActiveToolNameChange(null);
                _this.props.onSetHiddenElementNames([]);
                return;
            }
            var aboveHeight = _this.state.widgetHeight - (_this.state.bottomPanelHeight);
            if (aboveHeight > 360) {
                _this.props.onSetHiddenElementNames([]);
            }
            if (aboveHeight > 200 && aboveHeight <= 360) {
                _this.props.onSetHiddenElementNames(_this.props.layoutConfig.mobileResponsiveStrategy['stage1']);
            }
            if (aboveHeight > 54 && aboveHeight <= 200) {
                _this.props.onSetHiddenElementNames(_this.props.layoutConfig.mobileResponsiveStrategy['stage2']);
            }
            if (aboveHeight < 54) {
                _this.props.onSetHiddenElementNames(_this.props.layoutConfig.mobileResponsiveStrategy['stage3']);
            }
        };
        _this.onResize = function (width, height) {
            if (!width || !height) {
                return;
            }
            _this.setState({
                widgetWidth: width,
                widgetHeight: height,
                isThumbMap: false
            }, function () {
                _this.checkResponsive();
            });
        };
        _this.returnNullNode = function (key) {
            if (_this.props.isMobile) {
                return jimu_core_1.jsx("span", { key: key });
            }
            else {
                return null;
            }
        };
        _this.checkIsLastElement = function (parentGroupJson, toolJson) {
            var toolName = toolJson.toolName;
            var layoutJson = _this.props.layoutConfig;
            var children = layoutJson.layout[parentGroupJson.groupName].children;
            var index = children.indexOf(toolName);
            if (index === children.length - 1) {
                return true;
            }
            if (index < children.length - 1) {
                var isLastElement = true;
                for (var i = (index + 1); i < children.length; i++) {
                    var elementName = children[i];
                    if (layoutJson.elements[children[i]].type === 'GROUP') {
                        continue;
                    }
                    else if ((!tool_modules_1.default[elementName].getIsNeedSetting() || (_this.props.toolConfig && _this.props.toolConfig["can" + elementName])
                        || (layoutJson.lockToolNames && layoutJson.lockToolNames.indexOf(elementName) > -1))) {
                        isLastElement = false;
                        break;
                    }
                    else {
                        continue;
                    }
                }
                return isLastElement;
            }
        };
        _this.getGroupContent = function (layoutJson) {
            if (!layoutJson) {
                return _this.returnNullNode();
            }
            else {
                var children = layoutJson.layout[_this.props.groupName] && layoutJson.layout[_this.props.groupName].children;
                if (_this.checkIsShowGroup(layoutJson, children)) {
                    return jimu_core_1.jsx("div", { css: _this.getStyle(), className: jimu_core_1.classNames('exbmap-ui exbmap-ui-group', _this.props.className, { 'exbmap-ui-hidden-element': _this.props.isHidden }), style: _this.props.style },
                        children.map(function (key, index) {
                            if (!layoutJson.elements[key]) {
                                return _this.returnNullNode(index);
                            }
                            if (layoutJson.elements[key].type === 'GROUP') {
                                return jimu_core_1.jsx(Group, { isHidden: _this.checkIsHiddenElement(key), className: layoutJson.elements[key].className, style: layoutJson.elements[key].style, key: index, layoutConfig: layoutJson, toolConfig: _this.props.toolConfig, isMobile: _this.props.isMobile, intl: _this.props.intl, jimuMapView: _this.props.jimuMapView, groupName: key, activeToolName: _this.props.activeToolName, hiddenElementNames: _this.props.hiddenElementNames, onActiveToolNameChange: _this.props.onActiveToolNameChange, isThumbMap: _this.props.isMainGroup ? _this.state.isThumbMap : _this.props.isThumbMap });
                            }
                            else if (layoutJson.elements[key].type === 'TOOL') {
                                if (!tool_modules_1.default[key].getIsNeedSetting() || (_this.props.toolConfig && _this.props.toolConfig["can" + key]) || (layoutJson.lockToolNames && layoutJson.lockToolNames.indexOf(key) > -1)) {
                                    return jimu_core_1.jsx(base_tool_shell_1.default, { isHidden: _this.checkIsHiddenElement(key), key: index, layoutConfig: layoutJson, activeToolName: _this.props.activeToolName, toolConfig: _this.props.toolConfig, jimuMapView: _this.props.jimuMapView, toolName: key, onActiveToolNameChange: _this.props.onActiveToolNameChange, intl: _this.props.intl, isMobile: _this.props.isMobile, isLastElement: _this.checkIsLastElement(layoutJson.elements[_this.props.groupName], layoutJson.elements[key]) });
                                }
                                else {
                                    return _this.returnNullNode(index);
                                }
                            }
                            else {
                                return _this.returnNullNode(index);
                            }
                        }),
                        _this.props.isMobile && _this.props.isMainGroup && jimu_core_1.jsx(jimu_core_1.ReactResizeDetector, { handleWidth: true, handleHeight: true, onResize: _this.onResize }),
                        _this.props.isMainGroup && jimu_core_1.jsx("div", { className: "exbmap-ui w-100", style: { position: 'relative', pointerEvents: 'auto', overflow: 'hidden', touchAction: 'none',
                                display: _this.props.isMobile && !(_this.state.isThumbMap || _this.props.isThumbMap) ? 'block' : 'none' }, ref: function (ref) {
                                if (ref) {
                                    ref.addEventListener('touchmove', function (e) {
                                        e.preventDefault();
                                    }, { passive: false });
                                }
                            } },
                            jimu_core_1.jsx("div", { id: _this.props.jimuMapView.id + "-bottom-panel", className: 'exbmap-ui w-100 expand-mobile-panel expand-mobile-panel-transition', style: { overflow: 'hidden', pointerEvents: 'auto', position: 'relative', backgroundColor: '#fff', touchAction: 'none',
                                    height: (_this.sliding ? _this.currentBottomPanelHeight : _this.state.bottomPanelHeight) + "px" } }),
                            _this.props.activeToolName && jimu_core_1.jsx("div", { style: { touchAction: 'none' }, className: "expand-mobile-panel-touch-container d-flex justify-content-center align-items-center", onMouseDown: function (e) { return _this.start(e, 'mouse'); }, onMouseMove: function (e) { _this.move(e, 'mouse'); }, onMouseLeave: function (e) { _this.end(e, 'mouse'); }, onMouseUp: function (e) { _this.end(e, 'mouse'); }, onTouchStart: function (e) { return _this.start(e, 'touch'); }, onTouchMove: function (e) { _this.move(e, 'touch'); }, onTouchEnd: function (e) { _this.end(e, 'touch'); } },
                                jimu_core_1.jsx("div", { className: "expand-mobile-panel-bar" }))));
                }
                else {
                    return _this.returnNullNode();
                }
            }
        };
        _this.checkIsShowGroup = function (layoutJson, children) {
            if (!children || children.length === 0) {
                return false;
            }
            else {
                var toolNames = [];
                _this.findAllToolNames(layoutJson, children, toolNames);
                var isShowGroup = false;
                for (var i = 0; i < toolNames.length; i++) {
                    if (_this.props.toolConfig["can" + toolNames[i]] || !tool_modules_1.default[toolNames[i]].getIsNeedSetting()
                        || (layoutJson.lockToolNames && layoutJson.lockToolNames.indexOf(toolNames[i]) > -1)) {
                        isShowGroup = true;
                        break;
                    }
                }
                return isShowGroup;
            }
        };
        _this.findAllToolNames = function (layoutJson, children, toolNames) {
            if (!children || children.length === 0) {
                return;
            }
            for (var i = 0; i < children.length; i++) {
                if (layoutJson.elements[children[i]].type === 'GROUP') {
                    var groupName = layoutJson.elements[children[i]].groupName;
                    _this.findAllToolNames(layoutJson, layoutJson.layout[groupName] && layoutJson.layout[groupName].children, toolNames);
                }
                else {
                    toolNames.push(children[i]);
                }
            }
        };
        _this.state = {
            bottomPanelHeight: 0,
            isThumbMap: _this.props.isMobile ? true : false
        };
        return _this;
    }
    Group.prototype.getStyle = function () {
        var position = this.props.layoutConfig.layout[this.props.groupName] && this.props.layoutConfig.layout[this.props.groupName].position;
        var direction = this.props.layoutConfig.elements[this.props.groupName].direction;
        return jimu_core_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      position: ", ";\n      top: ", "px;\n      bottom: ", "px;\n      left: ", "px;\n      right: ", "px;\n      display: flex;\n      flex-flow: ", ";\n      align-items: flex-start;\n\n      > .exbmap-ui {\n        margin-bottom: ", ";\n        margin-right: ", ";\n      }\n\n      > .exbmap-ui:last-child {\n        margin-bottom: 0;\n        margin-right: 0;\n      }\n\n      .exbmap-ui-group-expand-icon {\n        fill: black;\n        left: 8px;\n        top: 8px;\n        position: absolute;\n        display: block;\n      }\n\n      .expand-mobile-panel {\n        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;\n        border-radius: 10px 10px 0px 0px;\n      }\n\n      .expand-mobile-panel-transition {\n        transition: height 0.3s;\n      }\n\n      .expand-mobile-panel-touch-container {\n        top: 0;\n        position: absolute;\n        width: 100%;\n        height: 31px;\n      }\n\n      .expand-mobile-panel-bar {\n        width: 36px;\n        height: 4px;\n        background-color: #434343;\n        border-radius: 2px;\n      }\n      "], ["\n      position: ", ";\n      top: ", "px;\n      bottom: ", "px;\n      left: ", "px;\n      right: ", "px;\n      display: flex;\n      flex-flow: ", ";\n      align-items: flex-start;\n\n      > .exbmap-ui {\n        margin-bottom: ", ";\n        margin-right: ", ";\n      }\n\n      > .exbmap-ui:last-child {\n        margin-bottom: 0;\n        margin-right: 0;\n      }\n\n      .exbmap-ui-group-expand-icon {\n        fill: black;\n        left: 8px;\n        top: 8px;\n        position: absolute;\n        display: block;\n      }\n\n      .expand-mobile-panel {\n        box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 2px;\n        border-radius: 10px 10px 0px 0px;\n      }\n\n      .expand-mobile-panel-transition {\n        transition: height 0.3s;\n      }\n\n      .expand-mobile-panel-touch-container {\n        top: 0;\n        position: absolute;\n        width: 100%;\n        height: 31px;\n      }\n\n      .expand-mobile-panel-bar {\n        width: 36px;\n        height: 4px;\n        background-color: #434343;\n        border-radius: 2px;\n      }\n      "])), position ? 'absolute' : 'relative', position ? position.top : null, position ? position.bottom : null, position ? position.left : null, position ? position.right : null, direction === 'vertical' ? 'column' : 'row', direction === 'vertical' ? '10px' : 0, direction === 'horizontal' ? '10px' : 0);
    };
    Group.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _this = this;
        if (this.props.activeToolName !== prevProps.activeToolName) {
            if (this.props.activeToolName && prevProps.activeToolName) {
                return;
            }
            if (this.props.activeToolName && !prevProps.activeToolName && this.props.isMobile && this.props.isMainGroup) {
                this.setState({
                    bottomPanelHeight: 150
                }, function () {
                    _this.checkResponsive();
                });
                this.currentBottomPanelHeight = 150;
            }
            if (!this.props.activeToolName && prevProps.activeToolName && this.props.isMobile && this.props.isMainGroup) {
                this.setState({
                    bottomPanelHeight: 0
                }, function () {
                    _this.checkResponsive();
                });
                this.currentBottomPanelHeight = 0;
            }
        }
    };
    Group.prototype.render = function () {
        return this.getGroupContent(this.props.layoutConfig);
    };
    return Group;
}(ui_component_1.UIComponent));
exports.default = Group;
var templateObject_1;
//# sourceMappingURL=group.js.map