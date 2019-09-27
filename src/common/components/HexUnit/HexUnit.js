import React from "react";
import { useDrag } from "react-dnd";
import { connect } from "react-redux";

import { getUnitsOnBoard, getMyId } from "selectors/game";
import Hexagon from "common/components/Hexagon/Hexagon";
import getAdjacentEnemyUnits from "common/utils/getAdjacentEnemyUnits";
import getPathsToClosestEnemyUnits from "common/utils/getPathsToClosestEnemyUnits";

function HexUnitComponent(props) {
  const [, drag] = useDrag({
    item: { type: `hexUnit-${props.unit.playerId}`, id: props.unit.id },
    collect: monitor => ({
      // isDragging: monitor.isDragging(),
    }),
  });
  if (props.unit.playerId === props.myId) {
    const adjacentEnemyUnits = getAdjacentEnemyUnits(props.unit, props.unitsOnBoard);

    if (adjacentEnemyUnits.length > 0) {
      console.log("adjacentEnemyUnits", adjacentEnemyUnits);
    } else {
      console.log(
        "no adjacent units, closest:",
        getPathsToClosestEnemyUnits(props.unit, props.unitsOnBoard),
      );
    }
  }

  return (
    <Hexagon backgroundColor="blue" ref={drag}>
      {props.children}
    </Hexagon>
  );
}

const mapStateToProps = state => ({
  unitsOnBoard: getUnitsOnBoard(state),
  myId: getMyId(state),
});

export default connect(mapStateToProps)(HexUnitComponent);
