import React from "react";

import { HexMain, HexTop, HexBottom } from "./Hexagon.styled";

const Hexagon = React.forwardRef((props, ref) => (
  <HexMain
    styleProps={props.styleProps}
    ref={ref}
    backgroundColor={props.backgroundColor}
    borderColor={props.borderColor}
  >
    <HexTop borderColor={props.borderColor} />
    {props.children}
    <HexBottom borderColor={props.borderColor} />
  </HexMain>
));

export default Hexagon;
