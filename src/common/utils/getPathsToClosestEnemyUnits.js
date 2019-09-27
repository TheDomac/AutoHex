import { intersection, last } from "lodash";

import slots from "common/consts/slots";

const getPathsToClosestEnemyUnits = (unit, unitsOnBoard) => {
  const enemyUnitsOnBoard = unitsOnBoard.filter(u => u.playerId !== unit.playerId);
  console.log("START", unit, enemyUnitsOnBoard);

  let accumulatedPaths = slots[unit.slotId].adjacentSlotsIds.map(id => [id]);
  console.log("accumulatedPaths", accumulatedPaths);
  let foundPaths = [];

  let breaker = 0;

  let idsCheckedSoFar = [unit.slotId];
  while (foundPaths.length === 0 || breaker === 1) {
    const reduced = accumulatedPaths.reduce((prev, path) => {
      const lastId = last(path);

      const enemyUnitsWithAdjacentSlotid = enemyUnitsOnBoard.filter(u => {
        console.log(slots[lastId].adjacentSlotsIds);
        console.log(slots[u.slotId].adjacentSlotsIds);
        console.log(intersection(slots[lastId].adjacentSlotsIds, slots[u.slotId].adjacentSlotsIds));
        console.log(
          intersection(slots[lastId].adjacentSlotsIds, slots[u.slotId].adjacentSlotsIds).length > 0,
        );
        return (
          intersection(slots[lastId].adjacentSlotsIds, slots[u.slotId].adjacentSlotsIds).length > 0
        );
      });

      if (enemyUnitsWithAdjacentSlotid.length > 0) {
        foundPaths.push(path);
      }

      idsCheckedSoFar.push(lastId);

      const newPathsFromThisPath = slots[lastId].adjacentSlotsIds.map(id => [...path, id]);

      return [...prev, ...newPathsFromThisPath];
    }, []);

    const filtered = reduced.filter(path => !idsCheckedSoFar.includes(last(path)));

    accumulatedPaths = filtered;
    breaker++;
  }

  return foundPaths;
};

export default getPathsToClosestEnemyUnits;
