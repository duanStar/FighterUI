import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Input, InputProps } from "../Input/input";
import { Icon } from '../Icon/Icon';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import { Transition } from '../Transition/transition';

export interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  /**返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
type DataSourceType<T = {}> = T & DataSourceObject */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**点击选中建议项时触发的回调 */
  onSelect?: (item: DataSourceType) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */ 
  renderOptions?: (item: DataSourceType) => React.ReactElement;
}

/**
 * 
 *输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *~~~js
 *import { AutoComplete } from 'FighterUI';
 *~~~
 */
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOptions, ...restProps } = props;

  // state
  const [ inputValue, setInputValue ] = useState(value as string);
  const [ suggestions, setSuggestions ] = useState<DataSourceType[]>([]);
  const [ loading, setLoading ] = useState(false);
  const [ highlightIndex, setHighlightIndex ] = useState<number>(-1);
  const [ showDropDown, setShowDropdown ] = useState(false);

  // ref
  const triggerSearch = useRef(false);
  const compomentRef = useRef<HTMLDivElement>(null);

  // hooks
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(compomentRef, () => {
    setSuggestions([]);
    setShowDropdown(false);
  });
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then(res => {
          setLoading(false);
          setSuggestions(res);
          res.length > 0 && setShowDropdown(true);
        });
      } else {
        setSuggestions(results);
        results.length > 0 && setShowDropdown(true);
      }
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
    setHighlightIndex(-1);
    triggerSearch.current = false;
  }, [debouncedValue]);

  // methods
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  }
  const renderTemplate = (item: DataSourceType)  => {
    return renderOptions ? renderOptions(item) : item.value;
  }
  const generateDropDown = () => {
    return (
      <Transition animation="zoom-in-top" timeout={500} in={showDropDown}>
        <ul className="viking-suggestion-list">
          { loading && <ul className="suggstions-loading-icon"><Icon icon="spinner" spin /></ul> }
          {suggestions.map((item, index) => {
            const classes = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            });
            return <li key={index} className={classes} onClick={() => {
              handleSelect(item);
            }} >{renderTemplate(item)}</li>
            })
          }
        </ul>
      </Transition>
    );
  }
  const highlight = (index: number) => {
    if (index <= 0) index = 0;
    if (index >= suggestions.length - 1) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
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
  }

  return (
    <div className="viking-auto-complete" ref={compomentRef}>
      <Input value={inputValue} {...restProps} onChange={handleChange} onKeyDown={handleKeyDown} />
      {generateDropDown()}
    </div>
  )
}
