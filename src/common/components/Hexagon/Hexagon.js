import React from "react";

import { HexMain, HexTop, HexBottom, HexChildren } from "./Hexagon.styled";

const Hexagon = React.forwardRef((props, ref) => (
  <HexMain
    styleProps={props.styleProps}
    ref={ref}
    backgroundColor={props.backgroundColor}
    borderColor={props.borderColor}
  >
    <HexTop borderColor={props.borderColor} />
    <HexChildren>{props.children}</HexChildren>
    <HexBottom borderColor={props.borderColor} />
  </HexMain>
));

export default Hexagon;
