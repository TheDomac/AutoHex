import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { myId } from "mocks/consts/players";

import ActiveBoard from "common/components/Board/ActiveBoard";
import PassiveBoard from "common/components/Board/PassiveBoard";

import { getPlayers, getIsGamePlaying, getFights } from "selectors/game";
import { moveUnit, resumeGame } from "reducers/game";

class App extends Component {
  render() {
    const { players, isGamePlaying, fights } = this.props;
    return (
      <DndProvider backend={HTML5Backend}>
        {!isGamePlaying && (
          <>
            <PassiveBoard
              unitsOnBoard={players.find(player => player.id === myId).unitsOnBoard}
              moveUnit={this.props.moveUnit}
              myId={this.props.myId}
            />
            <button onClick={this.props.resumeGame}>Resume game</button>
          </>
        )}
        {isGamePlaying &&
          fights.map(fight => <ActiveBoard key={fight.id} fight={fight} myId={myId} />)}
      </DndProvider>
    );
  }
}

const mapStateToProps = state => ({
  players: getPlayers(state),
  fights: getFights(state),
  isGamePlaying: getIsGamePlaying(state),
});

const mapDispatchToProps = {
  moveUnit,
  resumeGame,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
