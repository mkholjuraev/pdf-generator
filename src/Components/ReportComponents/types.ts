import { ChartSchemaElement } from 'react-json-chart-builder';

export interface ComponentProps {
  tableHeaders: { key: string; value: string }[];
  data: any;
  schema: ChartSchemaElement[];
  name: string;
  description: string;
}
