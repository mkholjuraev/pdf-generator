import React, { useEffect } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import Report from './pdf/Report';
import { getReport } from './pdf/schemas/index';
import PageOptionsContext from './PageOptionsContext';

const App = ({ label, y, xTickFormat, slug, data, pageWidth, pageHeight }) => {
  const report = getReport(slug);

  useEffect(() => {
    document.title = report.name
  }, [report]);

  return (
    <PageOptionsContext.Provider value={{ pageWidth, pageHeight }}>
      <Report
        tableHeaders={report.tableHeaders}
        data={data}
        schema={report.schemaFnc(label, y, xTickFormat)}
        name={report.name}
        description={report.description}
        ExpandRowsComponent={report.ExpandRowsComponent ?? null}
      />
    </PageOptionsContext.Provider>
  );
};

export default App;
