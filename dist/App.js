import React, { useState } from 'react';
import { Button } from './components/Button/button';
import { Alert } from './components/Alert/alert';
import { Menu } from './components/Menu/menu';
import { MenuItem } from './components/Menu/menuItem';
import { SubMenu } from './components/Menu/subMenu';
import { Tabs } from './components/Tabs/tabs';
import { TabItem } from './components/Tabs/tabItem';
import { Icon } from './components/Icon/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Transition } from './components/Transition/transition';
library.add(fas);
function App() {
    var _a = useState(true), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: "coffee", size: "10x", theme: "danger" }),
            React.createElement(Alert, { title: "This is a success", type: 'success' }),
            React.createElement(Alert, { title: "This is a success", type: 'danger' }),
            React.createElement(Alert, { title: "This is a success", description: "This is a long description" }),
            React.createElement(Alert, { title: "This is a success", type: 'warning' }),
            React.createElement(Menu, { defaultIndex: '0', defaultOpenSubMenus: ['2'] },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, null, "cool link2"),
                React.createElement(SubMenu, { title: "dropDown" },
                    React.createElement(MenuItem, null, "dropDown 1"),
                    React.createElement(MenuItem, null, "dropDown 2")),
                React.createElement(MenuItem, null, "cool link3")),
            React.createElement(Menu, { defaultIndex: '0', mode: "vertical", defaultOpenSubMenus: ['2'] },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, null, "cool link2"),
                React.createElement(SubMenu, { title: "dropDown" },
                    React.createElement(MenuItem, null, "dropDown 1"),
                    React.createElement(MenuItem, null, "dropDown 2")),
                React.createElement(MenuItem, null, "cool link3")),
            React.createElement(Tabs, { defaultIndex: 0, type: "line" },
                React.createElement(TabItem, { label: "\u9009\u9879\u5361\u4E00" }, "this is content one"),
                React.createElement(TabItem, { label: "\u9009\u9879\u5361\u4E8C" }, "this is content two"),
                React.createElement(TabItem, { label: "\u7528\u6237\u7BA1\u7406" }, "this is content three")),
            React.createElement(Tabs, { defaultIndex: 0, onSelect: function (index) {
                    console.log(index);
                }, type: "card" },
                React.createElement(TabItem, { label: "card1" }, "this is card one"),
                React.createElement(TabItem, { label: "card2" }, "this is content two"),
                React.createElement(TabItem, { disabled: true, label: "disabled" }, "this is content three")),
            React.createElement(Button, { size: 'lg', btnType: 'primary', onClick: function () {
                    setShow(!show);
                } }, "Toggle"),
            React.createElement(Transition, { animation: "zoom-in-left", in: show, timeout: 300 },
                React.createElement("div", null,
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."),
                    React.createElement("p", null,
                        "Edit ",
                        React.createElement("code", null, "src/App.tsx"),
                        " and save to reload."))))));
}
export default App;
