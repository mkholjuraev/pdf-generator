import { FC } from 'react';
import { ChartSchemaElement } from 'react-json-chart-builder';
import { ApiReturnType } from '../ChartHelpers/types';
import { ReportStandardExpandedRow } from './Standard/Components/types';
export * from './Standard/Components/types';

export type LegendEntry = Record<string, string | number>;
export type TableHeaders = { key: string; value: string }[];

export interface ReportStandardProps extends BaseReportProps {
  tableHeaders: TableHeaders;
  expandedRowComponent?: ReportStandardExpandedRow;
}

export type ReportStandardDataType = ApiReturnType;

export interface Template {
  name: string;
  id: number;
  elapsed: number;
  host_count: number;
  total_count: number;
  total_org_count: number;
  total_cluster_count: number;
  total_inventory_count: number;
  successful_hosts_total: number;
  successful_elapsed_total: number;
  // Calculated fields
  delta: number;
  avgRunTime: number;
  manualCost: number;
  automatedCost: number;
  enabled: boolean;
  // Anything else accidentally having it
  [key: string]: string | number | boolean;
}

export interface ReportAutomationCalculatorDataType
  extends Omit<ApiReturnType, 'meta'> {
  meta: {
    legend: Template[];
  };
}

export interface BaseReportProps {
  slug: string;
  schema: ChartSchemaElement[];
  name: string;
  description: string;
  data: ApiReturnType;
  extraData: ApiReturnType;
}

export interface ReportAutomationCalculatorProps extends BaseReportProps {
  tableHeaders: TableHeaders;
  expandedRowComponent?: ReportStandardExpandedRow;
}

export enum ReportLayout {
  Standard = 'standard',
  AutomationCalculator = 'automationCalculator',
}

export type ReportComponentType =
  | FC<ReportAutomationCalculatorProps>
  | FC<ReportStandardProps>;
