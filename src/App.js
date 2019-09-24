import React, { Component } from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import HexField from "common/components/HexField";

class App extends Component {
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <HexField />
      </DndProvider>
    );
  }
}
export default App;
