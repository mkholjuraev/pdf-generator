import React, { Fragment, ReactNode } from 'react';
import {
  Grid,
  GridItem,
  List,
  ListItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
  Title,
} from '@patternfly/react-core';
import {
  ChartDonut,
  ChartPie,
  ChartThemeColor,
  getThemeColors,
} from '@patternfly/react-charts';
import {
  CheckCircleIcon,
  AngleDoubleDownIcon,
  AngleDoubleUpIcon,
  TachometerAltIcon,
  InProgressIcon,
  AutomationIcon,
} from '@patternfly/react-icons';
import {
  global_danger_color_100,
  global_info_color_100,
  global_success_color_100,
  global_warning_color_100,
} from '@patternfly/react-tokens';
import Page from '../../common/page';
import rosData from '../../../server/data-access/rosDescriptor/rosData';
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import TableLegend from '../../common/components/table-legend';
import TextWithColorDot from '../../common/components/text-with-color-dot';

const DescriptionList = ({
  data,
}: {
  data: { title: ReactNode; description: ReactNode; icon?: ReactNode }[];
}) => (
  <Grid>
    {data.map(({ title, description, icon }, index) => (
      <Fragment key={index}>
        <GridItem span={3}>
          {icon && <span className="pf-u-mr-sm">{icon}</span>}
          <span>{title}</span>
        </GridItem>
        <GridItem span={9}>{description}</GridItem>
      </Fragment>
    ))}
  </Grid>
);

export const pluralize = (count: number, singular: string, plural?: string) => {
  if (!plural) {
      plural = `${singular}s`;
  }

  return `${count === 1 ? singular : plural}`;
};

