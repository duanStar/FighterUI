import React, { createContext, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import classNames from "classnames";
import { Transition } from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";
export var selectContext = createContext({ selectedValues: [] });
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'FighterUi'
 * ~~~
 */
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, multiple = props.multiple, name = props.name, onChange = props.onChange, onVisibleChange = props.onVisibleChange, children = props.children, className = props.className;
    var rootEle = useRef(null);
    var containerWidth = useRef(0);
    var inputRef = useRef(null);
    // 关键数据
    var _a = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _a[0], setSelectedValues = _a[1];
    var _b = useState(typeof defaultValue === 'string' ? defaultValue : ''), value = _b[0], setValue = _b[1];
    var _c = useState(false), visible = _c[0], setVisible = _c[1];
    useClickOutside(rootEle, function (e) {
        e.preventDefault();
        setVisible(false);
    });
    useEffect(function () {
        // focus input
        if (inputRef.current) {
            inputRef.current.focus();
            if (multiple && selectedValues.length > 0) {
                inputRef.current.placeholder = '';
            }
            else {
                if (placeholder)
                    inputRef.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        onVisibleChange && onVisibleChange(visible);
        if (rootEle.current) {
            containerWidth.current = rootEle.current.getBoundingClientRect().width;
        }
    }, [visible, rootEle]);
    var classes = classNames('viking-select', className, {
        'menu-is-open': visible,
        'is-multiple': multiple,
        'is-disabled': disabled
    });
    var handleOptionCilck = function (value, isSelected) {
        if (!multiple) {
            setVisible(false);
            setValue(value);
        }
        else {
            setValue('');
        }
        var updateValues = [value];
        if (multiple) {
            updateValues = isSelected ? selectedValues.filter(function (v) {
                return v !== value;
            }) : selectedValues.concat([value]);
            setSelectedValues(updateValues);
        }
        onChange && onChange(value, updateValues);
    };
    var renderChildren = function () {
        var renderComponents = React.Children.map(children, function (child, childIndex) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === "Option") {
                return React.cloneElement(childElement, {
                    index: "select-" + childIndex
                });
            }
            else {
                console.error("warning: Menu has a child with not a Option component");
            }
        });
        return (React.createElement(Transition, { timeout: 300, in: visible, animation: 'zoom-in-top' },
            React.createElement("ul", { className: "viking-select-dropdown" }, renderComponents)));
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setVisible(!visible);
        }
    };
    var passedContext = {
        onSelect: handleOptionCilck,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    return (React.createElement("div", { className: classes, ref: rootEle },
        React.createElement("div", { className: "viking-select-input" },
            React.createElement("div", { className: "viking-input-wrapper", onClick: handleClick },
                React.createElement("div", { className: "icon-wrapper" },
                    React.createElement(Icon, { icon: 'angle-down' })),
                React.createElement("input", { className: "viking-input-inner", disabled: disabled, readOnly: true, placeholder: placeholder, name: name, value: value, ref: inputRef }))),
        React.createElement(selectContext.Provider, { value: passedContext }, renderChildren()),
        multiple && React.createElement("div", { className: "viking-selected-tags", style: {
                maxWidth: containerWidth.current - 32
            } }, selectedValues.map(function (item, index) {
            return React.createElement("span", { className: "viking-tag", key: "tag-" + index },
                item,
                React.createElement(Icon, { style: {
                        cursor: 'pointer'
                    }, icon: "times", onClick: function () {
                        handleOptionCilck(item, true);
                    } }));
        }))));
};
Select.defaultProps = {
    name: 'viking-select',
    placeholder: '请选择'
};
export default Select;
