import DemoTemplate from './demo/Template';
import CommonHeader from './common/common-header';
import CommonFooter from './common/common-footer';
import VulnerabilitiesSystemTemplate from './vulnerabilities-system/Template';
import ServiceNames from '../common/service-names';
import VulnerabilityTemplate from './vulnerability/Template';
import AdvisorTemplate from './advisor/Template';
import ComplianceTemplate from './compliance/template';

export type TemplateElement = (props: any) => JSX.Element;

export type ServiceTemplate = {
  template: TemplateElement;
  header: TemplateElement;
  footer: TemplateElement;
};

export type TemplateMapper = {
  [key in ServiceNames]: {
    [key: string]: ServiceTemplate;
  };
};

const templates: TemplateMapper = {
  [ServiceNames.demo]: {
    demo: {
      template: DemoTemplate,
      header: CommonHeader,
      footer: CommonFooter,
    },
  },
  [ServiceNames.compliance]: {
    report: {
      template: ComplianceTemplate,
      header: CommonHeader,
      footer: CommonFooter,
    },
  },
  [ServiceNames.vulnerability]: {
    vulnerabilities: {
      template: VulnerabilityTemplate,
      header: CommonHeader,
      footer: CommonFooter,
    },
    systems: {
      template: VulnerabilitiesSystemTemplate,
      header: CommonHeader,
      footer: CommonFooter,
    },
  },
  [ServiceNames.advisor]: {
    advisor: {
      template: AdvisorTemplate,
      header: CommonHeader,
      footer: CommonFooter,
    },
  },
};

export default templates;
