import { FC } from "react";
import Upload, { UploadProps } from "./upload";
import UploadList, { UploadListProps } from "./uploadList";

export type IUploadComponent = FC<UploadProps> & {
  List: FC<UploadListProps>
}

const TransUpload = Upload as IUploadComponent;

TransUpload.List = UploadList;

export default UploadList;
