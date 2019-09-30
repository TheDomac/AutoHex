import unitsOnBoard from "mocks/consts/unitsOnBoard";
import { players, myId } from "mocks/consts/players";
import actionTypes from "common/consts/actionTypes";

import { getUnitsWithActions } from "src/redux/selectors/game";

const MOVE_UNIT = "game/MOVE_UNIT";
const TOGGLE_IS_GAME_PLAYING = "game/TOGGLE_IS_GAME_PLAYING";
const MOVE_UNITS = "game/MOVE_UNITS";

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
    case MOVE_UNITS: {
      console.log(action);
      return {
        ...state,
        unitsOnBoard: state.unitsOnBoard.map((unit, i) => ({
          ...unit,
          slotId:
            payload.unitsWithActions[i].action.type === actionTypes.MOVE
              ? payload.unitsWithActions[i].action.target
              : unit.slotId,
        })),
      };
    }
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

export const moveUnits = () => (dispatch, getState) => {
  const state = getState();
  const unitsWithActions = getUnitsWithActions(state);

  dispatch({ type: MOVE_UNITS, payload: { unitsWithActions } });
};
