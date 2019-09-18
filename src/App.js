import React from 'react';
import { reduce } from "lodash"
import logo from './logo.svg';
import './App.css';

import fields from "./common/consts/fields"

function steps(startFieldId, endFieldId) {

  let count = 1
  let paths = []
  let idsToCheck = fields[startFieldId].neighborFieldsIds
  while (paths.length === 0) {

    for(var i = 0; i < count; i ++ ) {
      if (idsToCheck.includes(endFieldId)) {
        console.log("found", paths)
        paths = ["weeeee"]
      } else {
        count ++;
        idsToCheck = idsToCheck.reduce((prev, idToCheck) => {
          console.log("prev", prev)
          const idsWithoutPreviouslyChecked = fields[idToCheck].neighborFieldsIds.filter(id => !prev.includes(id))
          return idsWithoutPreviouslyChecked
        }, [])
        console.log("-----------------")
      }
    }
  }
}


function App() {
  console.log(steps(1, 21))
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
