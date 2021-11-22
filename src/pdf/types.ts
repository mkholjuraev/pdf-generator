import { ChartSchemaElement } from 'react-json-chart-builder';
import { REPORT_LAYOUTS } from '../Components/ReportComponents';

export type SchemaFnc = (
  label: string,
  y: string,
  xTickFormat: string
) => ChartSchemaElement[];

export type TableHeaders = { key: string; label: string }[];

export interface ReportSchema {
  slug: string;
  tableHeaders: TableHeaders;
  name: string;
  description: string;
  schemaFnc: SchemaFnc;
  ExpandRowsComponent?: React.ComponentType<any>;
  componentName?: REPORT_LAYOUTS;
}
