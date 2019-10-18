import { createSelector } from "reselect";

export const getGame = state => state.game;

export const getPlayers = createSelector(
  getGame,
  game => game.players,
);

export const getIsGamePlaying = createSelector(
  getGame,
  game => game.isGamePlaying,
);

export const getFights = createSelector(
  getGame,
  game => game.fights,
);

export const getSetSelectedPlayerId = createSelector(
  getGame,
  game => game.selectedPlayerId,
);
