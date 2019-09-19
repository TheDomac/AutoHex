import { last } from "lodash";

import fields from "../consts/fields";

const getPathsBetweenTwoPoints = (startFieldId, endFieldId) => {
  if (fields[startFieldId].neighborFieldsIds.includes(endFieldId)) {
    return [];
  }

  let foundPaths = [];
  let accumulatedPaths = fields[startFieldId].neighborFieldsIds.map(id => [id]);

  while (foundPaths.length === 0) {
    const newAccumulatedPaths = accumulatedPaths.reduce((prev, path) => {
      const lastId = last(path);
      if (fields[lastId].neighborFieldsIds.includes(endFieldId)) {
        foundPaths.push(path);
      }

      const newPathsFromThisPath = fields[lastId].neighborFieldsIds
        .map(id => [...path, id])
        .filter(p => !p.includes(startFieldId) && !p.includes(endFieldId));

      return [...prev, ...newPathsFromThisPath];
    }, []);
    accumulatedPaths = newAccumulatedPaths;
  }

  return foundPaths;
};

export default getPathsBetweenTwoPoints;
