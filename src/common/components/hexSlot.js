import React, { Component } from "react";

import { HexMain, HexTop, HexBottom } from "./hexSlot.styled";

class HexSlot extends Component {
  render() {
    return (
      <HexMain first={this.props.first}>
        {this.props.slot.id}
        <HexTop />
        <HexBottom />
      </HexMain>
    );
  }
}

export default HexSlot;
