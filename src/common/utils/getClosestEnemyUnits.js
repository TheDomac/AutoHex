import { last } from "lodash";

import pureSlots from "common/consts/pureSlots";

const reduceSlotIds = (accumulatedPaths, enemyUnitsOnBoard, unavailableSlots) => {
  const connectedEnemyUnits = enemyUnitsOnBoard.reduce((prev, enemyUnit) => {
    const foundPaths = accumulatedPaths.paths.filter(path =>
      pureSlots[enemyUnit.slotId].adjacentSlotsIds.includes(last(path)),
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
        const newPathsFromThisPath = pureSlots[lastId].adjacentSlotsIds.map(id => [...path, id]);

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

    const filtered = reduced.paths.filter(
      path =>
        !reduced.idsCheckedSoFar.includes(last(path)) && !unavailableSlots.includes(last(path)),
    );

    return reduceSlotIds(
      {
        paths: filtered,
        idsCheckedSoFar: reduced.idsCheckedSoFar,
      },
      enemyUnitsOnBoard,
      unavailableSlots,
    );
  }
};

const getClosestEnemyUnits = (unit, unitsOnBoard, unavailableSlots) => {
  const accumulatedPaths = pureSlots[unit.slotId].adjacentSlotsIds
    .filter(id => !unavailableSlots.includes(id))
    .map(id => [id]);

  const enemyUnitsOnBoard = unitsOnBoard.filter(u => u.playerId !== unit.playerId);
  return reduceSlotIds(
    { paths: accumulatedPaths, idsCheckedSoFar: [unit.slotId] },
    enemyUnitsOnBoard,
    unavailableSlots,
  );
};

export default getClosestEnemyUnits;
