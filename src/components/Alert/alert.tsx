import React, { useState } from "react";
import classNames from "classnames";
import { Transition } from '../Transition/transition';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Icon } from '../Icon/Icon';

export type AlertType = 'success' | 'default' | 'warning' | 'danger';

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

export type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLElement>>;

/**
 * 用于页面中展示重要的提示信息。 点击右侧的叉提示自动消失
 * ### 引用方法
 * 
 * 
 * ~~~js
 * import { Alert } from 'FIghterUI'
 * ~~~
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const {title, description, type, onClose, closable, className, ...restProps} = props;
  const [show, setShow] = useState(true);

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })
  return (
    <Transition timeout={300} animation="zoom-in-top" in={show}>
      <div className={classes} {...restProps}>
        <div className="title">{title}</div>
        {description ? <p className="description">{description}</p> : ''}
        {closable ? <div className="close" onClick={() => {
          setShow(false);
          onClose && onClose();
        }}><Icon icon={faTimes} /></div> : ''}
      </div> 
    </Transition>
  );
}

Alert.defaultProps = {
  type: 'default',
  closable: true
}
