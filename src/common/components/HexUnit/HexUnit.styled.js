import styled, { keyframes } from "styled-components";

export const Health = styled.div`
  color: green;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const move = keyframes`
from {
  transform: translate(-50%, -50%);
  opacity: 0;
}

to {
  transform: translate(50%, -50%);
  opacity: 1;
}
`;

export const ArrowWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: rotate(90deg);
`;

export const ArrowWrapper2 = styled.div`
  animation: ${move} ${props => props.attackSpeed}s linear infinite;
`;

export const Arrow = styled.span`
  color: green;
  font-size: 55px;
`;
