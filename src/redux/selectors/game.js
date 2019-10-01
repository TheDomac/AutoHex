import { createSelector } from "reselect";

import actionTypes from "common/consts/actionTypes";
import slots from "common/consts/slots";

import getAdjacentEnemyUnits from "common/utils/getAdjacentEnemyUnits";
import getClosestEnemyUnits from "common/utils/getClosestEnemyUnits";
import isRoundOver from "common/utils/isRoundOver";

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

      const prevEnemyUnitsWithTargetAdjacentSlotId = prev.filter(
        prevUnit =>
          prevUnit.playerId !== unit.playerId &&
          prevUnit.action.type === actionTypes.MOVE &&
          slots[unit.slotId].adjacentSlotsIds.includes(prevUnit.action.target),
      );

      if (prevEnemyUnitsWithTargetAdjacentSlotId.length > 0 || isRoundOver(unitsOnBoard)) {
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

      const takenSlots = prev.map(prevUnit =>
        prevUnit.action.type === actionTypes.MOVE ? prevUnit.action.target : prevUnit.slotId,
      );

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
