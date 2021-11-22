import { FunctionComponent } from 'react';
import { default as DefaultReport } from './DefaultReport/';
import { default as AutomationCalculatorReport } from './AutomationCalculatorReport/';
import { ComponentProps } from './types';

export enum REPORT_LAYOUTS {
  DEFAULT = 'default',
  AUTOMATION_CALCULATOR = 'automationCalculator',
}

const reportMap = {
  [REPORT_LAYOUTS.DEFAULT]: DefaultReport,
  [REPORT_LAYOUTS.AUTOMATION_CALCULATOR]: AutomationCalculatorReport,
};

// TODO Replace any with a type
const reportMapper = (
  name: REPORT_LAYOUTS
): FunctionComponent<ComponentProps> => reportMap[name];

export default reportMapper;
