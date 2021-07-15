import React, { createContext, useEffect, useRef, useState } from "react";
import { Icon } from "../Icon/Icon";
import classNames from "classnames";
import { OptionProps } from './option';
import { Transition } from "../Transition/transition";
import useClickOutside from "../../hooks/useClickOutside";

export interface SelectProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'onChange'> {
  /**指定默认选中的条目 可以是是字符串或者字符串数组 */
  defaultValue?: string | string[];
  /**选择框默认文字 */
  placeholder?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**是否支持多选 */
  multiple?: boolean;
  /**select input 的 name 属性 */
  name?: string;
  /**	选中值发生变化时触发 */
  onChange?: (selectedValue: string, selectedValues: string[]) => void;
  /**下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
}

interface ISelectContext {
  onSelect?: (value: string, isSelected: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export const selectContext = createContext<ISelectContext>({ selectedValues: [] });

/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'FighterUi'
 * ~~~
 */
export const Select: React.FC<SelectProps> = (props) => {
  const { defaultValue, placeholder, disabled, multiple, name, onChange, onVisibleChange, children, className } = props;
  const rootEle = useRef<HTMLDivElement>(null);
  const containerWidth = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // 关键数据
  const [selectedValues, setSelectedValues] = useState(Array.isArray(defaultValue) ? defaultValue : []);
  const [value, setValue] = useState(typeof defaultValue === 'string' ? defaultValue : '');

  const [visible, setVisible] = useState(false);
  useClickOutside(rootEle, (e: MouseEvent) => {
    e.preventDefault();
    setVisible(false);
  });
  useEffect(function () {
    // focus input
    if (inputRef.current) {
      inputRef.current.focus();
      if (multiple && selectedValues.length > 0) {
        inputRef.current.placeholder = '';
      } else {
        if (placeholder)
        inputRef.current.placeholder = placeholder;
      }
    }
}, [selectedValues, multiple, placeholder]);
  useEffect(() => {
    onVisibleChange && onVisibleChange(visible);
    if (rootEle.current) {
      containerWidth.current = rootEle.current.getBoundingClientRect().width;
    }
  }, [visible, rootEle]);
  const classes = classNames('viking-select', className, {
    'menu-is-open': visible,
    'is-multiple': multiple,
    'is-disabled': disabled
  });
  const handleOptionCilck = (value: string, isSelected: boolean) => {
    if (!multiple) {
      setVisible(false);
      setValue(value);
    } else {
      setValue('');
    }
    let updateValues = [value];
    if (multiple) {
      updateValues = isSelected ? selectedValues.filter(v => {
        return v !== value;
      }) : selectedValues.concat([value]);
      setSelectedValues(updateValues);
    }
    onChange && onChange(value, updateValues);
  }
  const renderChildren = () => {
    const renderComponents = React.Children.map(children, (child, childIndex) => {
      const childElement = child as React.FunctionComponentElement<OptionProps>;
      const { displayName } = childElement.type;
      if (displayName === "Option") {
        return React.cloneElement(childElement, {
          index: `select-${childIndex}`
        });
      } else {
        console.error("warning: Menu has a child with not a Option component")
      }
    });
    return (
      <Transition timeout={300} in={visible} animation='zoom-in-top'>
        <ul className="viking-select-dropdown">
          {renderComponents}
        </ul>
      </Transition>
    );
  }
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      setVisible(!visible);
    }
  }
  const passedContext: ISelectContext = {
    onSelect: handleOptionCilck,
    selectedValues: selectedValues,
    multiple: multiple,
  }
  return (
    <div className={classes} ref={rootEle}>
      <div className="viking-select-input">
        <div className="viking-input-wrapper" onClick={handleClick}>
          <div className="icon-wrapper">
            <Icon icon='angle-down' />
          </div>
          <input className="viking-input-inner" disabled={disabled} readOnly placeholder={placeholder} name={name} value={value} ref={inputRef} />
        </div>
      </div>
      <selectContext.Provider value={passedContext}>
        {renderChildren()}
      </selectContext.Provider>
      {multiple && <div className="viking-selected-tags" style={{
        maxWidth: containerWidth.current - 32
      }}>
        {selectedValues.map((item, index) => {
          return <span className="viking-tag" key={`tag-${index}`}>{item}<Icon style={{
            cursor: 'pointer'
          }} icon="times" onClick={() => {
            handleOptionCilck(item, true);
          }} /></span>
        })}  
      </div>}
    </div>
  );
}

Select.defaultProps = {
  name: 'viking-select',
  placeholder: '请选择'
}
export default Select;
