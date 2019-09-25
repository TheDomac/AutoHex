import React from "react";

import { HexMain, HexTop, HexBottom } from "./Hexagon.styled";

const Hexagon = React.forwardRef((props, ref) => (
  <HexMain ref={ref} backgroundColor={props.backgroundColor} borderColor={props.borderColor}>
    {props.children}
    <HexTop borderColor={props.borderColor} />
    <HexBottom borderColor={props.borderColor} />
  </HexMain>
));

export default Hexagon;
