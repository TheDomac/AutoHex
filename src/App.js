import React, { Component } from "react";

import HexSlot from "common/components/hexSlot";

import getPathsBetweenTwoSlots from "common/utils/getPathsBetweenTwoSlots";

class App extends Component {
  render() {
    console.log(getPathsBetweenTwoSlots(1, 21));
    return (
      <div>
        <HexSlot />
      </div>
    );
  }
}

export default App;
