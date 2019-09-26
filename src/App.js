import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import Board from "common/components/Board/Board";
import getPathsBetweenTwoSlots from "./common/utils/getPathsBetweenTwoSlots";

class App extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    );
  }
}
export default App;
