import styled from "styled-components";

export const HexMain = styled.div`
  display: inline-block;
  text-align: left;
  float: left;
  position: relative;
  background-position: 50%;
  border-left: 2px solid #111;
  border-right: 2px solid #111;
  box-sizing: border-box;

  width: 84px;
  height: 48.5px;
  margin: 24.25px 0;
  background-size: auto 87.7572px;
  border-left-width: 4px;
  border-right-width: 4px;

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
  border-top-width: 5.6569px;
  border-right-width: 5.6569px;
  width: 59.4px;
  height: 59.4px;
  left: 8.3px;
  border-top: 2.8284px solid #111;
  border-right: 2.8284px solid #111;

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
  border-bottom-width: 5.6569px;
  border-left-width: 5.6569px;
  width: 59.4px;
  height: 59.4px;
  left: 8.3px;
  border-bottom: 2.8284px solid #111;
  border-left: 2.8284px solid #111;

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
