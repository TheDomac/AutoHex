import { players, myId } from "mocks/consts/players";

// import generateFights from "common/utils/generateFights";

const MOVE_UNIT = "game/MOVE_UNIT";
const RESUME_GAME = "game/RESUME_GAME";
const FINISH_FIGHT = "game/FINISH_FIGHT";

export const initialState = {
  players,
  fights: [],
  // fightSetupIndex: 0,
  isGamePlaying: false,
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
    case RESUME_GAME:
      return {
        ...state,
        isGamePlaying: true,
        // fights: generateFights(state.players, state.fightSetupIndex)
        fights: [{ id: 1, players: state.players }],
      };
    case FINISH_FIGHT: {
      const newFights = state.fights.map(fight =>
        fight.id === payload.fightId
          ? {
              ...fight,
              isFinished: true,
            }
          : fight,
      );

      const isGamePlaying = newFights.every(fight => fight.isFinished);

      const newPlayers = state.players.map(player =>
        player.id === payload.fightLoserId
          ? {
              ...player,
              health: player.health - payload.damage,
            }
          : player,
      );

      return {
        ...state,
        isGamePlaying,
        fights: newFights,
        players: newPlayers,
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

export const finishFight = (fightId, fightLoserId, damage) => ({
  type: FINISH_FIGHT,
  payload: { fightId, fightLoserId, damage },
});

export const resumeGame = () => ({
  type: RESUME_GAME,
});
