import React, { useContext } from "react";
import classNames from "classnames";
import { menuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(menuContext);
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index,
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index);
    }
  }
  return (
    <li style={style} className={classes} onClick={handleClick} >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem';
export default MenuItem;