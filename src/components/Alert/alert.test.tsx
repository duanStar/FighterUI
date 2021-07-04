import React from "react";
import { render , fireEvent} from '@testing-library/react';
import { Alert, AlertProps } from "./alert";

const testProps: AlertProps = {
  title: 'Hello',
  type: 'default',
  closable: true,
  className: 'kclass'
}

const descProps: AlertProps = {
  title: 'Hello',
  description: 'desc'
}

const closeProps: AlertProps = {
  onClose: jest.fn()
}

describe('test alert component', () => {
  it('should render the correct component based on different props', () => {
    const wrapper = render(<Alert {...testProps} ></Alert>);
    const element = wrapper.baseElement.querySelector('.alert');
    const closeEle = wrapper.container.querySelector('.close') as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(closeEle).toBeInTheDocument();
    expect(element).toHaveClass('alert alert-default kclass');
  });
  it('should render the correct component with description', () => {
    const wrapper = render(<Alert {...descProps} ></Alert>);
    const element = wrapper.baseElement.querySelector('.alert');
    const descEle = wrapper.getByText('desc');
    expect(element).toBeInTheDocument();
    expect(descEle).toBeInTheDocument();
  });
  it('should render the correct component with the close event trigger', () => {
    const wrapper = render(<Alert {...closeProps} ></Alert>);
    const element = wrapper.baseElement.querySelector('.alert');
    const closeEle = wrapper.container.querySelector('.close') as HTMLElement;
    expect(element).toBeInTheDocument();
    fireEvent.click(closeEle);
    expect(closeProps.onClose).toHaveBeenCalled();
  });
});