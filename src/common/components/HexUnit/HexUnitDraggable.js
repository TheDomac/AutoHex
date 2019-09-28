import React from "react";
import { useDrag } from "react-dnd";
import { connect } from "react-redux";

import { getUnitsOnBoard, getMyId } from "selectors/game";
import Hexagon from "common/components/Hexagon/Hexagon";

function HexUnitDraggable(props) {
  const [, drag] = useDrag({
    item: { type: `hexUnit-${props.unit.playerId}`, id: props.unit.id },
    collect: monitor => ({
      // isDragging: monitor.isDragging(),
    }),
  });

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

export default connect(mapStateToProps)(HexUnitDraggable);
