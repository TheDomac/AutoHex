import pureSlots from "common/consts/pureSlots";

const getAdjacentEnemyUnits = (unit, unitsOnBoard) => {
  return unitsOnBoard.filter(
    u => u.playerId !== unit.playerId && pureSlots[u.slotId].adjacentSlotsIds.includes(unit.slotId),
  );
};

export default getAdjacentEnemyUnits;
