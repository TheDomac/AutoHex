import unitsOnBoard from "mocks/consts/unitsOnBoard";
import { players, myId } from "mocks/consts/players";

const MOVE_UNIT = "game/MOVE_UNIT";
const TOGGLE_IS_GAME_PLAYING = "test/TOGGLE_IS_GAME_PLAYING";

export const initialState = {
  unitsOnBoard,
  players,
  myId,
  isGamePlaying: false,
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
    case TOGGLE_IS_GAME_PLAYING:
      return {
        ...state,
        isGamePlaying: !state.isGamePlaying,
      };
    default:
      return state;
  }
}

export const moveUnit = (slotId, unitId) => ({
  type: MOVE_UNIT,
  payload: { slotId, unitId },
});

export const toggleIsGamePlaying = () => ({
  type: TOGGLE_IS_GAME_PLAYING,
});
