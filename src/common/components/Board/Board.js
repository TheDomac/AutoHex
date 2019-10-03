import React, { Component } from "react";
import { connect } from "react-redux";
import HexSlot from "common/components/HexSlot/HexSlot";
import HexUnitActive from "common/components/HexUnit/HexUnitActive";
import HexUnitDraggable from "common/components/HexUnit/HexUnitDraggable";
import { BoardWrapper } from "./Board.styled";
import board from "common/consts/board";
import slots from "common/consts/slots";
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
          {board.map(slot => (
            <HexSlot
              key={slot.id}
              slot={slot}
              myId={this.props.myId}
              moveUnit={this.props.moveUnit}
            />
          ))}
          {!this.props.isGamePlaying &&
            this.props.unitsOnBoard.map(unit => (
              <HexUnitDraggable
                key={unit.id}
                coordinates={slots[unit.slotId].coordinates}
                unit={unit}
              />
            ))}
          {this.props.isGamePlaying &&
            this.props.unitsWithActions.map(unit => (
              <HexUnitActive
                key={unit.id}
                coordinates={slots[unit.slotId].coordinates}
                unitWithAction={unit}
                attackUnit={this.props.attackUnit}
              />
            ))}
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
