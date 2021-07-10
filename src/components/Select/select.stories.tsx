import { storiesOf } from "@storybook/react";
import { Select, SelectProps } from "./select";
import { Option, OptionProps } from "./option";
import { action } from "@storybook/addon-actions";

const defaultComponent = () => {
  return (<Select
    name="viking-select"
    onChange={action("change")}
    onVisibleChange={action("visible")}
    placeholder="请选择"
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
    <Option
      disabled
      value="disabled"
    />
    <Option value="nihao5" />
  </Select>);
}

const multipleComponent = () => {
  return (
  <Select
    multiple
    name="viking-select"
    onChange={action("change")}
    onVisibleChange={action("visible")}
    placeholder="支持多选欧！"
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
    <Option value="viking" />
    <Option value="viking2" />
  </Select>
  );
}

const disableComponent = () => {
  return (
    <Select
    disabled
    name="viking-select"
    placeholder="禁用啦！"
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
  </Select>
  )
}

storiesOf("Select Component", module)
  .add('Select', defaultComponent)
  .add('multiple Select', multipleComponent)
  .add('disabled Select', disableComponent)