import React from "react";
import { ThemeProps } from "../Icon/Icon";
export interface ProgressProps {
    percent: number;
    stokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}
export declare const Progress: React.FC<ProgressProps>;
export default Progress;
