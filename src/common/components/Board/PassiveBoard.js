import React, { Component } from "react";
import PropTypes from "prop-types";
import HexSlot from "common/components/HexSlot/HexSlot";
import HexUnitDraggable from "common/components/HexUnit/HexUnitDraggable";
import { BoardWrapper } from "./Board.styled";
import board from "common/consts/board";
import pureSlots from "common/consts/pureSlots";

class PassiveBoard extends Component {
  render() {
    const { unitsOnBoard, moveUnit, myId } = this.props;
    return (
      <BoardWrapper>
        {board.map(slot => (
          <HexSlot key={slot.id} slot={slot} myId={myId} moveUnit={moveUnit} />
        ))}
        {unitsOnBoard.map(unit => (
          <HexUnitDraggable
            key={unit.id}
            coordinates={pureSlots[unit.slotId].coordinates}
            unit={unit}
          />
        ))}
      </BoardWrapper>
    );
  }
}

PassiveBoard.propTypes = {
  unitsOnBoard: PropTypes.array,
  moveUnit: PropTypes.func,
  myId: PropTypes.string,
};

export default PassiveBoard;
