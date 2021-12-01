import {
  ChartKind,
  ChartLegendOrientation,
  ChartLegendPosition,
  ChartTopLevelType,
  ChartType,
  ChartThemeColor,
} from 'react-json-chart-builder';
import { ReportSchema, SchemaFnc } from '../types';

const slug = 'changes_made_by_job_template';

const name = 'Changes made by job template';

const description =
  'The total count of changes made by each job template in a specified time window.\n\nYou can use this report to ensure the correct number of changes are made per hostname, as well as see which job templates are doing the most changes to your infrastructure.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Template name' },
  { key: 'host_count', value: 'Host count' },
  { key: 'changed_host_count', value: 'Changed host count' },
  { key: 'host_task_changed_count', value: 'Changed task count' },
  { key: 'host_task_count', value: 'Task count' },
];

const schemaFnc: SchemaFnc = (label, y, xTickFormat) => [
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
      tickFormat: xTickFormat,
    },
    yAxis: {
      tickFormat: 'formatNumberAsK',
      showGrid: true,
      label,
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
      y,
    },
  },
];

const reportParams: ReportSchema = {
  slug,
  tableHeaders,
  name,
  description,
  schemaFnc,
};

export default reportParams;
