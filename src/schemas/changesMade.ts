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
    tableHeaders,
    name,
    description,
    schema: schema as unknown as ChartSchemaElement[],
  },
};

export default reportParams;
