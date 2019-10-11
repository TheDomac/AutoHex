import { createSelector } from "reselect";

export const getGame = state => state.game;

export const getPlayers = createSelector(
  getGame,
  game => game.players,
);
