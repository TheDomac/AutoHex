import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { myId } from "mocks/consts/players";

import ActiveBoard from "common/components/Board/ActiveBoard";
import PassiveBoard from "common/components/Board/PassiveBoard";
import generateUnitsForFight from "common/utils/generateUnitsForFight";

import { getPlayers } from "selectors/game";
import { moveUnit } from "reducers/game";

class App extends Component {
  state = {
    isGamePlaying: false,
  };

  toggleIsGamePlaying = () => {
    this.setState({ isGamePlaying: !this.state.isGamePlaying });
  };

  render() {
    const { players } = this.props;
    console.log(generateUnitsForFight(players, myId));
    return (
      <DndProvider backend={HTML5Backend}>
        {!this.state.isGamePlaying && (
          <PassiveBoard
            unitsOnBoard={players.find(player => player.id === myId).unitsOnBoard}
            moveUnit={this.props.moveUnit}
            myId={this.props.myId}
          />
        )}
        {this.state.isGamePlaying && (
          <ActiveBoard unitsOnBoard={generateUnitsForFight(players, myId)} myId={myId} />
        )}
        <button onClick={this.toggleIsGamePlaying}>
          Is game playing: {this.state.isGamePlaying ? "yes" : "no"}
        </button>
      </DndProvider>
    );
  }
}

const mapStateToProps = state => ({
  players: getPlayers(state),
});

const mapDispatchToProps = {
  moveUnit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