const RosExecutiveTemplate = ({ data }: { data: typeof rosData }) => {
  const {
    conditions: {
      io: { count: ioCount, ...ioConditions },
      memory: { count: memoryCount, ...memoryConditions },
      cpu: { count: cpuCount, ...cpuConditions },
    },
    systems_per_state: {
      optimized: { count: optimizedCount, percentage: optimizedPercentage },
      under_pressure: {
        count: underPressureCount,
        percentage: userPressurePercentage,
      },
      undersized: { count: undersizedCount, percentage: undersizedPercentage },
      oversized: { count: oversizedCount, percentage: oversizedPercentage },
      idling: { count: idlingCount, percentage: idlingPercentage },
      waiting_for_data: {
        count: waitingForDataCount,
        percentage: waitingForDataPercentage,
      },
    },
    meta: { conditions_count: conditionsCount, non_optimized_count: nonOptimizedCount, non_psi_count: nonPSICount,
      psi_enabled_count: psiEnabledCount, total_count: totalCount, stale_count: staleCount },
  } = data;

  const breakdownData = [
    {
      x: 'Optimized',
      y: optimizedCount,
      percentage: optimizedPercentage,
    },
    {
      x: 'Under pressure',
      y: underPressureCount,
      percentage: userPressurePercentage,
    },
    {
      x: 'Undersized',
      y: undersizedCount,
      percentage: undersizedPercentage,
    },
    {
      x: 'Oversized',
      y: oversizedCount,
      percentage: oversizedPercentage,
    },
    {
      x: 'Idling',
      y: idlingCount,
      percentage: idlingPercentage,
    },
    {
      x: 'Waiting for data',
      y: waitingForDataCount,
      percentage: waitingForDataPercentage,
    },
  ];

  const performanceData = [
    {
      x: 'Disk IO',
      y: ioCount,
    },
    {
      x: 'RAM',
      y: memoryCount,
    },
    {
      x: 'CPU',
      y: cpuCount,
    },
  ];

  const newLine = '\n';

  const blueColorScale = getThemeColors(ChartThemeColor.blue).pie.colorScale;
  const breakdownColors = getThemeColors(ChartThemeColor.multiOrdered).pie
    .colorScale;

  return (
    <Fragment>
      <Page>
        <Title
          headingLevel="h1"
          className="pf-u-danger-color-100 pf-u-font-size-4xl pf-u-mb-lg"
        >
          Resource optimization service report
        </Title>
        <Stack hasGutter>
          <StackItem>
            <TextContent>
              <Text>
              This executive summary highlights the performance for your registered systems included in the resource optimization service.
              </Text>
            </TextContent>
          </StackItem>
          <StackItem>
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-danger-color-100"
            >
              Registered systems
            </Title>

            <TextContent>
              <Text component={TextVariants.p}>
              There {pluralize(totalCount, 'is', 'are')} {totalCount} registered {pluralize(totalCount, 'system')} in the resource optimization service.
              </Text>
            </TextContent>
            
            <TextContent>
              <Text style={{ textAlign: 'right' }} component="small">
              Suggestions for stale systems might no longer apply due to systems not being refreshed in 7 days.*
              </Text>
            </TextContent>
          </StackItem>
          <StackItem>
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-danger-color-100"
            >
              Breakdown of registered systems
            </Title>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                className="pf-u-ml-lg pf-u-mr-lg"
                style={{ width: 150, height: 150 }}
              >
                <ChartPie
                  ariaDesc="Systems breakdown"
                  animate={false}
                  themeColor={ChartThemeColor.multiOrdered}
                  labels={({ datum }) => `${datum.x}: ${datum.y}`}
                  data={breakdownData.map(({ x, y }) => ({ x, y }))}
                  padding={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                />
              </div>
              <TableLegend
                columns={['State', '# of systems']}
                rows={breakdownData.map(({ x, y, percentage }, index) => [
                  <TextWithColorDot
                    key={`${x}-index`}
                    color={breakdownColors[index % breakdownColors.length]}
                  >
                    {x}
                  </TextWithColorDot>,
                  `${y} (${percentage}% of total)`,
                ])}
              />
            </div>
            <TextContent>
              <Text style={{ textAlign: 'right' }} component="small">
                Description of states are on the second page of the report*
              </Text>
            </TextContent>
          </StackItem>
          <StackItem>
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-danger-color-100"
            >
              System performance issues{' '}
            </Title>
            <TextContent>
              <Text>
                There are {conditionsCount} system performance issues
              </Text>
            </TextContent>
            <div style={{ display: 'flex' }}>
              <div className="pf-u-m-lg" style={{ width: 150, height: 150 }}>
                <ChartDonut
                  subTitle="Conditions"
                  title={conditionsCount.toString()}
                  data={performanceData}
                />
              </div>
              <TableLegend
                columns={['Conditions', '# of occurrences']}
                rows={performanceData.map(({ x, y }, index) => [
                  <TextWithColorDot
                    key={`${x}-index`}
                    color={blueColorScale[index % blueColorScale.length]}
                  >
                    {x}
                  </TextWithColorDot>,
                  y,
                ])}
              />
            </div>
          </StackItem>
          <StackItem>
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-danger-color-100"
            >
              Breakdown of occurences
            </Title>
            <Grid hasGutter>
              {[
                { ...ioConditions, title: 'Disk I/O' },
                { ...memoryConditions, title: 'RAM' },
                { ...cpuConditions, title: 'CPU' },
              ].map(({ title, under_pressure, undersized, oversized }, i) => (
                <GridItem span={4} key={title}>
                  <TableComposable isStriped variant="compact">
                    <Thead>
                      <Tr>
                        <Th colSpan={2}>
                          <TextWithColorDot color={blueColorScale[i]}>
                            {title}
                          </TextWithColorDot>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {under_pressure > 0 ? (
                        <Tr>
                          <Td>Under pressure</Td>
                          <Td>{under_pressure}</Td>
                        </Tr>
                      ) : null}
                      {undersized > 0 ? (
                        <Tr>
                          <Td>Undersized</Td>
                          <Td>{undersized}</Td>
                        </Tr>
                      ) : null}
                      {oversized > 0 ? (
                        <Tr>
                          <Td>Oversized</Td>
                          <Td>{oversized}</Td>
                        </Tr>
                      ) : null}
                    </Tbody>
                  </TableComposable>
                </GridItem>
              ))}
            </Grid>
            <TextContent>
              <Text
                className="pf-u-mt-lg"
                style={{ textAlign: 'right' }}
                component="small"
              >
                Under pressure conditions are only reported for systems where
                Kernel Pressure Stall Information is enabled. Check the
                documentation for details.*
              </Text>
              <Text
                style={{ textAlign: 'right' }}
                component="small"
              >
                Description of conditions are on the second page of the report*
              </Text>
            </TextContent>
          </StackItem>
          <StackItem>
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-danger-color-100 pf-u-mb-md"
            >
              Description of states
            </Title>
            <DescriptionList
              data={[
                {
                  title: 'Optimized',
                  description: 'Performing at an optimal level',
                  icon: (
                    <CheckCircleIcon color={global_success_color_100.value} />
                  ),
                },
                {
                  title: 'Under pressure',
                  description: 'Peaking occasionally',
                  icon: <TachometerAltIcon />,
                },
                {
                  title: 'Undersized',
                  description: 'Using more than 80% of system resources',
                  icon: (
                    <AngleDoubleDownIcon
                      color={global_danger_color_100.value}
                    />
                  ),
                },
                {
                  title: 'Oversized',
                  description: 'Using less than 20% of system resources',
                  icon: (
                    <AngleDoubleUpIcon color={global_warning_color_100.value} />
                  ),
                },
                {
                  title: 'Idling',
                  description: 'Consuming less than 5% of resources',
                  icon: <AutomationIcon />,
                },
                {
                  title: 'Waiting for data',
                  description:
                    'Data has not been received or is being processed. Initial dataprocessing takes up to 24 hours.',
                  icon: <InProgressIcon color={global_info_color_100.value} />,
                },
              ]}
            />
          </StackItem>
          <StackItem>
            <Title
              headingLevel="h2"
              size="xl"
              className="pf-u-danger-color-100 pf-u-mb-md"
            >
              Description of conditions
            </Title>
            <DescriptionList
              data={[
                {
                  title: 'CPU pressure',
                  description:
                    'CPU registered peaks higher than 20% over several one-minute time periods',
                },
                {
                  title: 'Disk I/O pressure',
                  description:
                    'Disk I/O registered peaks higher than 20% over several one-minute time periods',
                },
                {
                  title: 'RAM pressure',
                  description:
                    'RAM registered peaks higher than 20% over several one-minute time periods',
                },
              ]}
            />
          </StackItem>
        </Stack>
      </Page>
    </Fragment>
  );
};

export default RosExecutiveTemplate;
