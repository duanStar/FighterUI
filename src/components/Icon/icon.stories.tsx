import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '../Button/button';
import { Icon } from './Icon';

const defaultIcon = () => (
  <React.Fragment key=".1">
    <Icon
      icon="check"
      size="3x"
    />
    <Icon
      icon="times"
      size="3x"
    />
    <Icon
      icon="anchor"
      size="3x"
    />
    <Icon
      icon="trash"
      size="3x"
    />
    <Button
      btnType="primary"
      disabled={false}
      size="lg"
    >
      <Icon icon="check" />
       check 
    </Button>
  </React.Fragment>
);

const diffentThemeIcon = () => (
  <React.Fragment key=".1">
    <Icon
      icon="check"
      size="3x"
      theme="success"
    />
    <Icon
      icon="times"
      size="3x"
      theme="danger"
    />
    <Icon
      icon="anchor"
      size="3x"
      theme="primary"
    />
    <Icon
      icon="exclamation-circle"
      size="3x"
      theme="warning"
    />
  </React.Fragment>
);

const moreActionsIcon = () => (
  <React.Fragment key=".1">
    <Icon
      icon="spinner"
      size="3x"
      spin
      theme="primary"
    />
    <Icon
      icon="spinner"
      pulse
      size="3x"
      theme="success"
    />
  </React.Fragment>
);

storiesOf("Icon component", module)
  .add("Icon", defaultIcon)
  .add("不同主题的 Icon", diffentThemeIcon)
  .add("更多行为的 Icon", moreActionsIcon, {
    info: {
      text: '更多例子请参见：https://github.com/FortAwesome/react-fontawesome#basic'
    }
  })