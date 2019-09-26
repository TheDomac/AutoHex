import { last } from "lodash";

import slots from "common/consts/slots";

const getPathsBetweenTwoSlots = (startSlotId, endSlotId) => {
  if (slots[startSlotId].adjacentSlotsIds.includes(endSlotId)) {
    return [];
  }

  let foundPaths = [];

  let accumulatedPaths = slots[startSlotId].adjacentSlotsIds.map(id => [id]);

  let idsCheckedSoFar = [startSlotId];

  while (foundPaths.length === 0) {
    const reduced = accumulatedPaths.reduce((prev, path) => {
      const lastId = last(path);
      if (slots[lastId].adjacentSlotsIds.includes(endSlotId)) {
        foundPaths.push(path);
      }

      idsCheckedSoFar.push(lastId);

      const newPathsFromThisPath = slots[lastId].adjacentSlotsIds.map(id => [...path, id]);

      return [...prev, ...newPathsFromThisPath];
    }, []);

    const filtered = reduced.filter(path => !idsCheckedSoFar.includes(last(path)));

    accumulatedPaths = filtered;
  }

  return foundPaths;
};

export default getPathsBetweenTwoSlots;
