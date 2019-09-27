import { intersection, last } from "lodash";

import slots from "common/consts/slots";

const getPathsToClosestEnemyUnits = (unit, unitsOnBoard) => {
  const enemyUnitsOnBoard = unitsOnBoard.filter(u => u.playerId !== unit.playerId);
  console.log("START", unit, enemyUnitsOnBoard);

  let accumulatedPaths = slots[unit.slotId].adjacentSlotsIds.map(id => [id]);
  let foundClosestEnemyUnits = [];

  let breaker = 0;

  let idsCheckedSoFar = [unit.slotId];
  while (foundClosestEnemyUnits.length === 0 && breaker < 10) {
    console.log(
      "while",
      breaker,
      foundClosestEnemyUnits.length,
      "accumulatedPaths",
      accumulatedPaths,
    );
    const reduced = accumulatedPaths.reduce((prev, path) => {
      const lastId = last(path);

      const enemyUnitsWithAdjacentSlotId = enemyUnitsOnBoard
        .filter(u => slots[u.slotId].adjacentSlotsIds.includes(lastId))
        .map(u => ({ ...u, foundPaths: path }));

      console.log("enemyUnitsWithAdjacentSlotId", enemyUnitsWithAdjacentSlotId);

      if (enemyUnitsWithAdjacentSlotId.length > 0) {
        console.log("TRUE");
        foundClosestEnemyUnits.push(enemyUnitsWithAdjacentSlotId);
      }

      idsCheckedSoFar.push(lastId);

      const newPathsFromThisPath = slots[lastId].adjacentSlotsIds.map(id => [...path, id]);

      return [...prev, ...newPathsFromThisPath];
    }, []);

    const filtered = reduced.filter(path => !idsCheckedSoFar.includes(last(path)));

    accumulatedPaths = filtered;
    breaker++;

    if (breaker === 5) {
      console.log("BREAKER -----------------");
    }
  }

  return foundClosestEnemyUnits;
};

export default getPathsToClosestEnemyUnits;
