import {
  ChartKind,
  ChartLegendOrientation,
  ChartLegendPosition,
  ChartTopLevelType,
  ChartType,
  ChartThemeColor,
  ChartSchemaElement,
} from 'react-json-chart-builder';
import { ReportLayout } from '../Components/ReportComponents/types';
import { ReportSchema } from './types';

const slug = 'jobs_and_tasks_by_organization';

const name = 'Jobs/Tasks by organization';

const description =
  'The number of job template and task runs, grouped by organizations from Ansible Controller.\n\nYou can use this report to find which organizations are running the most Ansible jobs.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Organization name' },
  { key: 'total_count', value: 'Total jobs count' },
  { key: 'host_task_count', value: 'Tasks count' },
];

const schema: ChartSchemaElement[] = [
  {
    id: 1,
    kind: ChartKind.wrapper,
    type: ChartTopLevelType.chart,
    parent: null,
    props: {
      height: 500,
      padding: {
        top: 70,
        right: 100,
      },
      domainPadding: {
        y: 25,
      },
      themeColor: ChartThemeColor.multiOrdered,
    },
    xAxis: {
      label: 'Date',
      tickFormat: 'VAR_xTickFormat',
    },
    yAxis: {
      tickFormat: 'formatNumberAsK',
      showGrid: true,
      label: 'VAR_label',
      style: {
        axisLabel: {
          padding: 55,
        },
      },
    },
    legend: {
      interactive: false,
      orientation: ChartLegendOrientation.vertical,
      position: ChartLegendPosition.right,
      turncateAt: 18,
      wrapText: true,
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
    type: ChartType.line,
    parent: 0,
    props: {
      x: 'created_date',
      y: 'VAR_y',
    },
  },
];
const reportParams: ReportSchema = {
  layoutComponent: ReportLayout.Standard,
  layoutProps: {
    slug,
    name,
    description,
    tableHeaders,
    schema,
  },
};
export default reportParams;
