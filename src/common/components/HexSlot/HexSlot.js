import React from "react";
import { useDrop } from "react-dnd";

import Hexagon from "common/components/Hexagon/Hexagon";
import HexUnit from "common/components/HexUnit/HexUnit";

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

  return props.unit ? (
    <HexUnit unit={props.unit} />
  ) : (
    <Hexagon
      ref={drop}
      backgroundColor={isOver && canDrop && "yellow"}
      borderColor={canDrop ? "green" : "#111"}
    >
      {props.slot.id}
    </Hexagon>
  );
}

export default HexSlot;
