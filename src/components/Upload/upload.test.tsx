import { render, fireEvent, waitFor, RenderResult, createEvent } from "@testing-library/react";
import { Upload, UploadProps } from "./upload";
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import React from 'react';

jest.mock('../Icon/Icon', () => {
  return (item: any) => {
    return <span onClick={item.onClick}>{item.icon}</span>
  }
});
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: 'fakeurl.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(['xyz'], 'test.png', {
  type: 'image/png'
});
describe('test Upload Components', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}> Click to Upload</Upload>);
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement;
    uploadArea = wrapper.getByText('Click to Upload');
  });
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper;
    // mockAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'});
    // });
    mockAxios.post.mockResolvedValue({'data': 'cool'});
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // expect(queryByText('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument();
    });
    expect(queryByText('check-circle')).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      name: 'test.png'
    }));
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      name: 'test.png'
    }));
    expect(queryByText('times')).toBeInTheDocument();
    fireEvent.click(wrapper.getByText('times'));
    expect(queryByText('test.png')).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }));
  });
  it('drag and drop files should works fine', async () => {
    mockAxios.post.mockResolvedValue({'data': 'cool'});
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass('is-dragover');
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass('is-dragover');
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile]
      }
    });
    fireEvent(uploadArea, mockDropEvent);
    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      name: 'test.png'
    }));
  });
});
