import React from "react";
import { useDrop } from "react-dnd";

import Hexagon from "common/components/Hexagon/Hexagon";
import HexUnitActive from "common/components/HexUnit/HexUnitActive";
import HexUnitDraggable from "common/components/HexUnit/HexUnitDraggable";

function HexSlot(props) {
  const [{ isOver, canDrop, unit }, drop] = useDrop({
    accept: `hexUnit-${props.myId}`,
    canDrop: () => Number(props.slot.id) > 100,
    drop: () => props.moveUnit(props.slot.id, unit.id),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      unit: monitor.getItem(),
    }),
  });

  if (props.unit && props.isGamePlaying) {
    return <HexUnitActive unit={props.unit} action={props.actions[props.unit.id]} />;
  }

  if (props.unit && !props.isGamePlaying && props.myId === props.unit.playerId) {
    return <HexUnitDraggable unit={props.unit} />;
  }

  if (props.unit && !props.isGamePlaying && props.myId !== props.unit.playerId) {
    return <Hexagon backgroundColor="blue" />;
  }

  return (
    <Hexagon
      ref={drop}
      backgroundColor={isOver && canDrop && "yellow"}
      borderColor={canDrop ? "green" : "#111"}
    />
  );
}

export default HexSlot;
