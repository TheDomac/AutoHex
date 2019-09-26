import React, { Component } from "react";
import { connect } from "react-redux";
import HexSlot from "common/components/HexSlot/HexSlot";
import { BoardWrapper, HexRow } from "./Board.styled";
import board from "common/consts/board";
import { getUnitsOnBoard } from "selectors/game";
import { moveUnit } from "reducers/game";

class Board extends Component {
  render() {
    return (
      <BoardWrapper>
        {board.map((row, i) => {
          return (
            <HexRow key={i} topGapMultiplier={i} first={i % 2 !== 0}>
              {row.map(slot => (
                <HexSlot
                  slot={slot}
                  key={slot.id}
                  moveUnit={this.props.moveUnit}
                  unit={this.props.unitsOnBoard.find(unit => unit.slotId === slot.id)}
                ></HexSlot>
              ))}
            </HexRow>
          );
        })}
      </BoardWrapper>
    );
  }
}

const mapStateToProps = state => ({
  unitsOnBoard: getUnitsOnBoard(state),
});

const mapDispatchToProps = {
  moveUnit,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
