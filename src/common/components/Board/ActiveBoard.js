import React, { Component } from "react";
import PropTypes from "prop-types";
import HexSlot from "common/components/HexSlot/HexSlot";
import HexUnitActive from "common/components/HexUnit/HexUnitActive";
import { BoardWrapper } from "./Board.styled";
import board from "common/consts/board";
import slots from "common/consts/slots";
import giveActions from "common/utils/giveActions";

class ActiveBoard extends Component {
  state = {
    unitsWithActions: giveActions(this.props.unitsOnBoard),
    isActive: false,
    moveInterval: null,
  };

  componentDidMount() {
    setTimeout(() => {
      const moveInterval = setInterval(this.moveUnits, 1000);
      this.setState({ moveInterval, isActive: true });
    }, 3000);
  }

  attackUnit = () => {};

  render() {
    const { unitsWithActions, isActive } = this.state;
    const { myId } = this.props;
    return (
      <>
        <BoardWrapper>
          {board.map(slot => (
            <HexSlot key={slot.id} slot={slot} myId={myId} />
          ))}
          {unitsWithActions.map(unit => (
            <HexUnitActive
              key={unit.id}
              coordinates={slots[unit.slotId].coordinates}
              unitWithAction={unit}
              attackUnit={this.attackUnit}
              isActive={isActive}
            />
          ))}
        </BoardWrapper>
      </>
    );
  }
}

ActiveBoard.propTypes = {
  unitsOnBoard: PropTypes.array,
  myId: PropTypes.string,
};

export default ActiveBoard;
