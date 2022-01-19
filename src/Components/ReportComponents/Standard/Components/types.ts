import TemplateExplorerExpandedRow from './TemplateExplorerExpandedRow';
import ExpandedRowContents from '../../AutomationCalculator/TemplatesTable/ExpandedRowContents';

export type ExpandRowsComponentType = typeof TemplateExplorerExpandedRow;
export type AutomationCalculatorExpandRowsComponentType =
  typeof ExpandedRowContents;

export enum ReportStandardExpandedRow {
  templateExplorer = 'templateExplorer',
  automationCalculator = 'automationCalculator',
}
