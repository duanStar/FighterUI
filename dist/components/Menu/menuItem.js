import React, { useContext } from "react";
import classNames from "classnames";
import { menuContext } from './menu';
export var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(menuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { style: style, className: classes, onClick: handleClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
