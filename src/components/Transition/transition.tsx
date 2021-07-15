import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';

export interface TransitionWithAnimationProps {
  animation?: AnimationName;
  wrapper?: boolean;
}

export type TransitionProps = TransitionWithAnimationProps & CSSTransitionProps;
export const Transition: React.FC<TransitionProps> = (props) => {
  const { classNames, animation, children, wrapper, ...restProps } = props;
  return (
    <CSSTransition {...restProps} classNames={ classNames ? classNames : animation}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
}
export default Transition;
