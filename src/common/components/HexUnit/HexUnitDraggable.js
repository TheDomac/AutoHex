import React from "react";
import { useDrag } from "react-dnd";

import calculateTargetAngle from "common/utils/calculateTargetAngle";

import Hexagon from "common/components/Hexagon/Hexagon";
import { Health, Arrow } from "./HexUnit.styled";

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
      transform: translate(${88 * coordinates[0]}px, ${76.75 * coordinates[1]}px);`}
      backgroundColor="blue"
      ref={drag}
    >
      <Health>{unit.health}</Health>
      <Arrow rotateValue={calculateTargetAngle("121", "114")}>↑</Arrow>
    </Hexagon>
  );
}

export default HexUnitDraggable;
