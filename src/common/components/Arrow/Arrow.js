import React from "react";

import { CenterWrapper, AnimationWrapper, Content } from "./Arrow.styled";

const Arrow = ({ rotateValue, attackSpeed }) => (
  <CenterWrapper rotateValue={rotateValue}>
    <AnimationWrapper attackSpeed={attackSpeed}>
      <Content>></Content>
    </AnimationWrapper>
  </CenterWrapper>
);

export default Arrow;
