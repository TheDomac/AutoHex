import React, { Component } from "react";

import Hexagon from "common/components/Hexagon/Hexagon";
import actionTypes from "common/consts/actionTypes";
import { X_DIFF, Y_DIFF } from "common/consts/hexSlotPositionDiffs";
import { Health, Arrow, ArrowWrapper } from "./HexUnit.styled";
import calculateTargetAngle from "common/utils/calculateTargetAngle";

import champions from "mocks/consts/champions";

class HexUnitActive extends Component {
  state = {
    attackInterval: null,
    moveInterval: null,
  };

  componentDidUpdate(prevProps) {
    this.checkForChangesInAction(
      prevProps,
      actionTypes.ATTACK,
      (1 / this.props.unitWithAction.attackSpeed) * 1000,
      this.attackUnit,
    );

    this.checkForChangesInAction(prevProps, actionTypes.MOVE, 1000, this.moveUnit);
  }

  checkForChangesInAction = (prevProps, actionType, intervalDuration, intervalAction) => {
    if (
      (prevProps.unitWithAction.action.type !== actionType &&
        this.props.unitWithAction.action.type === actionType) ||
      (!prevProps.isActive &&
        this.props.isActive &&
        this.props.unitWithAction.action.type === actionType)
    ) {
      const interval = setInterval(intervalAction, intervalDuration);
      this.setState({ [`${actionType}Interval`]: interval });
    }

    if (
      prevProps.unitWithAction.action.type === actionType &&
      this.props.unitWithAction.action.type !== actionType
    ) {
      clearInterval(this.state[`${actionType}Interval`]);
    }
  };

  componentWillUnmount() {
    clearInterval(this.state.attackInterval);
    clearInterval(this.state.moveInterval);
  }

  attackUnit = () => {
    this.props.attackUnit(this.props.unitWithAction);
  };

  moveUnit = () => {
    this.props.moveUnit(this.props.unitWithAction);
  };

  render() {
    return (
      <Hexagon
        styleProps={`
        position: absolute;
        z-index: 4;
        transition: 300ms;
        transform: translate(${X_DIFF * this.props.coordinates[0]}px, ${Y_DIFF *
          this.props.coordinates[1]}px);
        `}
        backgroundColor={champions[this.props.unitWithAction.championId].backgroundColor}
      >
        <Health>{this.props.unitWithAction.health}</Health>
        {this.props.unitWithAction.action.type === actionTypes.ATTACK && (
          <ArrowWrapper
            rotateValue={calculateTargetAngle(
              this.props.unitWithAction.slotId,
              this.props.unitWithAction.action.target.slotId,
            )}
          >
            <Arrow attackSpeed={1 / this.props.unitWithAction.attackSpeed}>↑</Arrow>
          </ArrowWrapper>
        )}
      </Hexagon>
    );
  }
}

export default HexUnitActive;
