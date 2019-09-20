import { last } from "lodash";

import fields from "../consts/fields";

const getPathsBetweenTwoPoints = (startFieldId, endFieldId) => {
  if (fields[startFieldId].neighborFieldsIds.includes(endFieldId)) {
    return [];
  }

  let foundPaths = [];

  let accumulatedPaths = fields[startFieldId].neighborFieldsIds.map(id => [id]);

  let idsCheckedSoFar = [startFieldId];

  while (foundPaths.length === 0) {
    const reduced = accumulatedPaths.reduce((prev, path) => {
      const lastId = last(path);
      if (fields[lastId].neighborFieldsIds.includes(endFieldId)) {
        foundPaths.push(path);
      }

      idsCheckedSoFar.push(lastId);

      const newPathsFromThisPath = fields[lastId].neighborFieldsIds.map(id => [...path, id]);

      return [...prev, ...newPathsFromThisPath];
    }, []);

    const filtered = reduced.filter(path => !idsCheckedSoFar.includes(last(path)));

    accumulatedPaths = filtered;
  }

  return foundPaths;
};

export default getPathsBetweenTwoPoints;
