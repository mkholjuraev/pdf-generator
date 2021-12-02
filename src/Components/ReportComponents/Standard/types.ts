import { ApiReturnType } from '../../ChartHelpers/types';
import { BaseReportProps } from '../types';
import { ReportStandardExpandedRow } from './Components/types';
export * from './Components/types';

export type LegendEntry = Record<string, string | number>;
export type TableHeaders = { key: string; value: string }[];

export interface ReportStandardProps extends BaseReportProps {
  tableHeaders: TableHeaders;
  expandedRowComponent?: ReportStandardExpandedRow;
}

export type ReportStandardDataType = ApiReturnType;
