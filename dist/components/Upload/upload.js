var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useRef, useState } from "react";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 *
 * ~~~js
 * import { Upload } from 'FighterUi'
 * ~~~
 */
export var Upload = function (props) {
    var action = props.action, onError = props.onError, onProgress = props.onProgress, onSuccess = props.onSuccess, beforeUpload = props.beforeUpload, onChange = props.onChange, defaultFileList = props.defaultFileList, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList ? defaultFileList : []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function (e) {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var uploadFiles = function (files) {
        var fileList = Array.from(files);
        fileList.forEach(function (file) {
            var _file = {
                uid: Date.now() + 'upload-file',
                status: 'ready',
                name: file.name,
                size: file.size,
                percent: 0,
                raw: file
            };
            if (!beforeUpload) {
                post(_file, file);
            }
            else {
                var result = beforeUpload(_file);
                if (result && result instanceof Promise) {
                    result.then(function (res) {
                        post(res, file);
                    });
                }
                else if (result !== false) {
                    post(_file, file);
                }
            }
        });
    };
    var post = function (file, rawFile) {
        setFileList(function (prevList) { return __spreadArray([file], prevList); });
        var formData = new FormData();
        formData.append(name || 'file', rawFile);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign({ 'Content-Type': 'multipart/form-data' }, headers),
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    updateFileList(file, {
                        status: 'uploading',
                        percent: percentage
                    });
                    onProgress && onProgress(percentage, file);
                }
            },
            withCredentials: withCredentials
        }).then(function (res) {
            console.log(res);
            onChange && onChange(file);
            onSuccess && onSuccess(res.data, file);
            updateFileList(file, {
                status: 'success',
                response: res.data
            });
        }).catch(function (err) {
            console.log(err);
            onChange && onChange(file);
            onError && onError(err, file);
            updateFileList(file, {
                status: 'error',
                error: err
            });
        });
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        onRemove && onRemove(file);
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick }, drag ? React.createElement(Dragger, { onFile: uploadFiles }, children) : children),
        React.createElement("input", { type: "file", ref: fileInput, className: "viking-file-input", onChange: handleChange, style: { display: 'none' }, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file'
};
export default Upload;
