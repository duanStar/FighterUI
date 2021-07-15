import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { tabsContext } from './tabs';
export var TabItem = function (props) {
    var label = props.label, disabled = props.disabled, children = props.children, index = props.index;
    var context = useContext(tabsContext);
    useEffect(function () {
        if (index === context.index) {
            context.setContent && context.setContent(children);
        }
    }, []);
    var classes = classNames('viking-tabs-nav-item', {
        'disabled': disabled,
        'is-active': context.index === index
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'number') && children) {
            context.onSelect(index, children);
        }
    };
    return (React.createElement("li", { className: classes, onClick: handleClick }, label));
};
TabItem.displayName = 'TabItem';
export default TabItem;
