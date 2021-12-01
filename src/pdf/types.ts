import { ChartSchemaElement } from 'react-json-chart-builder';
import { ReportLayout } from '../Components/ReportComponents';

export type SchemaFnc = (
  label: string,
  y: string,
  xTickFormat: string
) => ChartSchemaElement[];

export type TableHeaders = { key: string; value: string }[];

export type ExpandRowsComponentType = React.ComponentType<any>;

export interface ReportSchema {
  slug: string;
  tableHeaders: TableHeaders;
  name: string;
  description: string;
  schemaFnc: SchemaFnc;
  ExpandRowsComponent?: ExpandRowsComponentType;
  componentName?: ReportLayout;
}
