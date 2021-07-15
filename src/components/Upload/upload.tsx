import React, { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  /**必选参数, 上传的地址 */
  action: string;
  /**	上传的文件列表 */
  defaultFileList?: UploadFile[];
  /**上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传 */
  beforeUpload?: (file: UploadFile) => boolean | Promise<UploadFile>;
  /**文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /**文件上传成功时的钩子 */
  onSuccess?: (data: any, file: UploadFile) => void;
  /**文件上传失败时的钩子 */
  onError?: (err: any, file: UploadFile) => void;
  /**文件状态改变时的钩子，上传成功或者失败时都会被调用 */
  onChange?: (file: UploadFile) => void;
  /**文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /**设置上传的请求头部 */
  headers?: {[key: string]: any};
  /**上传的文件字段名 */
  name?: string;
  /**上传时附带的额外参数 */
  data?: {[key: string]: any};
  /**支持发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /**是否支持多选文件 */
  multiple?: boolean;
  /**可选参数, 接受上传的文件类型 */
  accept?: string;
  /**是否支持拖拽上传 */
  drag?: boolean;
}

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'FighterUi'
 * ~~~
 */
export const Upload: React.FC<UploadProps> = (props) => {
  const { action, onError, onProgress, onSuccess, beforeUpload, onChange, defaultFileList, onRemove, headers, name, data, withCredentials, multiple, accept, children, drag } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList ? defaultFileList : []);
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return {
            ...file,
            ...updateObj
          }
        } else {
          return file;
        }
      });
    });
  }
  const handleClick = (e: React.MouseEvent) => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  }
  const uploadFiles = (files: FileList) => {
    const fileList = Array.from(files);
    fileList.forEach(file => {
      let _file: UploadFile = {
        uid: Date.now() + 'upload-file',
        status: 'ready',
        name: file.name,
        size: file.size,
        percent: 0,
        raw: file
      }
      if (!beforeUpload) {
        post(_file, file);
      } else {
        const result = beforeUpload(_file);
        if (result && result instanceof Promise) {
          result.then(res => {
            post(res, file);
          });
        } else if (result !== false) {
          post(_file, file);
        }
      }
    });
  }
  const post = (file: UploadFile, rawFile: File) => {
    setFileList(prevList => [file, ...prevList]);
    const formData = new FormData();
    formData.append(name || 'file', rawFile);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios.post(action, formData, {
     headers: {
       'Content-Type': 'multipart/form-data',
       ...headers
     },
     onUploadProgress: (e) => {
       let percentage = Math.round((e.loaded * 100) / e.total) || 0;
       if (percentage < 100) {
        updateFileList(file, {
          status: 'uploading',
          percent: percentage
        });
        onProgress && onProgress(percentage, file);
       }
     },
     withCredentials
    }).then(res => {
     console.log(res);
     onChange && onChange(file);
     onSuccess && onSuccess(res.data, file);
     updateFileList(file, {
       status: 'success',
       response: res.data
     });
    }).catch(err => {
     console.log(err);
     onChange && onChange(file);
     onError && onError(err, file);
     updateFileList(file, {
      status: 'error',
      error: err
     });
    });
  }
  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    onRemove && onRemove(file);
  }
  return (
    <div className="viking-upload-component">
      <div className="viking-upload-input" style={{display: 'inline-block'}} onClick={handleClick} >
        {drag ? <Dragger onFile={uploadFiles}>{children}</Dragger> : children}
      </div>
      <input type="file" ref={fileInput} className="viking-file-input" onChange={handleChange} style={{display: 'none'}} accept={accept} multiple={multiple} />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
}

Upload.defaultProps = {
  name: 'file'
}
export default Upload;
