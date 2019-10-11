import { players, myId } from "mocks/consts/players";

const MOVE_UNIT = "game/MOVE_UNIT";

export const initialState = {
  players,
};

export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case MOVE_UNIT:
      return {
        ...state,
        players: state.players.map(player =>
          player.id === myId
            ? {
                ...player,
                unitsOnBoard: player.unitsOnBoard.map(unit =>
                  unit.id === payload.unitId
                    ? {
                        ...unit,
                        slotId: payload.slotId,
                      }
                    : unit,
                ),
              }
            : player,
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
