import React from "react";
import { useDrop } from "react-dnd";

import Hexagon from "common/components/Hexagon";
import DragDiv from "mocks/components/DragDiv/DragDiv";

function HexSlot(props) {
  const [{ isOver, canDrop, unit }, drop] = useDrop({
    accept: "typeExample",
    canDrop: () => Number(props.slot.id) > 100,
    drop: () => props.moveUnit(props.slot.id, unit.id),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      unit: monitor.getItem(),
    }),
  });
  return (
    <Hexagon
      ref={drop}
      backgroundColor={isOver && canDrop ? "yellow" : "white"}
      borderColor={canDrop ? "green" : "#111"}
    >
      {props.unit && <DragDiv unit={props.unit} />}
    </Hexagon>
  );
}

export default HexSlot;
