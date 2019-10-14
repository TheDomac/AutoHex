import React, { Component } from "react";
import PropTypes from "prop-types";
import HexSlot from "common/components/HexSlot/HexSlot";
import HexUnitActive from "common/components/HexUnit/HexUnitActive";
import { BoardWrapper } from "./Board.styled";
import board from "common/consts/board";
import slots from "common/consts/slots";
import giveActions from "common/utils/giveActions";
import isRoundOver from "common/utils/isRoundOver";
import { generateUnitsForFight, sortPlayers } from "common/utils/generateUnitsForFight";

class ActiveBoard extends Component {
  state = {
    players: sortPlayers(this.props.players, this.props.myId),
    unitsWithActions: giveActions(generateUnitsForFight(this.props.players, this.props.myId)),
    isActive: false,
  };

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({ isActive: true });
    // }, 3000);
    this.setState({ isActive: true });
  }

  attackUnit = unitWithAction => {
    const newUnits = this.state.unitsWithActions
      .map(unit =>
        unit.id === unitWithAction.action.target.id
          ? {
              ...unit,
              health: unit.health - unitWithAction.damage,
            }
          : unit,
      )
      .filter(unit => unit.health > 0);

    const unitsWithActions = giveActions(newUnits);
    this.setState({
      unitsWithActions,
    });

    if (isRoundOver(unitsWithActions)) {
      console.log("FIGHT FINISHED");
    }
  };

  moveUnit = unitWithAction => {
    const newUnits = this.state.unitsWithActions.map(unit =>
      unit.id === unitWithAction.id
        ? {
            ...unit,
            slotId: unitWithAction.action.target,
          }
        : unit,
    );

    this.setState({
      unitsWithActions: giveActions(newUnits),
    });
  };

  render() {
    const { unitsWithActions, isActive, players } = this.state;
    const { myId } = this.props;
    return (
      <>
        {players[0].nickName}
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
              moveUnit={this.moveUnit}
              isActive={isActive}
            />
          ))}
        </BoardWrapper>
        {players[1].nickName}
      </>
    );
  }
}

ActiveBoard.propTypes = {
  players: PropTypes.array,
  myId: PropTypes.number,
};

export default ActiveBoard;
