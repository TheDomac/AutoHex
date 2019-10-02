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
    return (
      <HexUnitActive
        attackUnit={props.attackUnit}
        unitWithAction={props.unitsWithActions.find(
          unitWithAction => unitWithAction.id === props.unit.id,
        )}
      >
        {props.unit.health}
      </HexUnitActive>
    );
  }

  if (props.unit && !props.isGamePlaying && props.myId === props.unit.playerId) {
    return <HexUnitDraggable unit={props.unit}>{props.unit.health}</HexUnitDraggable>;
  }

  if (props.unit && !props.isGamePlaying && props.myId !== props.unit.playerId) {
    return <Hexagon backgroundColor="blue">{props.unit.health}</Hexagon>;
  }

  return (
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
