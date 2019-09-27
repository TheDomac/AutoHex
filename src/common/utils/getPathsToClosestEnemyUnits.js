import { last } from "lodash";

import slots from "common/consts/slots";

const reduceSlotIds = (accumulatedPaths, enemyUnitsOnBoard) => {
  const connectedEnemyUnits = enemyUnitsOnBoard.reduce((prev, enemyUnit) => {
    const foundPaths = accumulatedPaths.paths.filter(path =>
      slots[enemyUnit.slotId].adjacentSlotsIds.includes(last(path)),
    );

    return foundPaths.length > 0
      ? [
          ...prev,
          {
            ...enemyUnit,
            paths: foundPaths,
          },
        ]
      : prev;
  }, []);

  if (connectedEnemyUnits.length > 0) {
    return connectedEnemyUnits;
  } else {
    const reduced = accumulatedPaths.paths.reduce(
      (prev, path) => {
        const lastId = last(path);
        const newPathsFromThisPath = slots[lastId].adjacentSlotsIds.map(id => [...path, id]);

        return {
          paths: [...prev.paths, ...newPathsFromThisPath],
          idsCheckedSoFar: [...prev.idsCheckedSoFar, lastId],
        };
      },
      {
        paths: [],
        idsCheckedSoFar: accumulatedPaths.idsCheckedSoFar,
      },
    );
    const filtered = reduced.paths.filter(path => !reduced.idsCheckedSoFar.includes(last(path)));

    return reduceSlotIds(
      {
        paths: filtered,
        idsCheckedSoFar: reduced.idsCheckedSoFar,
      },
      enemyUnitsOnBoard,
    );
  }
};

const getPathsToClosestEnemyUnits = (unit, unitsOnBoard) => {
  const accumulatedPaths = slots[unit.slotId].adjacentSlotsIds.map(id => [id]);
  const enemyUnitsOnBoard = unitsOnBoard.filter(u => u.playerId !== unit.playerId);
  return reduceSlotIds(
    { paths: accumulatedPaths, idsCheckedSoFar: [unit.slotId] },
    enemyUnitsOnBoard,
  );
};

export default getPathsToClosestEnemyUnits;
