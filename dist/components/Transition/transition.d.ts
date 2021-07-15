import React from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
declare type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';
export interface TransitionWithAnimationProps {
    animation?: AnimationName;
    wrapper?: boolean;
}
export declare type TransitionProps = TransitionWithAnimationProps & CSSTransitionProps;
export declare const Transition: React.FC<TransitionProps>;
export default Transition;
