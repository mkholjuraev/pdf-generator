import {
  ChartKind,
  ChartType,
  ChartLegendOrientation,
  ChartLegendPosition,
  ChartTopLevelType,
  ChartThemeColor,
} from 'react-json-chart-builder';

const slug = 'aa_2_1_onboarding';

const name = 'AA 2.1 Onboarding Report';

const description = `This report shows templates that utilize certain module types that have been identified to pose potential problems when migrating to AAP 2.1.

  You can use this report to determine the last job run of these templates, as well as a link into the Controller instance where the template is defined.`;

const tableHeaders = [
  { key: 'id', value: 'ID' },
  { key: 'name', value: 'Template name' },
  { key: 'host_task_count', value: 'Tasks count' },
  { key: 'host_task_changed_count', value: 'Changed tasks count' },
  { key: 'host_task_ok_count', value: 'Successful tasks count' },
  { key: 'host_task_failed_count', value: 'Failed tasks count' },
  { key: 'host_task_unreachable_count', value: 'Unreachable tasks count' },
];

const schemaFnc = (label, y, xTickFormat) => [
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
