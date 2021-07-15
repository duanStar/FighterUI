import { FC } from "react";
import { UploadProps } from "./upload";
import UploadList, { UploadListProps } from "./uploadList";
export declare type IUploadComponent = FC<UploadProps> & {
    List: FC<UploadListProps>;
};
export default UploadList;
