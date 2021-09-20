import React from 'react';
import report from './affected_hosts_by_playbook';
import Report from './Report';

const Pdf = ({apiData}) => (
  <Report
    tableHeaders={report.tableHeaders}
    data={apiData}
    schema={report.schema}
  />
);

export default Pdf;
