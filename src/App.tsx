import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Alert title="This is a success" type={AlertType.Success}/>
        <Alert title="This is a success" type={AlertType.Danger}/>
        <Alert title="This is a success" description="This is a long description"/>
        <Alert title="This is a success" type={AlertType.Warning}/>
        <Button size={ButtonSize.Large} btnType={ButtonType.Primary} >Hello</Button>
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
