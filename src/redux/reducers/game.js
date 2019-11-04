import { players, myId } from "mocks/consts/players";

import generateFights from "common/utils/generateFights";

const MOVE_UNIT = "game/MOVE_UNIT";
const RESUME_GAME = "game/RESUME_GAME";
const FINISH_FIGHT = "game/FINISH_FIGHT";
const SET_SELECTED_PLAYER = "game/SET_SELECTED_PLAYER";

export const initialState = {
  players,
  selectedPlayerId: myId,
  fights: [],
  fightSetupIndex: 1,
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
    case RESUME_GAME: {
      const activePlayers = state.players.filter(player => player.health > 0);
      return {
        ...state,
        isGamePlaying: true,
        fights: generateFights(activePlayers, state.fightSetupIndex),
        fightSetupIndex:
          state.fightSetupIndex + 1 === activePlayers.length
            ? state.fightSetupIndex + 2
            : state.fightSetupIndex + 1,
      };
    }
    case SET_SELECTED_PLAYER:
      return {
        ...state,
        selectedPlayerId: payload.selectedPlayerId,
      };
    case FINISH_FIGHT: {
      const fightIndex = state.fights.findIndex(f => f.id === payload.fightId);
      const fight = state.fights[fightIndex];
      const newFights = [
        ...state.fights.slice(0, fightIndex),
        { ...fight, isFinished: true },
        ...state.fights.slice(fightIndex + 1),
      ];

      const isFightLoserAndNotACopy = fight.players.some(
        player => player.id === payload.fightLoserId && !player.isCopy,
      );

      const newPlayers = state.players.map(player =>
        player.id === payload.fightLoserId && isFightLoserAndNotACopy
          ? {
              ...player,
              health: player.health - payload.damage,
            }
          : player,
      );

      const isGamePlaying = !newFights.every(f => f.isFinished);

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

export const setSelectedPlayer = selectedPlayerId => ({
  type: SET_SELECTED_PLAYER,
  payload: { selectedPlayerId },
});

export const resumeGame = () => ({
  type: RESUME_GAME,
});
