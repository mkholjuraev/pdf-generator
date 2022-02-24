import React from 'react';
import AutomationAnalyticsTemplate from './automation-analytics/App';
import AutomationAnalyticsHeaderTemplate from './automation-analytics/header-template';
import AutomationAnalyticsFooterTemplate from './automation-analytics/footer-template';
import DemoTemplate from './demo/Template';
import CommonHeader from './common/common-header';

export const headerTeamplteMapper = {
  'automation-analytics': AutomationAnalyticsHeaderTemplate,
  demo: CommonHeader,
};

export const footerTemplateMapper = {
  'automation-analytics': AutomationAnalyticsFooterTemplate,
  demo: () => <div />,
};

const templates = {
  'automation-analytics': AutomationAnalyticsTemplate,
  demo: DemoTemplate,
};

export default templates;
