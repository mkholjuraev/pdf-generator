import affectedHostsByPlaybook from './affectedHostsByPlaybook';
import changesMade from './changesMade';
import playbookRunRate from './playbookRunRate';
import hostsByOrganization from './hostsByOrganization';
import templatesExplorer from './templatesExplorer';
import jobsTasksByOrganization from './jobsTasksByOrganization';

const reports = [
  affectedHostsByPlaybook,
  changesMade,
  playbookRunRate,
  hostsByOrganization,
  templatesExplorer,
  jobsTasksByOrganization,
];

export const getReport = (searchSlug) =>
  reports.find(({ slug }) => slug === searchSlug) ?? reports[0];

export default reports;
