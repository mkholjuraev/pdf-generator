import { ChartSchemaElement } from 'react-json-chart-builder';
import {
  ReportAutomationCalculatorProps,
  ReportLayout,
  ReportStandardProps,
} from '../Components/ReportComponents/types';

export type SchemaParams = Record<string, string>;
export type SchemaFnc = (props: SchemaParams) => ChartSchemaElement[];

export type ReportSchema =
  | {
      layoutComponent: ReportLayout.Standard;
      layoutProps: Omit<ReportStandardProps, 'data' | 'extraData'>;
    }
  | {
      layoutComponent: ReportLayout.AutomationCalculator;
      layoutProps: Omit<ReportAutomationCalculatorProps, 'data' | 'extraData'>;
    };
