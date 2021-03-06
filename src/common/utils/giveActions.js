import actionTypes from "common/consts/actionTypes";
import slots from "common/consts/slots";

import getClosestEnemyUnits from "common/utils/getClosestEnemyUnits";
import isRoundOver from "common/utils/isRoundOver";
import getEnemyUnitsInRange from "common/utils/getEnemyUnitsInRange";

const giveActions = unitsOnBoard => {
  if (isRoundOver(unitsOnBoard)) {
    return unitsOnBoard.map(u => ({ ...u, action: { type: actionTypes.STAY } }));
  }

  const clearedUnits = unitsOnBoard.map(unit => ({
    ...unit,
    action: undefined,
  }));

  return clearedUnits.reduce((prev, unit) => {
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
        slots[unit.slotId].adjacentSlotsIds.includes(prevUnit.action.target),
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
};

export default giveActions;
