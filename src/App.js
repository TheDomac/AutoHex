import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import ActiveBoard from "common/components/Board/ActiveBoard";
import PassiveBoard from "common/components/Board/PassiveBoard";

import { getMyId, getUnitsOnBoard } from "selectors/game";
import { moveUnit } from "reducers/game";

class App extends Component {
  state = {
    isGamePlaying: false,
  };

  toggleIsGamePlaying = () => {
    this.setState({ isGamePlaying: !this.state.isGamePlaying });
  };
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        {!this.state.isGamePlaying && (
          <PassiveBoard
            unitsOnBoard={this.props.unitsOnBoard}
            moveUnit={this.props.moveUnit}
            myId={this.props.myId}
          />
        )}
        {this.state.isGamePlaying && (
          <ActiveBoard unitsOnBoard={this.props.unitsOnBoard} myId={this.props.myId} />
        )}
        <button onClick={this.toggleIsGamePlaying}>
          Is game playing: {this.state.isGamePlaying ? "yes" : "no"}
        </button>
      </DndProvider>
    );
  }
}

const mapStateToProps = state => ({
  myId: getMyId(state),
  unitsOnBoard: getUnitsOnBoard(state),
});

const mapDispatchToProps = {
  moveUnit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
