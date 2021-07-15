import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 FighterUI 组件库</h1>
        <p>FighterUI 是模仿Ant-design的一款简洁的React组件库</p>
        <h3>安装试试</h3>
        <code>
          npm install FighterUI --save
        </code>
      </>
    )
  }, { info : { disable: true }})