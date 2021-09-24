import React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import Report from './pdf/Report';
import { getReport } from './pdf/schemas/index';

const App = ({ label, y, xTickFormat, slug, data }) => {
  const report = getReport(slug);

  return (
    <Report
      tableHeaders={report.tableHeaders}
      data={data}
      schema={report.schemaFnc(label, y, xTickFormat)}
      name={report.name}
      description={report.description}
    />
  );
};

export default App;
