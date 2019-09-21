import { last } from "lodash";

import slots from "../consts/slots";

const getPathsBetweenTwoSlots = (startSlotId, endSlotId) => {
  if (slots[startSlotId].neighborSlotsIds.includes(endSlotId)) {
    return [];
  }

  let foundPaths = [];

  let accumulatedPaths = slots[startSlotId].neighborSlotsIds.map(id => [id]);

  let idsCheckedSoFar = [startSlotId];

  while (foundPaths.length === 0) {
    const reduced = accumulatedPaths.reduce((prev, path) => {
      const lastId = last(path);
      if (slots[lastId].neighborSlotsIds.includes(endSlotId)) {
        foundPaths.push(path);
      }

      idsCheckedSoFar.push(lastId);

      const newPathsFromThisPath = slots[lastId].neighborSlotsIds.map(id => [...path, id]);

      return [...prev, ...newPathsFromThisPath];
    }, []);

    const filtered = reduced.filter(path => !idsCheckedSoFar.includes(last(path)));

    accumulatedPaths = filtered;
  }

  return foundPaths;
};

export default getPathsBetweenTwoSlots;
