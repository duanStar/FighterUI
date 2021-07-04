import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import { Alert } from './alert';

const defaultAlert = () => (
  <Alert title="this is a default Alert" onClose={action("closed")} />
);

const otherTypesAlert = () => (
  <>
    <Alert title="this is a success Alert" onClose={action("closed")} type="success" />
    <Alert title="this is a danger Alert" onClose={action("closed")} type="danger" />
    <Alert title="this is a warning Alert" onClose={action("closed")} type="warning" />
  </>
);

const withDescAlert = () => (
  <Alert title="this is a Alert with description" onClose={action("closed")} description="this is a description!" />
)

storiesOf("Alert Component", module)
  .add("Alert", defaultAlert)
  .add("不同类型的 Alert", otherTypesAlert)
  .add("添加描述的 Alert", withDescAlert)