import React from 'react';
import Button from './components/Button/button';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Alert title="This is a success" type='success'/>
        <Alert title="This is a success" type='danger'/>
        <Alert title="This is a success" description="This is a long description"/>
        <Alert title="This is a success" type='warning' />
        <Button size={'lg'} btnType={'primary'} >Hello</Button>
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

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
