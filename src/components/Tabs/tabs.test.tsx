import { fireEvent, render, RenderResult } from "@testing-library/react";
import Tabs, {TabsProps} from "./tabs";
import TabItem from "./tabItem";

const testLineProps: TabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  type: "line"
}

const testCardProps: TabsProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  type: "card"
}

const generateTabs = (props: TabsProps) => {
  return (<Tabs
    {...props}
  >
    <TabItem label="active">
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
  </Tabs>);
}

let wrapper: RenderResult, tabElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement, tabNavElement: HTMLElement, contentElement: HTMLElement;

describe('test tabs component in default(line) mode', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testLineProps));
    tabElement = wrapper.getByTestId('test-tab');
    tabNavElement = wrapper.getByTestId('test-tab-nav');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
    contentElement = wrapper.getByText('this is card one');
  });
  it('should render the correct Tabs based on default props', () => {
    expect(tabElement).toBeInTheDocument();
    expect(tabElement).toHaveClass('viking-tabs');
    expect(tabNavElement).toBeInTheDocument();
    expect(tabNavElement).toHaveClass('viking-tabs-nav nav-line');
    expect(tabNavElement.querySelectorAll(':scope > li').length).toEqual(3);
    expect(activeElement).toHaveClass('viking-tabs-nav-item is-active');
    expect(disabledElement).toHaveClass('viking-tabs-nav-item disabled');
    expect(contentElement).toBeVisible();
  });
  it('click items should change active and call the right callback', () => {
    const secondElement = wrapper.getByText('card2');
    fireEvent.click(secondElement);
    expect(secondElement).toHaveClass('is-active');
    expect(wrapper.getByText('this is content two')).toBeVisible();
    expect(wrapper.queryByText('this is content one')).toBeNull();
    expect(testLineProps.onSelect).toHaveBeenCalledWith(1);
    expect(activeElement).not.toHaveClass('is-active')
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testLineProps.onSelect).not.toHaveBeenCalledWith(2);
  });
});

describe('test tabs component in card mode', () => {
  beforeEach(() => {
    wrapper = render(generateTabs(testCardProps));
    tabElement = wrapper.getByTestId('test-tab');
    tabNavElement = wrapper.getByTestId('test-tab-nav');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
    contentElement = wrapper.getByText('this is card one');
  });
  it('should render the correct Tabs based on default props', () => {
    expect(tabElement).toBeInTheDocument();
    expect(tabElement).toHaveClass('viking-tabs');
    expect(tabNavElement).toBeInTheDocument();
    expect(tabNavElement).toHaveClass('viking-tabs-nav nav-card');
    expect(tabNavElement.querySelectorAll(':scope > li').length).toEqual(3);
    expect(activeElement).toHaveClass('viking-tabs-nav-item is-active');
    expect(disabledElement).toHaveClass('viking-tabs-nav-item disabled');
    expect(contentElement).toBeVisible();
  });
  it('click items should change active and call the right callback', () => {
    const secondElement = wrapper.getByText('card2');
    fireEvent.click(secondElement);
    expect(secondElement).toHaveClass('is-active');
    expect(wrapper.getByText('this is content two')).toBeVisible();
    expect(wrapper.queryByText('this is content one')).toBeNull();
    expect(testCardProps.onSelect).toHaveBeenCalledWith(1);
    expect(activeElement).not.toHaveClass('is-active')
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('is-active');
    expect(testCardProps.onSelect).not.toHaveBeenCalledWith(2);
  });
});