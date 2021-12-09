import { default as Standard } from './Standard';
import { default as AutomationCalculator } from './AutomationCalculator';
import { ReportComponentType, ReportLayout } from './types';

const reportMap: Record<ReportLayout, ReportComponentType> = {
  [ReportLayout.Standard]: Standard,
  [ReportLayout.AutomationCalculator]: AutomationCalculator,
};

const reportMapper = (name: ReportLayout): ReportComponentType =>
  reportMap[name];

export default reportMapper;
