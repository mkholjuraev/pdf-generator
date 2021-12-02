import React, { FC } from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import reportMapper from './Components/ReportComponents';
import { getReport } from './schemas/index';
import PageOptionsContext from './PageOptionsContext';
import { ApiReturnType } from './Components/ChartHelpers/types';

interface Props {
  label: string;
  y: string;
  xTickFormat: string;
  slug: string;
  data: ApiReturnType;
  extraData: ApiReturnType;
  pageWidth: number;
  pageHeight: number;
}

const App: FC<Props> = ({
  label,
  y,
  xTickFormat,
  slug,
  data,
  extraData,
  pageWidth,
  pageHeight,
}) => {
  const report = getReport({
    slug,
    schemaParams: {
      label,
      y,
      xTickFormat,
    },
  });

  document.title = report.layoutProps.name;
  const Report = reportMapper(report.layoutComponent);

  const returnReport = () => (
    /*
     * Ignoring this line because TS cannot derive the correct params
     * even though has all the information for it and it is correct.
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Report {...report.layoutProps} data={data} extraData={extraData} />
  );

  return (
    <PageOptionsContext.Provider value={{ pageWidth, pageHeight }}>
      {returnReport()}
    </PageOptionsContext.Provider>
  );
};

export default App;
