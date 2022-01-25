import {
  ChartKind,
  ChartSchemaElement,
  ChartTopLevelType,
  ChartType,
} from 'react-json-chart-builder';
import {
  ReportLayout,
  ReportStandardExpandedRow,
} from '../Components/ReportComponents/types';
import { ReportSchema } from './types';

const slug = 'automation_calculator';

const name = 'Automation calculator';

const description =
  'The calculated savings of the job templates running across the company in comparison to the cost of completing these jobs manually.\n\n' +
  'You can use this report to get an idea of the ROI from your automation, as well as identify which templates are contributing to this savings the most';

const tableHeaders = [
  { key: 'name', value: 'Name' },
  { key: 'time', value: 'Time' },
  { key: 'savings', value: 'Savings' },
  { key: 'presence_in_the_chart', value: 'Presence in the chart' },
];

const schema = [
  {
    id: 1,
    kind: ChartKind.wrapper,
    type: ChartTopLevelType.chart,
    parent: null,
    props: {
      height: 300,
      padding: {
        top: 10,
        bottom: 150,
        right: 0,
        left: 90,
      },
    },
    xAxis: {
      label: 'Templates',
      style: {
        axisLabel: {
          padding: 130,
        },
      },
      labelProps: {
        angle: -45,
        textAnchor: 'end',
        dx: 0,
        dy: 0,
      },
      fixLabelOverlap: false,
      turncateAt: 16,
      wrapText: true,
    },
    yAxis: {
      tickFormat: 'formatNumberAsK',
      showGrid: true,
      label: 'Savings per template',
      style: {
        axisLabel: {
          padding: 60,
        },
      },
    },
  },
  {
    id: 2,
    kind: ChartKind.group,
    parent: 1,
    template: 3,
  },
  {
    id: 3,
    kind: ChartKind.simple,
    type: ChartType.bar,
    parent: 0,
    props: {
      x: 'name',
      y: 'delta',
    },
    tooltip: {
      standalone: true,
      labelName: 'Saving',
    },
  },
];

const reportParams: ReportSchema = {
  layoutComponent: ReportLayout.AutomationCalculator,
  layoutProps: {
    slug,
    name,
    description,
    schema: schema as unknown as ChartSchemaElement[],
    tableHeaders,
    expandedRowComponent: ReportStandardExpandedRow.automationCalculator,
  },
};

export default reportParams;
