import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

const DragDiv = styled.div`
  width: 50px;
  height: 50px;
  background: blue;
  color: white;
  font-size: 25;
  position: absolute;
  z-index: 3;
`;

function DragDivComponent(props) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "typeExample" },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return <DragDiv ref={drag}>{isDragging ? "yes" : "no"}</DragDiv>;
}

export default DragDivComponent;
