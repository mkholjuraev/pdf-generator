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

const reports = [
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
];

export const getReport = (searchSlug) =>
  reports.find(({ slug }) => slug === searchSlug);

export default reports;
