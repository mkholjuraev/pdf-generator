import React, { FunctionComponent } from 'react';
import ChartBuilder, {
  functions,
  ChartSchemaElement,
} from 'react-json-chart-builder';
import { convertApiToData } from '../../ChartHelpers/convertApi';
import { ApiReturnType } from '../../ChartHelpers/types';
import { DataType } from './types';

interface Props {
  schema: ChartSchemaElement[];
  data: DataType;
}

const Chart: FunctionComponent<Props> = ({ schema, data }) => (
  <ChartBuilder
    schema={schema}
    functions={functions}
    dataState={[
      convertApiToData(data as unknown as ApiReturnType),
      () => {
        return;
      },
    ]}
  />
);

export default Chart;
