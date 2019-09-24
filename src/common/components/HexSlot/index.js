import React from "react";
import { useDrop } from "react-dnd";

import { HexMain, HexTop, HexBottom } from "./HexSlot.styled";
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
    <HexMain
      ref={drop}
      first={props.first}
      backgroundColor={isOver && canDrop ? "yellow" : "white"}
      borderColor={canDrop ? "green" : "#111"}
    >
      {props.unit && <DragDiv />}
      <HexTop borderColor={canDrop ? "green" : "#111"} />
      <HexBottom borderColor={canDrop ? "green" : "#111"} />
    </HexMain>
  );
}

export default HexSlot;
