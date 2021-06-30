import React, { useContext, useState } from "react";
import classNames from "classnames";
import { menuContext } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from "../Icon/Icon";
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { children, index, title, className } = props;
  const context = useContext(menuContext);
  const openedSubmenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = (index && context.mode === 'vertical' ? openedSubmenus.includes(index) : false);
  const [menuOpen, setOpen] = useState(isOpen);
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  }
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    timer && window.clearTimeout(timer);
    e.preventDefault();
    timer = window.setTimeout(() => {
      setOpen(toggle);
    }, 300);
  }
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}
  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    });
    const childrenComponent = React.Children.map(children, (child, childIndex) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${childIndex}`
        });
      } else {
        console.error("warning: Menu has a child with not a MenuItem component");
      }
    });
    return (
      <Transition in={menuOpen} animation="zoom-in-top" timeout={300} appear unmountOnExit >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    );
  }
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon={faAngleDown} className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = "SubMenu";
export default SubMenu;
