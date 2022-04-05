import { IncomingHttpHeaders } from 'http';
import { SupportedTemplates } from '../types';
import { aapScript as getAutomationAnalyticsData } from './automation-analytics';
import { getDemoData } from './demo-data';

const templateMapper: {
  [key: string]: (...args: any[]) => Promise<Record<string, unknown>>;
} = {
  'automation-analytics': getAutomationAnalyticsData,
  demo: getDemoData,
};

async function getTemplateData(
  headers: IncomingHttpHeaders,
  template: SupportedTemplates,
  ...args: any[]
): Promise<Record<string, unknown>> {
  const dataAccessor = templateMapper[template];

  if (typeof dataAccessor === 'function') {
    return dataAccessor(headers, ...args);
  }
}

export default getTemplateData;
