import affectedHostsByPlaybook from './affectedHostsByPlaybook';
import changesMade from './changesMade';
import playbookRunRate from './playbookRunRate';
import hostsByOrganization from './hostsByOrganization';
import templatesExplorer from './templatesExplorer';
import jobsTasksByOrganization from './jobsTasksByOrganization';
import mostUsedModules from './mostUsedModules';
import moduleUsageByOrganization from './moduleUsageByOrganization';
import moduleUsageByJobTemplate from './moduleUsageByJobTemplate';
import moduleUsageByTask from './moduleUsageByTask';
import automationCalculator from './automationCalculator';
import aa21OnboardingReport from './aa21OnboardingReport';
import { ReportSchema } from './types';
import hydrateSchema from '../Utilities/hydrateSchema';

const reports: ReportSchema[] = [
  affectedHostsByPlaybook,
  changesMade,
  playbookRunRate,
  hostsByOrganization,
  templatesExplorer,
  jobsTasksByOrganization,
  mostUsedModules,
  moduleUsageByOrganization,
  moduleUsageByJobTemplate,
  moduleUsageByTask,
  automationCalculator,
  aa21OnboardingReport,
];

export const getReport = ({
  slug,
  schemaParams,
}: {
  slug: string;
  schemaParams: {
    label?: string;
    y?: string;
    xTickFormat?: string;
  };
}): ReportSchema => {
  const report = reports.find(({ layoutProps }) => layoutProps.slug === slug);

  if (!report) {
    // This should happen only in development.
    throw new Error(`The report (${slug}) is not implemented.`);
  }

  report.layoutProps.schema = hydrateSchema(report.layoutProps.schema)(
    schemaParams
  );

  return report;
};

export default reports;
