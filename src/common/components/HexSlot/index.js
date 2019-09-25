import React from "react";
import { useDrop } from "react-dnd";

import Hexagon from "common/components/Hexagon";
import DragDiv from "mocks/components/DragDiv/DragDiv";

function HexSlot(props) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "typeExample",
    canDrop: () => Number(props.slot.id) > 100,
    drop: () => props.handleSlotChange(props.slot),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Hexagon
      ref={drop}
      backgroundColor={isOver && canDrop ? "yellow" : "white"}
      borderColor={canDrop ? "green" : "#111"}
    >
      {props.unit && <DragDiv />}
    </Hexagon>
  );
}

export default HexSlot;
