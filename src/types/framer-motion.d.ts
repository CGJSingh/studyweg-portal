declare module 'framer-motion' {
  import * as React from 'react';

  export interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }

  export interface MotionStyle extends React.CSSProperties {
    x?: any;
    y?: any;
    z?: any;
    rotate?: any;
    rotateX?: any;
    rotateY?: any;
    rotateZ?: any;
    scale?: any;
    scaleX?: any;
    scaleY?: any;
    scaleZ?: any;
    skew?: any;
    skewX?: any;
    skewY?: any;
    originX?: any;
    originY?: any;
    originZ?: any;
    perspective?: any;
    transformPerspective?: any;
  }

  export type ForwardRefComponent<T, P> = React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;

  export type MotionComponent<P = {}> = ForwardRefComponent<HTMLElement, MotionProps & P>;

  export const motion: {
    [key: string]: MotionComponent<any>;
    div: MotionComponent<React.HTMLAttributes<HTMLDivElement>>;
    span: MotionComponent<React.HTMLAttributes<HTMLSpanElement>>;
    button: MotionComponent<React.ButtonHTMLAttributes<HTMLButtonElement>>;
    a: MotionComponent<React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    img: MotionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
    // Add any other HTML elements you use with motion
  };
  
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    custom?: any;
    initial?: boolean;
    exitBeforeEnter?: boolean;
    onExitComplete?: () => void;
    [key: string]: any;
  }
  
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
} 