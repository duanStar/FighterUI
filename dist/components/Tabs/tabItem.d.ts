import React from "react";
export interface TabItemProps {
    /**设置 TabItem 选项的文字 */
    label: any;
    /**设置 TabItem 是否禁用 */
    disabled?: boolean;
    /**设置 TabItem 的索引，若未指定则自动设置 */
    index?: number;
}
export declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
