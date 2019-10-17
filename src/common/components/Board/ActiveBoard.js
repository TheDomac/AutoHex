import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import HexSlot from "common/components/HexSlot/HexSlot";
import HexUnitActive from "common/components/HexUnit/HexUnitActive";
import { BoardWrapper } from "./Board.styled";
import board from "common/consts/board";
import slots from "common/consts/slots";
import giveActions from "common/utils/giveActions";
import isRoundOver from "common/utils/isRoundOver";
import { generateUnitsForFight, sortPlayers } from "common/utils/generateUnitsForFight";

import { finishFight } from "reducers/game";

class ActiveBoard extends Component {
  state = {
    players: sortPlayers(this.props.fight.players, this.props.myId),
    unitsWithActions: giveActions(generateUnitsForFight(this.props.fight.players, this.props.myId)),
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
      const fightLoserId = unitsWithActions[0]
        ? this.state.players.find(player => player.id !== unitsWithActions[0].playerId).id
        : this.state.players[1].id;
      const damage = 3 + unitsWithActions.length * 3;

      setTimeout(() => {
        this.props.finishFight(this.props.fightId, fightLoserId, damage);
      }, 3000);
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
        {players[0].nickName} - {players[0].health}
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
        {players[1].nickName} - {players[1].health}
      </>
    );
  }
}

ActiveBoard.propTypes = {
  players: PropTypes.array,
  myId: PropTypes.number,
};

const mapDispatchToProps = {
  finishFight,
};

export default connect(
  null,
  mapDispatchToProps,
)(ActiveBoard);
