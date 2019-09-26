import React from "react";
import { useDrag } from "react-dnd";

import Hexagon from "common/components/Hexagon/Hexagon";

function HexUnitComponent(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "typeExample", id: props.unit.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Hexagon backgroundColor="blue" ref={drag}>
      {isDragging ? "yes" : "no"}
    </Hexagon>
  );
}

export default HexUnitComponent;
