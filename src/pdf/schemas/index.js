import affectedHostsByPlaybook from './affectedHostsByPlaybook';
import changesMade from './changesMade';
import playbookRunRate from './playbookRunRate';

const reports = [affectedHostsByPlaybook, changesMade, playbookRunRate];

export const getReport = (searchSlug) =>
  reports.find(({ slug }) => slug === searchSlug) ?? reports[0];

export default reports;
