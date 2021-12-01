import { FC } from 'react';
import { default as Standard } from './Standard';
import { default as AutomationCalculator } from './AutomationCalculator';
import { ComponentProps } from './types';

export enum ReportLayout {
  Standard = 'standard',
  AutomationCalculator = 'automationCalculator',
}

const reportMap: Record<ReportLayout, FC<ComponentProps>> = {
  [ReportLayout.Standard]: Standard as unknown as FC<ComponentProps>,
  [ReportLayout.AutomationCalculator]:
    AutomationCalculator as unknown as FC<ComponentProps>,
};

const reportMapper = (name: ReportLayout): FC<ComponentProps> =>
  reportMap[name];

export default reportMapper;
