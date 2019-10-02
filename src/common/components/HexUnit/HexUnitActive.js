import React, { Component } from "react";

import Hexagon from "common/components/Hexagon/Hexagon";
import actionTypes from "common/consts/actionTypes";
// import calculateTargetAngle from "common/utils/calculateTargetAngle";

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
    return <Hexagon backgroundColor="blue">{this.props.children}</Hexagon>;
  }
}

export default HexUnitActive;
