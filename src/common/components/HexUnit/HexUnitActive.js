import React, { Component } from "react";

import Hexagon from "common/components/Hexagon/Hexagon";

import getClosestEnemyUnits from "common/utils/getClosestEnemyUnits";

class HexUnitActive extends Component {
  componentDidMount() {
    // announce action
    // setInterval(this.doActionAndAnnounceNextAction, 1000)
  }

  componentWillUnmount() {
    // clearInterval
  }
  render() {
    console.log(this.props);
    return <Hexagon backgroundColor="blue">{this.props.children}</Hexagon>;
  }
}

export default HexUnitActive;
