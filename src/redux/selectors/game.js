import { createSelector } from "reselect";
import { keys } from "lodash";

import actionTypes from "common/consts/actionTypes";
import slots from "common/consts/slots";

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

export const getUnitsWithActions = createSelector(
  getUnitsOnBoard,
  unitsOnBoard =>
    unitsOnBoard.reduce((prev, unit) => {
      const adjacentEnemyUnits = getAdjacentEnemyUnits(unit, unitsOnBoard);
      if (adjacentEnemyUnits.length > 0) {
        return [
          ...prev,
          {
            ...unit,
            action: {
              type: actionTypes.ATTACK,
              target: adjacentEnemyUnits[0],
            },
          },
        ];
      }

      const enemyUnitsWithTargetAdjacentSlotId = prev.filter(
        prevUnit =>
          prevUnit.playerId !== unit.playerId &&
          prevUnit.action.type === actionTypes.MOVE &&
          slots[unit.id].adjacentSlotsIds.includes(prevUnit.action.target),
      );
      // todo next: enemyUnitsWithTargetAdjacentSlotId not working correctly - create stay action
      console.log(enemyUnitsWithTargetAdjacentSlotId);
      const takenSlots = prev
        .filter(prevUnit => prevUnit.action.type === actionTypes.MOVE)
        .map(prevUnit => prevUnit.action.target);

      const closestEnemyUnits = getClosestEnemyUnits(unit, unitsOnBoard, takenSlots);

      return [
        ...prev,
        {
          ...unit,
          action: {
            type: actionTypes.MOVE,
            target: closestEnemyUnits[0].paths[0][0],
          },
        },
      ];
    }, []),
);
