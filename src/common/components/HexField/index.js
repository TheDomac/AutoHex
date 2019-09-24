import React, { Component } from "react";

import HexSlot from "common/components/HexSlot";
import { HexFieldWrapper, HexRow } from "./HexField.styled";
import field from "common/consts/field";

class HexField extends Component {
  state = {
    unitOnBoard: { id: 1, unitId: 1, slotId: "112" },
  };

  handleSlotChange = slot => {
    console.log("slot change", slot);
    this.setState({
      unitOnBoard: {
        ...this.state.unitOnBoard,
        slotId: slot.id,
      },
    });
  };

  render() {
    return (
      <HexFieldWrapper>
        {field.map((row, i) => {
          return (
            <HexRow key={i} topGapMultiplier={i} first={i % 2 !== 0}>
              {row.map(slot => (
                <HexSlot
                  slot={slot}
                  key={slot.id}
                  handleSlotChange={this.handleSlotChange}
                  unit={this.state.unitOnBoard.slotId === slot.id}
                ></HexSlot>
              ))}
            </HexRow>
          );
        })}
      </HexFieldWrapper>
    );
  }
}

export default HexField;
