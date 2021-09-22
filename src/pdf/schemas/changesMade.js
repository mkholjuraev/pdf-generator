import {
  ChartKind,
  ChartLegendOrientation,
  ChartLegendPosition,
  ChartTopLevelType,
  ChartType,
  ChartThemeColor,
} from 'react-json-chart-builder';

const slug = 'changes_made_by_job_template';

const name = 'Changes made by job template';

const description =
  'The total count of changes made by each job template in a specified time window.\n\nYou can use this report to ensure the correct number of changes are made per hostname, as well as see which job templates are doing the most changes to your infrastructure.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Template name' },
  { key: 'host_count', value: 'Host count' },
  { key: 'changed_host_count', value: 'Changed host count', },
  { key: 'host_task_changed_count', value: 'Changed task count', },
  { key: 'host_task_count', value: 'Task count', },
];

const schemaFnc = (
  label,
  y,
  xTickFormat
) => [
    {
      id: 1,
      kind: ChartKind.wrapper,
      type: ChartTopLevelType.chart,
      parent: null,
      props: {
        height: 530,
        padding: {
          top: 0,
          bottom: -20,
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
      api: {
        url: '',
        params: {},
      },
      legend: {
        interactive: false,
        orientation: ChartLegendOrientation.horizontal,
        position: ChartLegendPosition.bottom,
      },
    },
    {
      id: 2,
      kind: ChartKind.group,
      parent: 1,
      template: {
        id: 0,
        kind: ChartKind.simple,
        type: ChartType.line,
        parent: 0,
        props: {
          x: 'created_date',
          y,
        },
      },
    },
  ];

const reportParams = {
  slug,
  tableHeaders,
  name,
  description,
  schemaFnc,
};

export default reportParams;
