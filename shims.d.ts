interface AnyInterface {
  [props: string]: any;
}

declare module "react-typewriter-effect" {
  import React from "react";

  interface TypeWriterEffectProps {
    textStyle?: React.CSSProperties;
    startDelay?: number;
    cursorColor?: string;
    text?: string;
    typeSpeed?: number;
    eraseSpeed?: number;

    [propName: string]: any,
  }

  export default class TypeWriterEffect extends React.Component<TypeWriterEffectProps> {
  }
}
declare module "node-pop3" {
  export default class Pop3Command implements AnyInterface {
    constructor(any){}
  }
}
