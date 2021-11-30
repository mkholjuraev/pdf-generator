import { ApiReturnType, ChartSchemaElement } from 'react-json-chart-builder';
import { ExpandRowsComponentType } from '../../pdf/types';

export interface ComponentProps {
  tableHeaders: { key: string; value: string }[];
  data: ApiReturnType;
  extraData?: ApiReturnType;
  schema: ChartSchemaElement[];
  name: string;
  description: string;
  ExpandRowsComponent?: ExpandRowsComponentType;
}
