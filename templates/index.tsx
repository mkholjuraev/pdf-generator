// import AutomationAnalyticsTemplate from './automation-analytics/App';
// import AutomationAnalyticsHeaderTemplate from './automation-analytics/header-template';
// import AutomationAnalyticsFooterTemplate from './automation-analytics/footer-template';
import DemoTemplate from './demo/Template';
import CommonHeader from './common/common-header';
import CommonFooter from './common/common-footer';
import { ServiceNames } from '../server/data-access/call-service';

export const headerTeamplteMapper = {
  // 'automation-analytics': AutomationAnalyticsHeaderTemplate,
  [ServiceNames.demo]: CommonHeader,
  [ServiceNames.compliance]: CommonHeader,
};

export const footerTemplateMapper = {
  // 'automation-analytics': AutomationAnalyticsFooterTemplate,
  [ServiceNames.demo]: CommonFooter,
  [ServiceNames.compliance]: CommonFooter,
};

const templates = {
  // 'automation-analytics': AutomationAnalyticsTemplate,
  [ServiceNames.demo]: DemoTemplate,
  [ServiceNames.compliance]: DemoTemplate,
};

export default templates;
