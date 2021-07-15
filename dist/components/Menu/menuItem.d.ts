import React from "react";
export interface MenuItemProps {
    /**设置 MenuItem 每项索引， 若未指定则自动设置 */
    index?: string;
    /**设置 MenuItem 项是否禁用 */
    disabled?: boolean;
    /**可以扩展的 className */
    className?: string;
    style?: React.CSSProperties;
}
export declare const MenuItem: React.FC<MenuItemProps>;
export default MenuItem;
