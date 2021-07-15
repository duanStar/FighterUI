import React from "react";
export interface SubMenuProps {
    /**设置 SubMenu 每项索引， 若未指定则自动设置 */
    index?: string;
    /**设置 SubMenu 每项标题 */
    title?: string;
    /**可以扩展的 className */
    className?: string;
}
export declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
