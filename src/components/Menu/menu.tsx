import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from './subMenu';

type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectIndex: string) => void;
export interface MenuProps {
  /**设置默认选中 TabItem 项的索引, 默认为0 */
  defaultIndex?: string;
  /**可以扩展的 className */
  className?: string;
  /**设置 Menu 的方向 */
  mode?: MenuMode;
  style?: React.CSSProperties;
  /** 设置 MenuItem 选中时的行为，参数为选中项索引 */
  onSelect?: selectCallback;
  /**设置默认展开的 SubMenu 项，只适用于纵向 Menu */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: selectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export const menuContext = createContext<IMenuContext>({index: '0'});

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ### 引用方法
 * 
 * ~~~js
 * import { Menu } from 'FighterUI'
 * ~~~
 */
export const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });
  const handleClick = (index: string) => {
    onSelect && onSelect(index);
    setActive(index);
  }
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps | SubMenuProps>;
      const  { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index}`
        });
      } else {
        console.error("warning: Menu has a child with not a MenuItem component");
      }
    });
  }
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <menuContext.Provider value={passedContext}>
        {renderChildren()}
      </menuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: []
}
