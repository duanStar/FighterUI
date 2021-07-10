import { render, fireEvent, RenderResult, cleanup } from "@testing-library/react";
import { Select, SelectProps } from "./select";
import { Option } from "./option";

const testProps: SelectProps = {
  placeholder: '请选择',
  onChange:jest.fn(),
  onVisibleChange:jest.fn()
}

const disableProps: SelectProps = {
  placeholder: '请选择',
  onChange:jest.fn(),
  onVisibleChange:jest.fn(),
  disabled: true
}

const multipleProps: SelectProps = {
  placeholder: '请选择',
  onChange:jest.fn(),
  onVisibleChange:jest.fn(),
  multiple: true
}

const generateSelect = (props: SelectProps) => {
  return (<Select
    {...props}
  >
    <Option value="nihao" />
    <Option value="nihao2" />
    <Option value="nihao3" />
    <Option
      disabled
      value="disabled"
    />
    <Option value="nihao5" />
  </Select>)
}

let wrapper: RenderResult, inputElement: HTMLInputElement;
describe('test Select Component', () => {
  beforeEach(() => {
    wrapper = render(generateSelect(testProps));
    inputElement = wrapper.getByPlaceholderText('请选择') as HTMLInputElement;
  });
  it('should correct render the single select component and click option to choose', () => {
    expect(inputElement).toBeInTheDocument();
    fireEvent.click(wrapper.container.querySelector('.viking-input-wrapper') as HTMLElement);
    expect(testProps.onVisibleChange).toBeCalledWith(true);
    const dropdownWrapper = wrapper.container.querySelector('.viking-select-dropdown') as HTMLElement;
    expect(dropdownWrapper).toBeInTheDocument();
    expect(dropdownWrapper.querySelectorAll('.viking-select-item').length).toEqual(5);
    fireEvent.click(dropdownWrapper.querySelectorAll('.viking-select-item')[0]);
    expect(testProps.onChange).toBeCalledWith('nihao', ['nihao']);
    expect(inputElement.value).toEqual('nihao');
    fireEvent.click(dropdownWrapper.querySelectorAll('.viking-select-item')[3]);
    expect(testProps.onChange).not.toBeCalledWith('disabled', ['disabled']);
    expect(inputElement.value).toEqual('nihao');
  });
  it('should correct render the disable select component', () => {
    cleanup();
    wrapper = render(generateSelect(disableProps));
    inputElement = wrapper.getByPlaceholderText('请选择') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    fireEvent.click(wrapper.container.querySelector('.viking-input-wrapper') as HTMLElement);
    expect(disableProps.onVisibleChange).not.toBeCalledWith(true);
    const dropdownWrapper = wrapper.container.querySelector('.viking-select-dropdown') as HTMLElement;
    expect(dropdownWrapper).toBeNull();
  });
  it('should correct render the multiple select component and click to add selected value', () => {
    cleanup();
    wrapper = render(generateSelect(multipleProps));
    inputElement = wrapper.getByPlaceholderText('请选择') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    fireEvent.click(wrapper.container.querySelector('.viking-input-wrapper') as HTMLElement);
    expect(multipleProps.onVisibleChange).toBeCalledWith(true);
    const dropdownWrapper = wrapper.container.querySelector('.viking-select-dropdown') as HTMLElement;
    expect(dropdownWrapper).toBeInTheDocument();
    expect(dropdownWrapper.querySelectorAll('.viking-select-item').length).toEqual(5);
    fireEvent.click(dropdownWrapper.querySelectorAll('.viking-select-item')[0]);
    expect(multipleProps.onChange).toBeCalledWith('nihao', ['nihao']);
    expect(inputElement.value).toEqual('');
    fireEvent.click(dropdownWrapper.querySelectorAll('.viking-select-item')[1]);
    expect(multipleProps.onChange).toBeCalledWith('nihao2', ['nihao', 'nihao2']);
    const tagWrapper = wrapper.container.querySelector('.viking-selected-tags') as HTMLElement;
    expect(tagWrapper).toBeInTheDocument();
    expect(tagWrapper.querySelectorAll('.viking-tag').length).toEqual(2);
    fireEvent.click(dropdownWrapper.querySelectorAll('.viking-select-item')[0]);
    expect(multipleProps.onChange).toBeCalledWith('nihao', ['nihao2']);
    expect(tagWrapper.querySelectorAll('.viking-tag').length).toEqual(1);
  });
});