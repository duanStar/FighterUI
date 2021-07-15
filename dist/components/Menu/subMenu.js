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
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { menuContext } from './menu';
import { Icon } from "../Icon/Icon";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Transition } from "../Transition/transition";
export var SubMenu = function (props) {
    var children = props.children, index = props.index, title = props.title, className = props.className;
    var context = useContext(menuContext);
    var openedSubmenus = context.defaultOpenSubMenus;
    var isOpen = (index && context.mode === 'vertical' ? openedSubmenus.includes(index) : false);
    var _a = useState(isOpen), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        timer && window.clearTimeout(timer);
        e.preventDefault();
        timer = window.setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, childIndex) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + childIndex
                });
            }
            else {
                console.error("warning: Menu has a child with not a MenuItem component");
            }
        });
        return (React.createElement(Transition, { in: menuOpen, animation: "zoom-in-top", timeout: 300, appear: true, unmountOnExit: true },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", __assign({ className: "submenu-title" }, clickEvents),
            title,
            React.createElement(Icon, { icon: faAngleDown, className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
