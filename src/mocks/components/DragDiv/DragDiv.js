import React from "react";
import styled from "styled-components";
import { useDrag } from "react-dnd";

const DragDiv = styled.div`
  width: 50px;
  height: 50px;
  background: blue;
`;

function DragDivComponent() {
  const [props, drag] = useDrag({
    item: { type: "dragDiv" },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  console.log(props);
  return (
    <div
      style={{
        opacity: props.isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
      ref={drag}
    >
      <DragDiv>{props.isDragging && "M"}</DragDiv>
    </div>
  );
}

export default DragDivComponent;
