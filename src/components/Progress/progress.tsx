import React from "react";
import { ThemeProps } from "../Icon/Icon";
import classNames from "classnames";

export interface ProgressProps {
  percent: number;
  stokeHeight?: number;
  showText?: boolean;
  styles?: React.CSSProperties;
  theme?: ThemeProps;
}

export const Progress: React.FC<ProgressProps> = (props) => {
  const { percent, stokeHeight, showText, styles, theme } = props;
  const classes = classNames('viking-progress-bar-inner', {
    [`color-${theme}`]: theme
  })
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{height: `${stokeHeight}px`}}>
        <div className={classes} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text">{percent + '%'}</span>}
        </div>
      </div>
    </div>
  );
}

Progress.defaultProps = {
  showText: true,
  stokeHeight: 15,
  theme: 'primary'
}
export default Progress;
