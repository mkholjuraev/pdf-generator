import TemplateExplorerExpandedRow from './TemplateExplorerExpandedRow';
import ExpandedRowContents from '../../AutomationCalculator/TemplatesTable/ExpandedRowContents';
import {
  AutomationCalculatorExpandRowsComponentType,
  ReportStandardExpandedRow,
} from './types';

export const expandedRowMapper = (
  type: ReportStandardExpandedRow | undefined
): AutomationCalculatorExpandRowsComponentType | undefined => {
  switch (type) {
    case ReportStandardExpandedRow.templateExplorer:
      return TemplateExplorerExpandedRow;
    case ReportStandardExpandedRow.automationCalculator:
      return ExpandedRowContents;
    default:
      return undefined;
  }
};
