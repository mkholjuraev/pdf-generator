import { FC } from 'react';
import { default as Standard } from './Standard';
import { default as AutomationCalculator } from './AutomationCalculator';
import { ComponentProps } from './types';

export enum REPORT_LAYOUTS {
  DEFAULT = 'default',
  AUTOMATION_CALCULATOR = 'automationCalculator',
}

const reportMap: Record<REPORT_LAYOUTS, FC<ComponentProps>> = {
  [REPORT_LAYOUTS.DEFAULT]: Standard as unknown as FC<ComponentProps>,
  [REPORT_LAYOUTS.AUTOMATION_CALCULATOR]:
    AutomationCalculator as unknown as FC<ComponentProps>,
};

const reportMapper = (name: REPORT_LAYOUTS): FC<ComponentProps> =>
  reportMap[name];

export default reportMapper;
