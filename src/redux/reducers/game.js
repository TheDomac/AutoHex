import { players, myId } from "mocks/consts/players";
import unitsOnBoard from "mocks/consts/unitsOnBoard";
import actionTypes from "common/consts/actionTypes";
import isRoundOver from "common/utils/isRoundOver";

const MOVE_UNIT = "game/MOVE_UNIT";

export const initialState = {
  unitsOnBoard,
  players,
  myId,
};

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case MOVE_UNIT:
      return {
        ...state,
        unitsOnBoard: state.unitsOnBoard.map(unit =>
          unit.id === payload.unitId
            ? {
                ...unit,
                slotId: payload.slotId,
              }
            : unit,
        ),
      };
    default:
      return state;
  }
}

export const moveUnit = (slotId, unitId) => ({
  type: MOVE_UNIT,
  payload: { slotId, unitId },
});
