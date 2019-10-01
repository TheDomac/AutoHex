import styled from "styled-components";

export const HexMain = styled.div`
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : "")};
  display: inline-block;
  text-align: left;
  float: left;
  position: relative;
  background-position: 50%;
  border-left: 4px solid ${props => (props.borderColor ? props.borderColor : "")};
  border-right: 4px solid ${props => (props.borderColor ? props.borderColor : "")};
  margin: 24.25px 0;
  margin-right: 4px;
  box-sizing: border-box;

  width: 84px;
  height: 48.5px;
  background-size: auto 87.7572px;

  ${props => (props.styleProps ? props.styleProps : "")}

  &:after {
    position: absolute;
    content: "";
    z-index: 2;
    background: inherit;

    top: 2.3094px;
    left: 0;
    width: 76px;
    height: 43.8786px;
  }
`;

export const HexTop = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  transform: scaleY(0.5774) rotate(-45deg);
  background: inherit;
  box-sizing: border-box;

  top: -29.6985px;
  width: 59.4px;
  height: 59.4px;
  left: 8.3px;
  border-top: 4.6569px solid ${props => (props.borderColor ? props.borderColor : "")};
  border-right: 4.6569px solid ${props => (props.borderColor ? props.borderColor : "")};

  &:after {
    position: absolute;
    content: "";
    background: inherit;
    transform-origin: 0 0;
    background-position: top;

    width: 76px;
    height: 43.8786204584px;
    transform: rotate(45deg) scaleY(1.7321) translateY(-21.9393px);
  }
`;

export const HexBottom = styled.div`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  transform: scaleY(0.5774) rotate(-45deg);
  background: inherit;
  box-sizing: border-box;

  bottom: -29.6985px;
  width: 59.4px;
  height: 59.4px;
  left: 8.3px;
  border-bottom: 4.6569px solid ${props => (props.borderColor ? props.borderColor : "")};
  border-left: 4.6569px solid ${props => (props.borderColor ? props.borderColor : "")};

  &:after {
    position: absolute;
    content: "";
    background: inherit;
    transform-origin: 0 0;
    background-position: bottom;

    width: 76px;
    height: 43.8786204584px;
    transform: rotate(45deg) scaleY(1.7321) translateY(-21.9393px);
  }
`;

export const HexChildren = styled.div`
  position: absolute;
  color: white;
  z-index: 3;
`;
