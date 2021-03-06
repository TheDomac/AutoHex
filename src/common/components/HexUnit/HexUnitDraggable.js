import React from "react";
import { useDrag } from "react-dnd";

import Hexagon from "common/components/Hexagon/Hexagon";
import { X_DIFF, Y_DIFF } from "common/consts/hexSlotPositionDiffs";
import { Health } from "./HexUnit.styled";

import champions from "mocks/consts/champions";

function HexUnitDraggable({ unit, coordinates }) {
  const [, drag] = useDrag({
    item: { type: `hexUnit-${unit.playerId}`, id: unit.id },
    collect: monitor => ({
      // isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Hexagon
      styleProps={`position: absolute; z-index: 4;
      transition: 300ms;
      transform: translate(${X_DIFF * coordinates[0]}px, ${Y_DIFF * coordinates[1]}px);`}
      backgroundColor={champions[unit.championId].backgroundColor}
      ref={drag}
    >
      <Health>{unit.health}</Health>
    </Hexagon>
  );
}

export default HexUnitDraggable;
