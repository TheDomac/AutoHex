import styled from "styled-components";

export const Health = styled.span`
  position: absolute;
  z-index: 4;
  color: red;
`;

export const Arrow = styled.span`
  position: absolute;
  z-index: 4;
  color: red;
  font-size: 125px;
  transform: rotate(${props => props.rotateValue}deg);
`;
