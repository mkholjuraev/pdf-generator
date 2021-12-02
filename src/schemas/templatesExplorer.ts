import {
  ChartKind,
  ChartTopLevelType,
  ChartType,
  ChartThemeColor,
  ChartSchemaElement,
} from 'react-json-chart-builder';
import {
  ReportLayout,
  ReportStandardExpandedRow,
} from '../Components/ReportComponents/types';
import { ReportSchema } from './types';

const slug = 'templates_explorer';

const name = 'Templates explorer';

const description =
  'An overview of the job templates that have ran across your Ansible cluster.\n\nYou can use this report to review the status of a particular job template across its job runs, giving you an overview of the times a template fails a job run, a host, or a task. You can also review the host and task status for tasks that fail the most, allowing you to identify any bottlenecks or problems with the templates you are running.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Template name' },
  { key: 'total_count', value: 'Total jobs count' },
  { key: 'successful_count', value: 'Successful jobs count' },
  { key: 'failed_count', value: 'Failed jobs count' },
];

const schema: ChartSchemaElement[] = [
  {
    id: 1,
    kind: ChartKind.wrapper,
    type: ChartTopLevelType.chart,
    parent: null,
    props: {
      height: 400,
      padding: {
        top: 70,
        bottom: 150,
        right: 100,
        left: 90,
      },
      domainPadding: {
        y: 25,
      },
      themeColor: ChartThemeColor.multiOrdered,
    },
    xAxis: {
      label: 'Template',
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
      label: 'VAR_label',
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
    expandedRowComponent: ReportStandardExpandedRow.templateExplorer,
  },
};

export default reportParams;
