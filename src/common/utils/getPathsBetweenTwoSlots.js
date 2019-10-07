import { last } from "lodash";

import pureSlots from "common/consts/pureSlots";

const reduceSlotIds = (accumulatedPaths, endSlotId) => {
  const connectedTwoPoints = accumulatedPaths.paths.filter(path =>
    pureSlots[last(path)].adjacentSlotsIds.includes(endSlotId),
  );

  if (connectedTwoPoints.length > 0) {
    return connectedTwoPoints;
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
    const filtered = reduced.paths.filter(path => !reduced.idsCheckedSoFar.includes(last(path)));

    return reduceSlotIds(
      {
        paths: filtered,
        idsCheckedSoFar: reduced.idsCheckedSoFar,
      },
      endSlotId,
    );
  }
};

const getPathsBetweenTwoSlots = (startSlotId, endSlotId) => {
  if (pureSlots[startSlotId].adjacentSlotsIds.includes(endSlotId)) {
    return [[]];
  }

  const accumulatedPaths = pureSlots[startSlotId].adjacentSlotsIds.map(id => [id]);

  return reduceSlotIds({ paths: accumulatedPaths, idsCheckedSoFar: [startSlotId] }, endSlotId);
};

export default getPathsBetweenTwoSlots;
