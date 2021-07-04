import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Tabs } from './tabs';
import { TabItem } from './tabItem';
import { Icon } from '../Icon/Icon';

const defaultTabs = () => (
  <Tabs
    defaultIndex={0}
    onSelect={action("selected")}
  >
    <TabItem label="选项卡一">
      this is content one
    </TabItem>
    <TabItem label="选项卡二">
      this is content two
    </TabItem>
    <TabItem label="选项卡三">
      this is content three
    </TabItem>
  </Tabs>
);

const CardTabs = () => (
  <Tabs
    defaultIndex={0}
    onSelect={action("selected")}
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
);

const customTabs = () => (
  <Tabs
    defaultIndex={0}
    onSelect={function noRefCheck(){}}
    type="card"
  >
    <TabItem label={<><Icon icon="exclamation-circle" />{'  '}自定义图标</>}>
      this is card one
    </TabItem>
    <TabItem label="tab2">
      this is content two
    </TabItem>
  </Tabs>
)

storiesOf("Tabs component", module)
  .add("Tabs", defaultTabs)
  .add("选项卡样式的 Tabs", CardTabs)
  .add("自定义样式的 Tabs", customTabs)