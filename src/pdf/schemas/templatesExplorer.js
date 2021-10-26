import {
  ChartKind,
  ChartTopLevelType,
  ChartType,
  ChartThemeColor,
} from 'react-json-chart-builder';

import ExpandedRow from '../../Components/TemplateExplorerExpandedRow';

const slug = 'templates_explorer';

const name = 'Templates explorer';

const description =
  'An overview of the job templates that have ran across your Ansible cluster.\n\nYou can use this report to review the status of particular job templates across its job runs, giving you an overview of the times a template fails a job run, a host, or a task. You can also review the host and task status for tasks that fail the most, allowing you to identify any bottlenecks or problems with the templates you are running.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Template name' },
  { key: 'total_count', value: 'Total jobs count' },
  { key: 'successful_count', value: 'Successful jobs count' },
  { key: 'failed_count', value: 'Failed jobs count' },
];

const schemaFnc = (
  label,
  y,
  _xTickFormat
) => [
    {
      id: 1,
      kind: ChartKind.wrapper,
      type: ChartTopLevelType.chart,
      parent: null,
      props: {
        height: 400,
        padding: {
          top: 70,
          right: 100,
        },
        domainPadding: {
          y: 25,
          x: 85,
        },
        themeColor: ChartThemeColor.multiOrdered,
      },
      xAxis: {
        label: 'Template',
        style: {
          axisLabel: {
            padding: 55,
          },
        },
        // It is using names instead of dates so no need for formatting.
        // tickFormat: xTickFormat,
      },
      yAxis: {
        tickFormat: 'formatNumberAsK',
        showGrid: true,
        label,
        style: {
          axisLabel: {
            padding: 60,
          },
        },
      },
      api: {
        url: '',
        params: {},
      },
    },
    {
      id: 2,
      kind: ChartKind.group,
      parent: 1,
      template: {
        id: 0,
        kind: ChartKind.simple,
        type: ChartType.bar,
        parent: 0,
        props: {
          x: 'name',
          y,
        },
      },
    },
  ];

const reportParams = {
  slug,
  name,
  description,
  tableHeaders,
  schemaFnc,
  ExpandRowsComponent: ExpandedRow,
};

export default reportParams;
