import React, { Component } from "react";

import Hexagon from "common/components/Hexagon/Hexagon";

class HexUnitActive extends Component {
  componentDidMount() {
    // announce action
    // setInterval(this.doActionAndAnnounceNextAction, 1000)
  }

  componentWillUnmount() {
    // clearInterval
  }
  render() {
    return <Hexagon backgroundColor="blue">{this.props.children}</Hexagon>;
  }
}

export default HexUnitActive;
