import React, { useState } from "react";
import classNames from "classnames";

export type AlertType = 'success' | 'default' | 'warning' | 'danger';

interface BaseAlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

export type AlertProps = Partial<BaseAlertProps & React.HTMLAttributes<HTMLElement>>;

const Alert: React.FC<AlertProps> = (props) => {
  const {title, description, type, onClose, closable, className, ...restProps} = props;
  const [show, setShow] = useState(true);

  const classes = classNames('alert', className, {
    [`alert-${type}`]: type
  })
  return (
    show ? <div className={classes} {...restProps}>
    <div className="title">{title}</div>
    {description ? <p className="description">{description}</p> : ''}
    {closable ? <div className="close" onClick={() => {
      setShow(false);
      onClose && onClose();
    }}>X</div> : ''}
  </div> : <div></div>
  );
}

Alert.defaultProps = {
  type: 'default',
  closable: true
}

export default Alert;