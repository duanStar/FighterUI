import React, { useContext } from "react";
import classNames from "classnames";
import { menuContext } from './menu';

export interface MenuItemProps {
  /**设置 MenuItem 每项索引， 若未指定则自动设置 */
  index?: string;
  /**设置 MenuItem 项是否禁用 */
  disabled?: boolean;
  /**可以扩展的 className */
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
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
