import React, { useState } from 'react';
import Button from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import Icon from './components/Icon/Icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Transition from './components/Transition/transition';
library.add(fas);
function App() {
  const [show, setShow] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <Icon icon="coffee" size="10x" theme="danger" />
        <Alert title="This is a success" type='success'/>
        <Alert title="This is a success" type='danger'/>
        <Alert title="This is a success" description="This is a long description"/>
        <Alert title="This is a success" type='warning' />
        <Menu defaultIndex={'0'} defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link2
          </MenuItem>
          <SubMenu title="dropDown">
            <MenuItem>
              dropDown 1
            </MenuItem>
            <MenuItem>
              dropDown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link3
          </MenuItem>
        </Menu>
        <Menu defaultIndex={'0'} mode="vertical" defaultOpenSubMenus={['2']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem>
            cool link2
          </MenuItem>
          <SubMenu title="dropDown">
            <MenuItem>
              dropDown 1
            </MenuItem>
            <MenuItem>
              dropDown 2
            </MenuItem>
          </SubMenu>
          <MenuItem>
            cool link3
          </MenuItem>
        </Menu>
        <Tabs
          defaultIndex={0}
          type="line"
        >
          <TabItem label="选项卡一">
            this is content one
          </TabItem>
          <TabItem label="选项卡二">
            this is content two
          </TabItem>
          <TabItem label="用户管理">
            this is content three
          </TabItem>
        </Tabs>
        <Tabs
          defaultIndex={0}
          onSelect={(index) => {
            console.log(index);
          }}
          type="card"
        >
          <TabItem label="card1">
            this is card one
          </TabItem>
          <TabItem label="card2">
            this is content two
          </TabItem>
          <TabItem
            disabled
            label="disabled"
          >
            this is content three
          </TabItem>
        </Tabs>
        <Button size={'lg'} btnType={'primary'} onClick={() => {
          setShow(!show);
        }} >Toggle</Button>

        <Transition animation="zoom-in-left" in={show} timeout={300}>
            <div>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
            </div>
        </Transition>
      </header>
    </div>
  );
}

export default App;
