import React, { createContext, useState } from "react";
import classNames from "classnames";
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from './subMenu';

type MenuMode = 'horizontal' | 'vertical';
type selectCallback = (selectIndex: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: selectCallback;
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: selectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export const menuContext = createContext<IMenuContext>({index: '0'});

const Menu: React.FC<MenuProps> = (props) => {
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

export default Menu;