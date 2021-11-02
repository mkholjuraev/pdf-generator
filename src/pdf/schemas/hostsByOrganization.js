import {
  ChartKind,
  ChartType,
  ChartLegendOrientation,
  ChartLegendPosition,
  ChartTopLevelType,
  ChartThemeColor,
} from 'react-json-chart-builder';

const slug = 'hosts_by_organization';

const name = 'Hosts by organization';

const description =
  'The number of unique hosts, grouped by organizations from Ansible Controller.\n\nYou can use this report to find which organizations are managing the most hosts with Ansible automation.';

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Organization name' },
  { key: 'total_unique_host_count', value: 'Unique host count' },
  { key: 'total_unique_host_changed_count', value: 'Unique changed hosts count'}
];

const schemaFnc = (
  label,
  y,
  xTickFormat,
  ) => [
    {
      id: 1,
      kind: ChartKind.wrapper,
      type: ChartTopLevelType.chart,
      parent: null,
      props: {
        height: 500,
        padding: {
          top: 70,
          left: 100,
        },
        domainPadding: {
          y: 25,
        },
        themeColor: ChartThemeColor.multiOrdered,
      },
      xAxis: {
        label: 'Date',
        tickFormat: xTickFormat,
        style: {
          axisLabel: {
            padding: 50,
          },
        },
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
  name,
  description,
  tableHeaders,
  schemaFnc,
};

export default reportParams;
