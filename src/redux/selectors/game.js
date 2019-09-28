import { createSelector } from "reselect";
import { keys } from "lodash";

import actionTypes from "common/consts/actionTypes";
import getAdjacentEnemyUnits from "common/utils/getAdjacentEnemyUnits";
import getClosestEnemyUnits from "common/utils/getClosestEnemyUnits";

export const getGame = state => state.game;

export const getUnitsOnBoard = createSelector(
  getGame,
  game => game.unitsOnBoard,
);

export const getMyId = createSelector(
  getGame,
  game => game.myId,
);

export const getActions = createSelector(
  getUnitsOnBoard,
  unitsOnBoard =>
    unitsOnBoard.reduce((prev, unit) => {
      const adjacentEnemyUnits = getAdjacentEnemyUnits(unit, unitsOnBoard);
      if (adjacentEnemyUnits.length > 0) {
        return {
          ...prev,
          [unit.id]: {
            type: actionTypes.ATTACK,
            target: adjacentEnemyUnits[0],
          },
        };
      }

      const closestEnemyUnits = getClosestEnemyUnits(unit, unitsOnBoard);
      const ids = keys(prev);
      const takenSlots = ids.map(id => prev[id].target);

      const availablePaths = closestEnemyUnits[0].paths.filter(
        path => !takenSlots.includes(path[0]),
      );

      // console.log("unit", unit);
      // console.log("pathsToClosestEnemyUnits", closestEnemyUnits);
      // console.log("ids", ids);
      console.log("availablePaths", availablePaths);
      console.log("--------------------------------");

      return {
        ...prev,
        [unit.id]: {
          type: actionTypes.MOVE,
          target: availablePaths.length > 0 ? availablePaths[0][0] : null,
        },
      };
    }, {}),
);
