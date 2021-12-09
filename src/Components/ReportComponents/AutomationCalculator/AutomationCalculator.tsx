import React, { FunctionComponent } from 'react';

import {
  Card,
  CardBody,
  Grid,
  GridItem,
  Flex,
  FlexItem,
  Title,
} from '@patternfly/react-core';

import { CardTitle, CardSubtitle } from '../../StyledPatternfly';

// Chart
import Chart from '../../ChartHelpers/Chart';

// Local imports
import TotalSavings from './TotalSavings';
import TemplatesTable from './TemplatesTable';

import PageCard from '../../PageCard';

import {
  ReportAutomationCalculatorDataType,
  ReportAutomationCalculatorProps,
  Template,
} from './types';
import { ApiReturnType } from '../../ChartHelpers/types';

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

const mapApi = (items: Template[]) =>
  items.map((el) => ({
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
  data: Template[],
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
  // Extract the data from props later to be able to retype to the specific type.
  const data = props.data as unknown as ReportAutomationCalculatorDataType;

  const costManual = 50;
  const costAutomation = 20;
  const api = {
    ...data,
    items: updateDeltaCost(mapApi(data.items), costAutomation, costManual),
  };

  const renderLeft = () => (
    <Card isPlain>
      <CardBody>
        <Chart
          schema={schema}
          data={
            {
              ...api,
              items: filterDisabled(api.items),
            } as unknown as ApiReturnType
          }
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

  return (
    <>
      <PageCard>
        <CardTitle>{name}</CardTitle>
        <CardSubtitle>{description}</CardSubtitle>
        <CardBody>
          <Grid hasGutter>
            <GridItem span={12}>{renderRight()}</GridItem>
            <GridItem span={12}>{renderLeft()}</GridItem>
          </Grid>
        </CardBody>
      </PageCard>
      <PageCard>
        <TemplatesTable data={api.items} />
      </PageCard>
    </>
  );
};

export default AutomationCalculator;
