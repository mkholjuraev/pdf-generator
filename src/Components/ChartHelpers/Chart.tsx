import React, { FC } from 'react';
import ChartBuilder, {
  ChartSchemaElement,
  functions,
} from 'react-json-chart-builder';
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

const Chart: FC<Props> = ({ schema, data }) => (
  <ChartBuilder
    schema={schema}
    functions={customFunctions}
    dataState={[
      convertApiToData(data),
      () => {
        return;
      },
    ]}
  />
);

export default Chart;
