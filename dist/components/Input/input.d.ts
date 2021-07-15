import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
declare type InputSize = 'lg' | 'sm';
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
export declare const Input: React.FC<InputProps>;
export default Input;
