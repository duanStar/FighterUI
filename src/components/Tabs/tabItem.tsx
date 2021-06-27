import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import { tabsContext } from './tabs';

export interface TabItemProps {
  label: any;
  disabled?: boolean;
  index?: number;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { label, disabled, children, index } = props;
  const context = useContext(tabsContext);
  useEffect(() => {
    if (index === context.index) {
      context.setContent && context.setContent(children);
    }
  }, []);
  const classes = classNames('viking-tabs-nav-item', {
    'disabled': disabled,
    'is-active': context.index === index
  });
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'number') && children) {
      context.onSelect(index, children);
    }
  }
  return (
    <li className={classes} onClick={handleClick}>
      {label}
    </li>
  );
}

TabItem.displayName = 'TabItem'
export default TabItem;