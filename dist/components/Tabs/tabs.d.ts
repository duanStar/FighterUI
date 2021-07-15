import React from "react";
export declare type TabsType = 'line' | 'card';
export interface TabsProps {
    /**当前激活 Tabs 面板的 index，默认为0 */
    defaultIndex?: number;
    /**可以扩展的 className */
    className?: string;
    /**点击 TabItem 触发的行为 */
    onSelect?: (selectedIndex: number) => void;
    /**设置 Tabs 的类型，两种可选，默认为 line */
    type?: TabsType;
}
interface ITabsContext {
    index: number;
    onSelect?: (selectedIndex: number, content: any) => void;
    setContent?: React.Dispatch<any>;
}
export declare const tabsContext: React.Context<ITabsContext>;
export declare const Tabs: React.FC<TabsProps>;
export default Tabs;
