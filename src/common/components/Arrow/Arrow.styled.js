import styled, { keyframes } from "styled-components";

const move = keyframes`
from {
  transform: translate(0, 0);
  opacity: 0;
}

to {
  transform: translate(100px, 0);
  opacity: 1;
}
`;

export const CenterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(${props => props.rotateValue}deg);
`;

export const AnimationWrapper = styled.div`
  animation: ${move} ${props => props.attackSpeed}s linear infinite;
`;

export const Content = styled.span`
  color: green;
  font-size: 55px;
`;
