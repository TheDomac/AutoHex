import { createSelector } from "reselect";
export const getGame = state => state.game;

export const getUnitsOnBoard = createSelector(
  getGame,
  game => game.unitsOnBoard,
);
