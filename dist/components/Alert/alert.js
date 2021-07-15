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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState } from "react";
import classNames from "classnames";
import { Transition } from '../Transition/transition';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon/Icon';
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 *
 * ~~~js
 * import { Alert } from 'FIghterUI'
 * ~~~
 */
export var Alert = function (props) {
    var _a;
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable, className = props.className, restProps = __rest(props, ["title", "description", "type", "onClose", "closable", "className"]);
    var _b = useState(true), show = _b[0], setShow = _b[1];
    var classes = classNames('alert', className, (_a = {},
        _a["alert-" + type] = type,
        _a));
    return (React.createElement(Transition, { timeout: 300, animation: "zoom-in-top", in: show },
        React.createElement("div", __assign({ className: classes }, restProps),
            React.createElement("div", { className: "title" }, title),
            description ? React.createElement("p", { className: "description" }, description) : '',
            closable ? React.createElement("div", { className: "close", onClick: function () {
                    setShow(false);
                    onClose && onClose();
                } },
                React.createElement(Icon, { icon: faTimes })) : '')));
};
Alert.defaultProps = {
    type: 'default',
    closable: true
};
export default Alert;
