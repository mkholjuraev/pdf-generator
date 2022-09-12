// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { Fragment, FunctionComponent } from 'react';
import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Title,
  CardHeaderMain,
  Chip,
  ChipGroup as PatternflyChipGroup,
} from '@patternfly/react-core';
import styled from 'styled-components';
import { CardTitle, CardSubtitle } from '../../StyledPatternfly';
import Chart from '../../ChartHelpers/Chart';
import TotalSavings from './TotalSavings';
import TemplatesTable from './TemplatesTable';
import PageCard from '../../PageCard';
import { ReportAutomationCalculatorProps, Template } from '../types';
import { AutomationCalculatorExpandedRowMapper } from '../Standard/Components';

const calculateDelta = (a: string | number, b: string | number): number => {
  const n1 = +a;
  const n2 = +b;

  if (isNaN(n1) || isNaN(n2)) {
    return 0;
  }

  // never return less than zero ...
  if (n2 - n1 < 0) {
    return 0;
  }

  return n2 - n1;
};

const convertSecondsToHours = (seconds: string | number): number =>
  isNaN(+seconds) ? 0 : +seconds / 3600;

const mapApi = (templates: any[]) =>
  templates.map((el: []) => ({
    ...el,
    delta: 0,
    avgRunTime: 3600,
    manualCost: 0,
    automatedCost: 0,
    enabled: true,
  }));

const filterDisabled = (data: Template[]): Template[] =>
  data.filter(({ enabled }) => enabled);

const updateDeltaCost = (
  data: {
    avgRunTime: number;
    manualCost: number;
    el: Template;
    delta: number;
    automatedCost: number;
    enabled: boolean;
  }[],
  costAutomation: number,
  costManual: number
) =>
  data.map((el) => {
    const manualCost =
      convertSecondsToHours(el.avgRunTime) *
      el.successful_hosts_total *
      costManual;
    const automatedCost =
      convertSecondsToHours(el.successful_elapsed_total) * costAutomation;
    const delta = calculateDelta(automatedCost, manualCost);

    return { ...el, delta, manualCost, automatedCost };
  });

const computeTotalSavings = (data: Template[]): number =>
  data.reduce((sum, curr) => sum + curr.delta, 0);

const AutomationCalculator: FunctionComponent<
  ReportAutomationCalculatorProps
> = ({ schema, name, description, ...props }) => {
  const ChipContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
  `;

  const ChipGroup = styled(PatternflyChipGroup)`
    margin-right: 10px;
    margin-bottom: 10px;
  `;

  const getFilterChips = (arr: [string, []]) => {
    const chipLabels: Record<string, string> = {
      org_id: 'Organization',
      cluster_id: 'Cluster',
      inventory_id: 'Inventory',
      template_id: 'Template',
      task_action_id: 'Module',
      job_type: 'Job',
      status: 'Status',
    };

    if (arr[0] !== 'attributes') {
      arr[0] = arr[0].replace(`${arr[0]}`, `${chipLabels[arr[0]]}`);
      arr[1] = arr[1].filter((x) => x !== undefined && x !== null);
      return (
        <div>
          <ChipGroup categoryName={arr[0]} numChips={1000}>
            {arr[1].map((item: Record<string, string>) => (
              <Chip key={item.key} isReadOnly>
                {item.value}
              </Chip>
            ))}
          </ChipGroup>
        </div>
      );
    }
    return <Fragment></Fragment>;
  };

  // Extract the data from props later to be able to retype to the specific type.
  const data = { legend: [], meta: { count: 0 }, filters: [] };
  data.legend = props.data.meta.legend;
  data.filters = props.data.filters;
  const ExpandRowsComponent = AutomationCalculatorExpandedRowMapper(
    props.expandedRowComponent
  );

  const costManual = 50;
  const costAutomation = 20;
  const api = {
    ...data,
    items: updateDeltaCost(mapApi(data.legend), costAutomation, costManual),
  };

  const renderLeft = () => (
    <Card isPlain>
      <CardBody>
        <Chart
          schema={schema}
          data={{
            ...api,
            items: filterDisabled(api.items),
          }}
        />
      </CardBody>
    </Card>
  );

  const renderRight = () => (
    <Flex>
      <FlexItem>
        <TotalSavings
          totalSavings={computeTotalSavings(filterDisabled(api.items))}
        />
      </FlexItem>
      <FlexItem align={{ default: 'alignRight' }}>
        <Title headingLevel="h4">Preset costs</Title>
        <p>
          Manual cost of automation: $ {costManual}/hr
          <span
            style={{
              color: 'var(--pf-global--Color--dark-200)',
              fontSize: '0.8em',
              display: 'block',
            }}
          >
            (e.g. average salary of mid-level Software Engineer)
          </span>
        </p>
        <p>Automated process cost: $ {costAutomation}/hr</p>
      </FlexItem>
    </Flex>
  );

  const rowPerPage = () => {
    return api.items.map(
      (item, idx) =>
        idx % 4 === 0 && (
          <PageCard key={idx}>
            <CardBody>
              <TemplatesTable
                data={api.items.filter(
                  (item, itemId) => itemId >= idx && itemId <= idx + 3
                )}
                ExpandRowsComponent={ExpandRowsComponent}
              />
            </CardBody>
          </PageCard>
        )
    );
  };

  return (
    <Fragment>
      <PageCard>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>{description}</CardSubtitle>
        {data?.filters && (
          <ChipContainer>
            {Object.entries(data.filters).map((arr) => getFilterChips(arr))}
          </ChipContainer>
        )}
        <CardBody>
          <Grid hasGutter>
            <GridItem span={12}>{renderRight()}</GridItem>
            <GridItem span={12}>{renderLeft()}</GridItem>
          </Grid>
        </CardBody>
      </PageCard>
      {rowPerPage()}
      {props.extraData.meta.legend.length > 0 && (
        <PageCard>
          <CardHeaderMain>
            <CardTitle>{`${
              props.extraData.meta.legend.length < 100
                ? `All ${props.extraData.meta.legend.length} items`
                : `Top 100 of ${props.data?.meta?.count}`
            }`}</CardTitle>
          </CardHeaderMain>
          <CardBody>
            <TemplatesTable
              data={updateDeltaCost(
                mapApi(props.extraData.meta.legend),
                costAutomation,
                costManual
              )}
            />
          </CardBody>
        </PageCard>
      )}
    </Fragment>
  );
};

export default AutomationCalculator;
