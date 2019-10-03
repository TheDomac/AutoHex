import React, { Component } from "react";

import Hexagon from "common/components/Hexagon/Hexagon";
import actionTypes from "common/consts/actionTypes";
import { Health, Arrow } from "./HexUnit.styled";
import calculateTargetAngle from "common/utils/calculateTargetAngle";

const intervalDuration = 1000;

class HexUnitActive extends Component {
  state = {
    interval: null,
  };

  componentDidMount() {
    if (this.props.unitWithAction.action.type === actionTypes.ATTACK) {
      const interval = setInterval(this.attackUnit, intervalDuration);
      this.setState({ interval });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.unitWithAction.action.type !== actionTypes.ATTACK &&
      this.props.unitWithAction.action.type === actionTypes.ATTACK
    ) {
      const interval = setInterval(this.attackUnit, intervalDuration);
      this.setState({ interval });
    }

    if (
      prevProps.unitWithAction.action.type === actionTypes.ATTACK &&
      this.props.unitWithAction.action.type !== actionTypes.ATTACK
    ) {
      clearInterval(this.state.interval);
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
        backgroundColor="blue"
      >
        <Health>{this.props.unitWithAction.health}</Health>
        {this.props.unitWithAction.action.type === actionTypes.ATTACK && (
          <Arrow
            rotateValue={calculateTargetAngle(
              this.props.unitWithAction.slotId,
              this.props.unitWithAction.action.target.slotId,
            )}
          >
            ↑
          </Arrow>
        )}
      </Hexagon>
    );
  }
}

export default HexUnitActive;
