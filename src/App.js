import React, { Component } from "react";

import HexSlot from "common/components/hexSlot";
import { HexWrapper } from "common/components/hexSlot.styled";

import getPathsBetweenTwoSlots from "common/utils/getPathsBetweenTwoSlots";

class App extends Component {
  render() {
    console.log(getPathsBetweenTwoSlots(1, 21));
    return (
      <HexWrapper>
        <HexSlot />
        <HexSlot />
        <HexSlot />
      </HexWrapper>
    );
  }
}

export default App;
