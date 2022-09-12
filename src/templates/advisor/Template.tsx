import {
  Text,
  TextContent,
  Title,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import { ChartPie, ChartThemeColor } from '@patternfly/react-charts';
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';
import Page from '../common/page';
import TopRecommendations from './Components/top-recommendations';
import React from 'react';

const AdvisorReportTemplate = ({
  data,
}: {
  data: [
    {
      total: number;
      total_risk: {
        [key: string]: number;
      };
      category: {
        Availability: number;
        Performance: number;
        Security: number;
        Stability: number;
      };
    },
    {
      total: number;
      total_risk: {
        [key: string]: number;
      };
      category: {
        Availability: number;
        Performance: number;
        Security: number;
        Stability: number;
      };
    },
    {
      meta: {
        count: number;
      };
      links: {
        first: string;
        next: string;
        previous: string;
        last: string;
      };
      data: {
        rule_id: string;
        created_at: string;
        updated_at: string;
        description: string;
        active: boolean;
        category: {
          id: number;
          name: string;
        };
        impact: {
          name: string;
          impact: number;
        };
        likelihood: number;
        node_id: string;
        tags: string;
        playbook_count: number;
        reboot_required: boolean;
        publish_date: string;
        summary: string;
        generic: string;
        reason: string;
        more_info: string;
        impacted_systems_count: number;
        reports_shown: boolean;
        rule_status: string;
        resolution_set: {
          system_type: number;
          resolution: string;
          resolution_risk: {
            name: string;
            risk: number;
          };
          has_playbook: boolean;
        }[];
        total_risk: number;
        hosts_acked_count: number;
        rating: number;
        pathway: {
          name: string;
          component: string;
          resolution_risk: {
            name: string;
            risk: number;
          };
        };
      }[];
    }
  ];
}) => {
  const [systems, reports, topActiveRec] = data;
  return (
    <React.Fragment>
      <Page>
        <Title
          headingLevel="h2"
          className="pf-u-danger-color-200 pf-u-font-size-2xl pf-u-mb-xs"
        >
          Red Hat Insights
        </Title>
        <Title
          headingLevel="h1"
          className="pf-u-danger-color-200 pf-u-font-size-4xl pf-u-mb-2xl"
        >
          Executive report: Advisor
        </Title>
        <TextContent>
          <Text className="pf-u-mb-xl">
            This report is an executive summary of recommendations that may
            impact your Red Hat Enterprise Linux servers. Red Hat Advisor
            service is analyzing {systems.total.toLocaleString('en')} RHEL
            systems and has identified {reports.total.toLocaleString('en')}{' '}
            Risks that impact 1 or more of these systems.
          </Text>
        </TextContent>
        <Title
          headingLevel="h2"
          className="pf-u-danger-color-100 pf-u-font-size-md pf-u-mb-md"
        >
          Identified recommendations by severity
        </Title>
        <Grid className="pf-u-mb-xl" hasGutter>
          <GridItem span={6}>
            <TableComposable variant="compact" borders={false} isStriped>
              <Thead>
                <Tr>
                  <Th modifier="wrap">Severity</Th>
                  <Th modifier="wrap">Number of recommendations</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Critical</Td>
                  <Td>
                    {reports.total_risk['4']}
                    {' ('}
                    {((reports.total_risk['4'] / reports.total) * 100).toFixed(
                      0
                    )}
                    {'% of total)'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Important</Td>
                  <Td>
                    {reports.total_risk['3']}
                    {' ('}
                    {((reports.total_risk['3'] / reports.total) * 100).toFixed(
                      0
                    )}
                    {'% of total)'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Moderate</Td>
                  <Td>
                    {reports.total_risk['2']}
                    {' ('}
                    {((reports.total_risk['2'] / reports.total) * 100).toFixed(
                      0
                    )}
                    {'% of total)'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Low</Td>
                  <Td>
                    {reports.total_risk['1']}
                    {' ('}
                    {((reports.total_risk['1'] / reports.total) * 100).toFixed(
                      0
                    )}
                    {'% of total)'}
                  </Td>
                </Tr>
              </Tbody>
            </TableComposable>
          </GridItem>
          <GridItem span={6}>
            <ChartPie
              constrainToVisibleArea={true}
              data={[
                {
                  x: 'Critical',
                  y: reports.total_risk['4'],
                },
                {
                  x: 'Important',
                  y: reports.total_risk['3'],
                },
                {
                  x: 'Moderate',
                  y: reports.total_risk['2'],
                },
                {
                  x: 'Low',
                  y: reports.total_risk['1'],
                },
              ]}
              height={230}
              legendData={[
                {
                  name: `Critical: ${(
                    (reports.total_risk['4'] / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
                {
                  name: `Important: ${(
                    (reports.total_risk['3'] / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
                {
                  name: `Moderate: ${(
                    (reports.total_risk['2'] / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
                {
                  name: `Low: ${(
                    (reports.total_risk['1'] / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
              ]}
              legendOrientation="vertical"
              legendPosition="right"
              padding={{
                bottom: 40,
                left: 20,
                right: 150,
                top: 40,
              }}
              themeColor={ChartThemeColor.multi}
              width={350}
            />
          </GridItem>
        </Grid>
        <Title
          headingLevel="h2"
          className="pf-u-danger-color-100 pf-u-font-size-md pf-u-mb-md"
        >
          Recently identified recommendations by category
        </Title>
        <Grid className="pf-u-mb-xl" hasGutter>
          <GridItem span={6}>
            <TableComposable variant="compact" borders={false} isStriped>
              <Thead>
                <Tr>
                  <Th modifier="wrap">Category</Th>
                  <Th modifier="wrap">Number of recommendations</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Availability</Td>
                  <Td>
                    {reports.category.Availability}
                    {' ('}
                    {(
                      (reports.category.Availability / reports.total) *
                      100
                    ).toFixed(0)}
                    {'% of total)'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Performance</Td>
                  <Td>
                    {reports.category.Performance}
                    {' ('}
                    {(
                      (reports.category.Performance / reports.total) *
                      100
                    ).toFixed(0)}
                    {'% of total)'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Security</Td>
                  <Td>
                    {reports.category.Security}
                    {' ('}
                    {(
                      (reports.category.Security / reports.total) *
                      100
                    ).toFixed(0)}
                    {'% of total)'}
                  </Td>
                </Tr>
                <Tr>
                  <Td>Stability</Td>
                  <Td>
                    {reports.category.Stability}
                    {' ('}
                    {(
                      (reports.category.Stability / reports.total) *
                      100
                    ).toFixed(0)}
                    {'% of total)'}
                  </Td>
                </Tr>
              </Tbody>
            </TableComposable>
          </GridItem>
          <GridItem span={6}>
            <ChartPie
              constrainToVisibleArea={true}
              data={[
                {
                  x: 'Availability',
                  y: reports.category.Availability,
                },
                {
                  x: 'Performance',
                  y: reports.category.Performance,
                },
                {
                  x: 'Security',
                  y: reports.category.Security,
                },
                {
                  x: 'Stability',
                  y: reports.category.Stability,
                },
              ]}
              height={230}
              legendData={[
                {
                  name: `Availability: ${(
                    (reports.category.Availability / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
                {
                  name: `Performance: ${(
                    (reports.category.Performance / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
                {
                  name: `Security: ${(
                    (reports.category.Security / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
                {
                  name: `Stability: ${(
                    (reports.category.Stability / reports.total) *
                    100
                  ).toFixed(0)}%`,
                },
              ]}
              legendOrientation="vertical"
              legendPosition="right"
              padding={{
                bottom: 40,
                left: 20,
                right: 150,
                top: 40,
              }}
              themeColor={ChartThemeColor.blue}
              width={350}
            />
          </GridItem>
        </Grid>
      </Page>
      <Page>
        <Title
          headingLevel="h2"
          className="pf-u-danger-color-100 pf-u-font-size-md pf-u-mb-md"
        >
          Top 3 recommendations in your infrastructure
        </Title>
        <TopRecommendations {...topActiveRec} />
      </Page>
    </React.Fragment>
  );
};

export default AdvisorReportTemplate;
