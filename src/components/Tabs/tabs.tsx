import React, { useState, createContext } from "react";
import classNames from "classnames";
import { TabItemProps } from './tabItem';

export type TabsType = 'line' | 'card';

export interface TabsProps {
  defaultIndex?: number;
  className?: string;
  onSelect?: (selectedIndex: number) => void;
  type?: TabsType,
}

interface ITabsContext {
  index: number,
  onSelect?: (selectedIndex: number, content: any) => void;
  setContent?: React.Dispatch<any>;
}

export const tabsContext = createContext<ITabsContext>({ index: 0 });

const Tabs: React.FC<TabsProps> = (props) => {
  const { defaultIndex, className, onSelect, type, children } = props;
  const [tabContent, setContent] = useState<any>('');
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('viking-tabs-nav', className, {
    [`nav-${type}`]: type
  });
  const handleClick = (index: number, content: any) => {
    setActive(index);
    setContent(content);
    onSelect && onSelect(index);
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, childIndex) => {
      const childElement = child as React.FunctionComponentElement<TabItemProps>;
      const { displayName } = childElement.type;
      if (displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          index: childIndex
        });
      } else {
        console.error("warning: Tabs has a child with not a TabItem component");
      }
    });
  }
  const passedContext: ITabsContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    setContent
  }
  return (
    <div className='viking-tabs' data-testid="test-tab">
      <ul className={classes} data-testid="test-tab-nav">
        <tabsContext.Provider value={passedContext}>
          {renderChildren()}
        </tabsContext.Provider>
      </ul>
      <div className="viking-tabs-content">
        <div className="viking-tab-panel">
          {tabContent}
        </div>
      </div>
    </div>
  );
}

Tabs.defaultProps = {
  type: 'line',
  defaultIndex: 0
}
export default Tabs;