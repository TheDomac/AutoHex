import React from 'react';
import { last } from "lodash"
import './App.css';

import fields from "./common/consts/fields"

function steps(startFieldId, endFieldId) {
  if (fields[startFieldId].neighborFieldsIds.includes(endFieldId)) { return [] }

  let foundPaths = []
  let accumulatedPaths = fields[startFieldId].neighborFieldsIds.map(id => [id])

  const newAccumulatedPaths = accumulatedPaths.reduce((prev, path) => {
    const lastId = last(path)
    if(fields[lastId].neighborFieldsIds.includes(endFieldId)) { foundPaths.push(path); }

    const newPathsFromThisPath = fields[lastId].neighborFieldsIds
      .map(id => [...path, id])
      .filter(path => !path.includes(startFieldId) && !path.includes(endFieldId))

    return [...prev, ...newPathsFromThisPath]
  }, [])


  return {foundPaths, newAccumulatedPaths};
}




// [[2], [8], [9]]
// [ [2, 3], [2, 10], [8, 15], [9, 10], [9, 15], [9, 16] ]
// [[2, 3, 4], [2, 3, 11], [2, 10, 11], [2, 10, 17], ...]

function App() {
  console.log(steps(1, 10))
  return (
    <div />
  );
}

export default App;
