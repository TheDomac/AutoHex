import styled, { keyframes } from "styled-components";

export const Health = styled.span`
  position: absolute;
  z-index: 4;
  color: red;
`;

export const ArrowWrapper = styled.span`
  position: absolute;
  z-index: 4;
  transform: rotate(${props => props.rotateValue}deg);
`;

const move = keyframes`
from {
  transform: translate(0, 0);
  opacity: 0;
}

to {
  transform: translate(0, -20px);
  opacity: 1;
}
`;

export const Arrow = styled.span`
  position: absolute;
  z-index: 4;
  color: red;
  font-size: 125px;
  animation: ${move} ${props => props.attackSpeed}s linear infinite;
`;
