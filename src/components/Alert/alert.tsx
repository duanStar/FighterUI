import React, { useState } from "react";
import classNames from "classnames";
import Transition from '../Transition/transition';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Icon from '../Icon/Icon';

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

export default Alert;