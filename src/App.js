import React, { Component } from "react";
import { connect } from "react-redux";
import HTML5Backend from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { myId } from "mocks/consts/players";

import ActiveBoard from "common/components/Board/ActiveBoard";
import PassiveBoard from "common/components/Board/PassiveBoard";

import { getPlayers, getIsGamePlaying, getFights, getSetSelectedPlayerId } from "selectors/game";
import { moveUnit, resumeGame, setSelectedPlayer } from "reducers/game";
import moveToEnemySide from "common/utils/moveToEnemySide";

class App extends Component {
  setSelectedPlayer = selectedPlayerId => () => {
    this.props.setSelectedPlayer(selectedPlayerId);
  };
  render() {
    const { players, isGamePlaying, fights, selectedPlayerId } = this.props;

    const selectedPlayer = players.find(player => player.id === selectedPlayerId);

    return (
      <DndProvider backend={HTML5Backend}>
        {!isGamePlaying && (
          <>
            <PassiveBoard
              unitsOnBoard={
                selectedPlayer.id !== myId
                  ? moveToEnemySide(selectedPlayer).unitsOnBoard
                  : selectedPlayer.unitsOnBoard
              }
              moveUnit={this.props.moveUnit}
              myId={this.props.myId}
            />
            <button onClick={this.props.resumeGame}>Resume game</button>
          </>
        )}
        {isGamePlaying &&
          fights.map(fight => <ActiveBoard key={fight.id} fight={fight} myId={myId} />)}
        {players.map(player => (
          <button key={player.id} onClick={this.setSelectedPlayer(player.id)}>
            {player.nickName}
          </button>
        ))}
      </DndProvider>
    );
  }
}

const mapStateToProps = state => ({
  players: getPlayers(state),
  fights: getFights(state),
  isGamePlaying: getIsGamePlaying(state),
  selectedPlayerId: getSetSelectedPlayerId(state),
});

const mapDispatchToProps = {
  moveUnit,
  resumeGame,
  setSelectedPlayer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
