import React, { useState, createContext } from "react";
import classNames from "classnames";
export var tabsContext = createContext({ index: 0 });
export var Tabs = function (props) {
    var _a;
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, type = props.type, children = props.children;
    var _b = useState(''), tabContent = _b[0], setContent = _b[1];
    var _c = useState(defaultIndex), currentActive = _c[0], setActive = _c[1];
    var classes = classNames('viking-tabs-nav', className, (_a = {},
        _a["nav-" + type] = type,
        _a));
    var handleClick = function (index, content) {
        setActive(index);
        setContent(content);
        onSelect && onSelect(index);
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, childIndex) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'TabItem') {
                return React.cloneElement(childElement, {
                    index: childIndex
                });
            }
            else {
                console.error("warning: Tabs has a child with not a TabItem component");
            }
        });
    };
    var passedContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
        setContent: setContent
    };
    return (React.createElement("div", { className: 'viking-tabs', "data-testid": "test-tab" },
        React.createElement("ul", { className: classes, "data-testid": "test-tab-nav" },
            React.createElement(tabsContext.Provider, { value: passedContext }, renderChildren())),
        React.createElement("div", { className: "viking-tabs-content" },
            React.createElement("div", { className: "viking-tab-panel" }, tabContent))));
};
Tabs.defaultProps = {
    type: 'line',
    defaultIndex: 0
};
export default Tabs;
