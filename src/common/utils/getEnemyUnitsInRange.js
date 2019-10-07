import getPathsBetweenTwoSlots from "./getPathsBetweenTwoSlots";

const getEnemyUnitsInRange = (unit, unitsOnBoard) =>
  unitsOnBoard
    .filter(u => u.playerId !== unit.playerId)
    .filter(u => getPathsBetweenTwoSlots(unit.slotId, u.slotId)[0].length + 1 <= unit.range);

export default getEnemyUnitsInRange;
