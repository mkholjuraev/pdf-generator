import ExpandedRowContents from '../../AutomationCalculator/TemplatesTable/ExpandedRowContents';
import TemplateExplorerExpandedRow from './TemplateExplorerExpandedRow';
import {
  AutomationCalculatorExpandRowsComponentType,
  ExpandRowsComponentType,
  ReportStandardExpandedRow,
} from './types';

export const expandedRowMapper = (
  type: ReportStandardExpandedRow | undefined
): ExpandRowsComponentType | undefined => {
  switch (type) {
    case ReportStandardExpandedRow.templateExplorer:
      return TemplateExplorerExpandedRow;
    default:
      return undefined;
  }
};

export const AutomationCalculatorExpandedRowMapper = (
  type: ReportStandardExpandedRow | undefined
): AutomationCalculatorExpandRowsComponentType | undefined => {
  switch (type) {
    case ReportStandardExpandedRow.automationCalculator:
      return ExpandedRowContents;
    default:
      return undefined;
  }
};
