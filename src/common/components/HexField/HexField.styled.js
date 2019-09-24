import styled from "styled-components";

export const HexFieldWrapper = styled.div`
  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;
export const HexRow = styled.div`
  ${props => props.first && "margin-left: 44px;"}
  ${props =>
    props.topGapMultiplier && `top: ${props.topGapMultiplier * -22}px`}
    position: relative;
  &:after {
    content: "";
    clear: both;
    display: block;
  }
`;
