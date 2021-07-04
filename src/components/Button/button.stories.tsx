import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Button } from './button';

const defaultButton = () => (
  <Button onClick={ action('clicked') }>Default Button</Button>
);

const buttonWithSize = () => (
  <>
    <Button size="lg">Large Button</Button>
    <hr />
    <Button size="sm">Small Button</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType="primary">Primary Button</Button>
    <hr />
    <Button btnType="danger">Danger Button</Button>
    <hr />
    <Button btnType="link" href="https://google.com">Link Button</Button>
  </>
);

storiesOf('Button Component', module)
  .add('Button', defaultButton)
  .add('不同尺寸的 Button', buttonWithSize)
  .add('不同样式的 Button', buttonWithType)