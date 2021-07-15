import classNames from "classnames";
import React, { useContext } from "react";
import { Icon } from "../Icon/Icon";
import { selectContext } from "./select";
export var Option = function (props) {
    var index = props.index, value = props.value, label = props.label, disabled = props.disabled, children = props.children;
    var _a = useContext(selectContext), onSelect = _a.onSelect, multiple = _a.multiple, selectedValues = _a.selectedValues;
    var isSelected = selectedValues.includes(value);
    var classes = classNames('viking-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected
    });
    var handleClick = function (e, value, isSelected) {
        e.preventDefault();
        (onSelect && !disabled) && onSelect(value, isSelected);
    };
    return (React.createElement("li", { key: index, className: classes, onClick: function (e) {
            handleClick(e, value, isSelected);
        } },
        children || (label ? label : value),
        multiple && isSelected && React.createElement(Icon, { icon: "check" })));
};
Option.displayName = 'Option';
export default Option;
