import React from "react";
import { useDrop } from "react-dnd";

import { X_DIFF, Y_DIFF } from "common/consts/hexSlotPositionDiffs";
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
      styleProps={`position: absolute; left: ${X_DIFF * slot.coordinates[0]}px; top:${Y_DIFF *
        slot.coordinates[1]}px`}
    >
      {slot.id}
    </Hexagon>
  );
}

export default HexSlot;
