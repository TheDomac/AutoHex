import unitsOnBoard from "mocks/consts/unitsOnBoard";

const MOVE_UNIT = "test/MOVE_UNIT";

export const initialState = {
  unitsOnBoard,
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
