import React, { Component } from "react";
import HexSlot from "common/components/hexSlot";
import { HexFieldWrapper, HexRow } from "common/components/hexSlot.styled";

import getPathsBetweenTwoSlots from "common/utils/getPathsBetweenTwoSlots";

import field from "common/consts/field";

class App extends Component {
  render() {
    // console.log(field, keys(field));
    return (
      <HexFieldWrapper>
        {field.map((row, i) => {
          return (
            <HexRow key={i} topGapMultiplier={i} first={i % 2 !== 0}>
              {row.map(slot => (
                <HexSlot slot={slot} key={slot.id} />
              ))}
            </HexRow>
          );
        })}
      </HexFieldWrapper>
    );
  }
}

/*  */
export default App;
