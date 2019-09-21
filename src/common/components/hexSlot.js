import React, { Component } from "react";

import { HexMain, HexTop, HexBottom } from "./hexSlot.styled";

class HexSlot extends Component {
  render() {
    return (
      <HexMain>
        <HexTop />
        <HexBottom />
      </HexMain>
    );
  }
}

export default HexSlot;
