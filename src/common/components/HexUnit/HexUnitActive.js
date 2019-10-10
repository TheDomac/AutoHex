import React, { Component } from "react";

import Hexagon from "common/components/Hexagon/Hexagon";
import actionTypes from "common/consts/actionTypes";
import { Health, Arrow, ArrowWrapper } from "./HexUnit.styled";
import calculateTargetAngle from "common/utils/calculateTargetAngle";

import champions from "mocks/consts/champions";

class HexUnitActive extends Component {
  state = {
    attackInterval: null,
  };

  componentDidUpdate(prevProps) {
    if (
      (prevProps.unitWithAction.action.type !== actionTypes.ATTACK &&
        this.props.unitWithAction.action.type === actionTypes.ATTACK) ||
      (!prevProps.isActive &&
        this.props.isActive &&
        this.props.unitWithAction.action.type === actionTypes.ATTACK)
    ) {
      const attackInterval = setInterval(
        this.attackUnit,
        (1 / this.props.unitWithAction.attackSpeed) * 1000,
      );
      this.setState({ attackInterval });
    }

    if (
      prevProps.unitWithAction.action.type === actionTypes.ATTACK &&
      this.props.unitWithAction.action.type !== actionTypes.ATTACK
    ) {
      clearInterval(this.state.attackInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  attackUnit = () => {
    this.props.attackUnit(this.props.unitWithAction);
  };

  render() {
    return (
      <Hexagon
        styleProps={`
        position: absolute;
        z-index: 4;
        transition: 300ms;
        transform: translate(${88 * this.props.coordinates[0]}px, ${76.75 *
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
