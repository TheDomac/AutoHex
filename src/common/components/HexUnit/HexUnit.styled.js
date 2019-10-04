import styled, { keyframes } from "styled-components";

export const Health = styled.span`
  position: absolute;
  z-index: 4;
  color: green;
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
  color: green;
  font-size: 55px;
  animation: ${move} ${props => props.attackSpeed}s linear infinite;
`;
