import { FC } from 'react';
import { ChartSchemaElement } from 'react-json-chart-builder';
import { ApiReturnType } from '../ChartHelpers/types';
import { ReportAutomationCalculatorProps } from './AutomationCalculator/types';
import { ReportStandardProps } from './Standard/types';

export * from './AutomationCalculator/types';
export * from './Standard/types';

export enum ReportLayout {
  Standard = 'standard',
  AutomationCalculator = 'automationCalculator',
}

export interface BaseReportProps {
  slug: string;
  schema: ChartSchemaElement[];
  name: string;
  description: string;
  data: ApiReturnType;
  extraData?: ApiReturnType;
}

export type ReportComponentType =
  | FC<ReportAutomationCalculatorProps>
  | FC<ReportStandardProps>;
