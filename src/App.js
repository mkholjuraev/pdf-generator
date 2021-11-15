import React, { useEffect } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import reportMapper, { REPORT_LAYOUTS } from './Components/ReportComponents';
import { getReport } from './pdf/schemas/index';
import PageOptionsContext from './PageOptionsContext';

const App = ({ label, y, xTickFormat, slug, data, extraData, pageWidth, pageHeight }) => {
  const report = getReport(slug);

  if (!report) {
    // This should happen only in development.
    throw new Error(`The report (${slug}) is not implemented.`);
  }

  useEffect(() => {
    document.title = report.name;
  }, [report]);

  const Report = reportMapper(report?.componentName ?? REPORT_LAYOUTS.DEFAULT);

  return (
    <PageOptionsContext.Provider value={{ pageWidth, pageHeight }}>
      <Report
        tableHeaders={report.tableHeaders}
        data={data}
        extraData={extraData}
        schema={report.schemaFnc(label, y, xTickFormat)}
        name={report.name}
        description={report.description}
        ExpandRowsComponent={report.ExpandRowsComponent ?? null}
      />
    </PageOptionsContext.Provider>
  );
};

export default App;
