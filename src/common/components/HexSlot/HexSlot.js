import React from "react";
import { useDrop } from "react-dnd";

import Hexagon from "common/components/Hexagon/Hexagon";

function HexSlot({ slot, myId, moveUnit }) {
  const [{ isOver, canDrop, unit }, drop] = useDrop({
    accept: `hexUnit-${myId}`,
    canDrop: () => Number(slot.id) > 100,
    drop: () => moveUnit && moveUnit(slot.id, unit.id),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      unit: monitor.getItem(),
    }),
  });

  return (
    <Hexagon
      ref={drop}
      backgroundColor={isOver && canDrop && "yellow"}
      borderColor={canDrop ? "green" : "#111"}
      styleProps={`position: absolute; left: ${88 * slot.coordinates[0]}px; top:${76.75 *
        slot.coordinates[1]}px`}
    >
      {slot.id}
    </Hexagon>
  );
}

export default HexSlot;
