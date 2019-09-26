import slots from "common/consts/slots";

const getPathsToClosestEnemyUnits = (unit, unitsOnBoard) => {
  return unitsOnBoard.filter(
    u => u.playerId !== unit.playerId && slots[u.slotId].adjacentSlotsIds.includes(unit.slotId),
  );
};

export default getPathsToClosestEnemyUnits;
