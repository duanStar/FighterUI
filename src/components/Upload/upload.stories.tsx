import { storiesOf } from "@storybook/react";
import { Upload, UploadFile } from "./upload";
import { action } from "@storybook/addon-actions";
import { Button } from "../Button/button";
import { Icon } from "../Icon/Icon";

const defaultUpload = () => {
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
  ];
  return (
    <Upload action="http://jsonplaceholder.typicode.com/posts/" defaultFileList={defaultFileList} onChange={action('change')} onError={action('error')} onSuccess={action('success')}   onProgress={action('progress')}>
      <Button btnType='primary'>
        <Icon icon='upload' />  点击上传
      </Button>
    </Upload>
  );
}
const checkSizeUpload = () => {
  const defaultFileList: UploadFile[] = [
    { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
    { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
    { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
  ];
  const checkFileSize = (file: UploadFile) => {
    if (Math.round(file.size / 1024) > 50) {
      alert('file is too big');
      return false;
    }
    return true;
  }
  return (
    <Upload action="http://jsonplaceholder.typicode.com/posts/" beforeUpload={checkFileSize} defaultFileList={defaultFileList} onChange={action('change')} onError={action('error')} onSuccess={action('success')} onProgress={action('progress')}>
    <Button btnType='primary'>
      <Icon icon="upload" /> 不能传大于50KB！ 
    </Button>
    </Upload>
  );
}

const dragUpload = () => (
  <Upload action="http://jsonplaceholder.typicode.com/posts/" onChange={action('change')} onError={action('error')} onSuccess={action('success')} onProgress={action('progress')} drag={true}>
    <Icon
      icon="upload"
      size='5x'
      theme="secondary"
    />
    <br />
    <p>
      点击或者拖动到此区域进行上传
    </p>
    </Upload>
)

storiesOf('Upload Component', module)
  .add('Upload', defaultUpload)
  .add('上传前检测文件大小', checkSizeUpload)
  .add('拖动上传', dragUpload)