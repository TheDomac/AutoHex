import React from "react";
import { useDrag } from "react-dnd";

import Hexagon from "common/components/Hexagon/Hexagon";

function HexUnitDraggable({ unit, coordinates }) {
  const [, drag] = useDrag({
    item: { type: `hexUnit-${unit.playerId}`, id: unit.id },
    collect: monitor => ({
      // isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Hexagon
      styleProps={`position: absolute; left: ${88 * coordinates[0]}px; top:${76.75 *
        coordinates[1]}px`}
      backgroundColor="blue"
      ref={drag}
    />
  );
}

export default HexUnitDraggable;
