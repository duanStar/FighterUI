import React from "react";
declare type MenuMode = 'horizontal' | 'vertical';
declare type selectCallback = (selectIndex: string) => void;
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
export declare const menuContext: React.Context<IMenuContext>;
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * ### 引用方法
 *
 * ~~~js
 * import { Menu } from 'FighterUI'
 * ~~~
 */
export declare const Menu: React.FC<MenuProps>;
export default Menu;
