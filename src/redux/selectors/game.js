import { createSelector } from "reselect";

import actionTypes from "common/consts/actionTypes";
import pureSlots from "common/consts/pureSlots";

import getClosestEnemyUnits from "common/utils/getClosestEnemyUnits";
import isRoundOver from "common/utils/isRoundOver";
import getEnemyUnitsInRange from "../../common/utils/getEnemyUnitsInRange";

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
  unitsOnBoard => {
    if (isRoundOver(unitsOnBoard)) {
      return unitsOnBoard.map(u => ({ ...u, action: { type: actionTypes.STAY } }));
    }

    return unitsOnBoard.reduce((prev, unit) => {
      const enemyUnitsInRange = getEnemyUnitsInRange(unit, unitsOnBoard);
      if (enemyUnitsInRange.length > 0) {
        return [
          ...prev,
          {
            ...unit,
            action: {
              type: actionTypes.ATTACK,
              target: enemyUnitsInRange[0],
            },
          },
        ];
      }

      const takenSlots = [
        ...prev.map(prevUnit =>
          prevUnit.action.type === actionTypes.MOVE ? prevUnit.action.target : prevUnit.slotId,
        ),
        ...unitsOnBoard.map(u => u.slotId),
      ];

      const closestEnemyUnits = getClosestEnemyUnits(unit, unitsOnBoard, takenSlots);
      const prevEnemyUnitsWithTargetAdjacentSlotId = prev.filter(
        prevUnit =>
          prevUnit.playerId !== unit.playerId &&
          prevUnit.action.type === actionTypes.MOVE &&
          pureSlots[unit.slotId].adjacentSlotsIds.includes(prevUnit.action.target),
      );
      // if blocked by taken slots or enemy coming
      if (closestEnemyUnits.length === 0 || prevEnemyUnitsWithTargetAdjacentSlotId.length > 0) {
        return [
          ...prev,
          {
            ...unit,
            action: {
              type: actionTypes.STAY,
            },
          },
        ];
      }

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
    }, []);
  },
);
