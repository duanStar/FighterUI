import React from "react";
export declare type AlertType = 'success' | 'default' | 'warning' | 'danger';
interface BaseAlertProps {
    /**设置 Alert 的标题 */
    title: string;
    /**设置 Alert 的描述信息 */
    description?: string;
    /**设置 Alert 的类型 */
    type?: AlertType;
    /**设置关闭 Alert 时触发的行为 */
    onClose?: () => void;
    /**设置 Alert 是否可关闭 */
    closable?: boolean;
    className?: string;
}
export declare type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLElement>>;
/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 *
 *
 * ~~~js
 * import { Alert } from 'FIghterUI'
 * ~~~
 */
export declare const Alert: React.FC<AlertProps>;
export default Alert;
