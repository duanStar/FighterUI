import { FC } from "react";
import { SelectProps } from "./select";
import { OptionProps } from "./option";
export declare type ISelectComponent = FC<SelectProps> & {
    Option: FC<OptionProps>;
};
declare const TransSelect: ISelectComponent;
export default TransSelect;
