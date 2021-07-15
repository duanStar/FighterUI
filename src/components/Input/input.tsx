import React from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Icon } from '../Icon/Icon';

type InputSize = 'lg' | 'sm'
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLElement>, 'size'> {
  /**设置 Input 是否禁用 */
  disabled?: boolean;
  /**设置 Input 尺寸 */
  size?: InputSize;
  /**设置 Input 图标 */
  icon?: IconProp;
  /**设置 Input 前缀 */
  prepend?: string | React.ReactElement;
  /**设置 Input 后缀 */
  append?: string | React.ReactElement;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * ###引用方法
 * 
 * 
 * ~~~js
 * import { Input } from 'FighterUI'
 * ~~~
 */
export const Input: React.FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, className, style, ...restProps } = props;
  const classes = classNames("viking-input-wrapper", classNames, {
    [`input-size-${size}`]: size,
    'is-disabled': disabled,
    'input-group': prepend || append,
    'input-group-append': !!append,
    'input-group-prepend': !!prepend
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return "";
    }
    return value;
  }
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
      <input 
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  )
}

export default Input;
