import React, { FC, useContext } from 'react';
import ChartBuilder, {
  ChartData,
  ChartSchemaElement,
  functions,
} from 'react-json-chart-builder';
import PageOptionsContext from '../../PageOptionsContext';
import { convertApiToData } from './convertApi';
import { ApiReturnType } from './types';

interface Props {
  schema: ChartSchemaElement[];
  data: ApiReturnType;
}

const customFunctions = {
  ...functions,
  axisFormat: {
    ...functions.axisFormat,
    formatAsYear: (tick: string | number) =>
      Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(tick)),
    formatAsMonth: (tick: string | number) =>
      Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(tick)),
  },
};

const applyHiddenFilter = (
  chartData: ChartData,
  chartSeriesHidden: boolean[] = []
): ChartData => ({
  ...chartData,
  series: chartData.series.map((series, index) => ({
    ...series,
    hidden: !!chartSeriesHidden[index],
  })),
});

const Chart: FC<Props> = ({ schema, data }) => {
  const { chartSeriesHiddenProps } = useContext(PageOptionsContext);
  const processedData = applyHiddenFilter(
    convertApiToData(data),
    chartSeriesHiddenProps
  );

  return (
    <ChartBuilder
      schema={schema}
      functions={customFunctions}
      dataState={[
        processedData,
        () => {
          return;
        },
      ]}
    />
  );
};

export default Chart;
