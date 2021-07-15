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
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Input } from "../Input/input";
import { Icon } from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import { Transition } from '../Transition/transition';
/**
 *
 *输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *~~~js
 *import { AutoComplete } from 'FighterUI';
 *~~~
 */
export var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOptions = props.renderOptions, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOptions"]);
    // state
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var _e = useState(false), showDropDown = _e[0], setShowDropdown = _e[1];
    // ref
    var triggerSearch = useRef(false);
    var compomentRef = useRef(null);
    // hooks
    var debouncedValue = useDebounce(inputValue, 500);
    useClickOutside(compomentRef, function () {
        setSuggestions([]);
        setShowDropdown(false);
    });
    useEffect(function () {
        if (debouncedValue && triggerSearch.current) {
            var results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (res) {
                    setLoading(false);
                    setSuggestions(res);
                    res.length > 0 && setShowDropdown(true);
                });
            }
            else {
                setSuggestions(results);
                results.length > 0 && setShowDropdown(true);
            }
        }
        else {
            setSuggestions([]);
            setShowDropdown(false);
        }
        setHighlightIndex(-1);
        triggerSearch.current = false;
    }, [debouncedValue]);
    // methods
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setShowDropdown(false);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var renderTemplate = function (item) {
        return renderOptions ? renderOptions(item) : item.value;
    };
    var generateDropDown = function () {
        return (React.createElement(Transition, { animation: "zoom-in-top", timeout: 500, in: showDropDown },
            React.createElement("ul", { className: "viking-suggestion-list" },
                loading && React.createElement("ul", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var classes = classNames('suggestion-item', {
                        'is-active': index === highlightIndex
                    });
                    return React.createElement("li", { key: index, className: classes, onClick: function () {
                            handleSelect(item);
                        } }, renderTemplate(item));
                }))));
    };
    var highlight = function (index) {
        if (index <= 0)
            index = 0;
        if (index >= suggestions.length - 1) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                suggestions[highlightIndex] && handleSelect(suggestions[highlightIndex]);
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                setShowDropdown(false);
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", { className: "viking-auto-complete", ref: compomentRef },
        React.createElement(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })),
        generateDropDown()));
};
export default AutoComplete;
