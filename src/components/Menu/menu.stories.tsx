import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Menu } from './menu';
import { MenuItem } from './menuItem';
import { SubMenu } from './subMenu';

const defaultMenu = () => {
  return <Menu defaultIndex={'0'} onSelect={action("clicked")}>
    <MenuItem>
      cool link
    </MenuItem>
    <MenuItem disabled>
      cool link
    </MenuItem>
    <MenuItem>
      cool link
    </MenuItem>
  </Menu>
};

const verticalMenu = () => {
  return <Menu defaultIndex={'0'} mode="vertical">
  <MenuItem>
    cool link
  </MenuItem>
  <MenuItem disabled>
    cool link
  </MenuItem>
  <MenuItem>
    cool link
  </MenuItem>
</Menu>
}

const verticalSubMenu = () => {
  return (
    <>
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
    </>
  )
};

const horizontalSubMenu = () => {
  return (
    <>
      <Menu defaultIndex={'0'} mode="horizontal">
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
    </>
  )
};

storiesOf("Menu Component", module)
  .add("Menu", defaultMenu)
  .add("纵向 Menu", verticalMenu)
  .add("默认打开的 纵向多级Menu", verticalSubMenu)
  .add("横向多级 Menu", horizontalSubMenu)