import React from "react";
import { useDrop } from "react-dnd";

import { HexMain, HexTop, HexBottom } from "./HexSlot.styled";
import DragDiv from "mocks/components/DragDiv/DragDiv";

function HexSlot(props) {
  const [{ isOver }, drop] = useDrop({
    accept: "dragDiv",
    drop: () => props.handleSlotChange(props.slot),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <HexMain ref={drop} first={props.first}>
      {props.unit && <DragDiv />}
      <HexTop />
      {isOver && "isOver"}
      <HexBottom />
    </HexMain>
  );
}

export default HexSlot;
