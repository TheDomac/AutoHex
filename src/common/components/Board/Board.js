import React, { Component } from "react";
import { connect } from "react-redux";
import HexSlot from "common/components/HexSlot/HexSlot";
import { BoardWrapper, HexRow } from "./Board.styled";
import board from "common/consts/board";
import { getUnitsOnBoard, getMyId, getUnitsWithActions } from "selectors/game";
import { moveUnit, toggleIsGamePlaying, moveUnits, attackUnit } from "reducers/game";

class Board extends Component {
  state = {
    interval: null,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isGamePlaying && this.props.isGamePlaying) {
      const interval = setInterval(this.props.moveUnits, 1000);
      this.setState({ interval });
    }

    if (prevProps.isGamePlaying && !this.props.isGamePlaying) {
      clearInterval(this.state.interval);
    }
  }
  render() {
    return (
      <>
        <BoardWrapper>
          {board.map((row, i) => {
            return (
              <HexRow key={i} topGapMultiplier={i} first={i % 2 !== 0}>
                {row.map(slot => (
                  <HexSlot
                    isGamePlaying={this.props.isGamePlaying}
                    slot={slot}
                    key={slot.id}
                    moveUnit={this.props.moveUnit}
                    unit={this.props.unitsOnBoard.find(unit => unit.slotId === slot.id)}
                    myId={this.props.myId}
                    unitsWithActions={this.props.unitsWithActions}
                    attackUnit={this.props.attackUnit}
                  ></HexSlot>
                ))}
              </HexRow>
            );
          })}
        </BoardWrapper>
        <button onClick={this.props.toggleIsGamePlaying}>
          Is game playing: {this.props.isGamePlaying ? "Yes" : "No"}
        </button>
      </>
    );
  }
}

const mapStateToProps = state => ({
  unitsOnBoard: getUnitsOnBoard(state),
  myId: getMyId(state),
  unitsWithActions: getUnitsWithActions(state),
  isGamePlaying: state.game.isGamePlaying,
});

const mapDispatchToProps = {
  moveUnit,
  toggleIsGamePlaying,
  moveUnits,
  attackUnit,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
