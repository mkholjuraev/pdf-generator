import {
  ChartKind,
  ChartLegendOrientation,
  ChartLegendPosition,
  ChartTopLevelType,
  ChartThemeColor,
  ChartSchemaElement,
} from 'react-json-chart-builder';
import { ReportLayout } from '../Components/ReportComponents/types';
import { ReportSchema } from './types';

const slug = 'most_used_modules';

const name = 'Most used modules';

const description =
  'The number of job template and task runs, grouped by Ansible module usage.\n\nYou can use this report to find which modules are being used the most across your automation, helping you to check things like organization-wide adoption of purpose-built modules over potentially less performant, catch-all solutions.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Module name' },
  { key: 'host_task_count', value: 'Tasks count' },
  { key: 'host_task_changed_count', value: 'Changed tasks count' },
  { key: 'host_task_ok_count', value: 'Successful tasks count' },
  { key: 'host_task_failed_count', value: 'Failed tasks count' },
  { key: 'host_task_unreachable_count', value: 'Unreachable tasks count' },
];

const schema = [
  {
    id: 1,
    kind: ChartKind.wrapper,
    type: ChartTopLevelType.chart,
    parent: null,
    props: {
      height: 475,
      padding: {
        top: 70,
        right: 180,
      },
      themeColor: ChartThemeColor.multiOrdered,
    },
    xAxis: {
      label: 'Date',
      tickFormat: 'VAR_xTickFormat',
      style: {
        axisLabel: {
          padding: 50,
        },
      },
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
      interactive: true,
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
    type: 'VAR_chartType',
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
    schema: schema as unknown as ChartSchemaElement[],
  },
};
export default reportParams;
