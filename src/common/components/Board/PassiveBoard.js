import React, { Component } from "react";
import PropTypes from "prop-types";
import HexSlot from "common/components/HexSlot/HexSlot";
import HexUnitDraggable from "common/components/HexUnit/HexUnitDraggable";
import { BoardWrapper } from "./Board.styled";
import board from "common/consts/board";
import slots from "common/consts/slots";

import Hexagon from "../Hexagon/Hexagon";
import { Health, Arrow, ArrowWrapper, ArrowWrapper2 } from "../HexUnit/HexUnit.styled";

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
            coordinates={slots[unit.slotId].coordinates}
            unit={unit}
          />
        ))}

        <Hexagon
          backgroundColor="blue"
          styleProps={`position: absolute; bottom: 10px; right: 50px;`}
        >
          <Health>{100}</Health>
          <ArrowWrapper>
            <ArrowWrapper2 attackSpeed={1} rotateValue={90}>
              <Arrow>></Arrow>
            </ArrowWrapper2>
          </ArrowWrapper>
        </Hexagon>
      </BoardWrapper>
    );
  }
}

PassiveBoard.propTypes = {
  unitsOnBoard: PropTypes.array,
  moveUnit: PropTypes.func,
  myId: PropTypes.number,
};

export default PassiveBoard;
