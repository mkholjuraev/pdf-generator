import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import '@patternfly/react-core/dist/styles/base.css';

import Pdf from './pdf';

function App({reportName='Default Example Report', apiData}) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"
          render={ () =>
            <Example
              reportName={reportName}
              apiData={apiData}
            />}
        />
        <Route exact path="/example"
          render={ () =>
            <Example
              reportName={reportName}
              apiData={apiData}
            />}
        />
        <Route exact path="/report"
          render={ () =>
            <Report
              reportName={reportName}
              apiData={apiData}
            />}
          />
      </Switch>
    </div>
  );
}

function Example({reportName, apiData = { name: '', description: ''}}) {
  return (
    <div className="Example">
      <h1><b> {reportName} </b></h1>
      <h2> {apiData.name || 'Example'} </h2>
      <h2> {apiData.description || 'Example Description'} </h2>
    </div>
  );
}

function Report({reportName, apiData}) {
  return (
    <div className="Report">
      <h1><b> {reportName} </b></h1>
      <Pdf apiData={apiData}/>
    </div>
  );
}

export default App;
