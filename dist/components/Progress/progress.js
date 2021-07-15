import React from "react";
import classNames from "classnames";
export var Progress = function (props) {
    var _a;
    var percent = props.percent, stokeHeight = props.stokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    var classes = classNames('viking-progress-bar-inner', (_a = {},
        _a["color-" + theme] = theme,
        _a));
    return (React.createElement("div", { className: "viking-progress-bar", style: styles },
        React.createElement("div", { className: "viking-progress-bar-outer", style: { height: stokeHeight + "px" } },
            React.createElement("div", { className: classes, style: { width: percent + "%" } }, showText && React.createElement("span", { className: "inner-text" }, percent + '%')))));
};
Progress.defaultProps = {
    showText: true,
    stokeHeight: 15,
    theme: 'primary'
};
export default Progress;
