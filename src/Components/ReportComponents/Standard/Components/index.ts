import TemplateExplorerExpandedRow from './TemplateExplorerExpandedRow';
import { ExpandRowsComponentType, ReportStandardExpandedRow } from './types';

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
