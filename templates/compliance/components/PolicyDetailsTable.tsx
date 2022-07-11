import React from 'react'
import {
  Title,
  Grid,
  GridItem,
} from '@patternfly/react-core';
import {
  ChartDonut,
} from '@patternfly/react-charts';
import { 
  TableComposable,
  Tbody,
  Tr,
  Td,
} from '@patternfly/react-table';
import { PolicyInterface } from '../utils/interfaces';
import { fixedPercentage } from '../utils/utils';

interface PolicyTableProps {
  policy: PolicyInterface,
  nonCompliantSystemsCount: number,
  compliantSystemCount: number,
  totalHostCount: number,
};

const PolicyDetailsTable: React.FC<PolicyTableProps & React.HTMLAttributes<HTMLDivElement>> = ({ policy, nonCompliantSystemsCount, totalHostCount, compliantSystemCount }) => {
  const { testResultHostCount } = policy;
  const compliantPercentage: string = testResultHostCount != 0
    ? fixedPercentage(Math.floor(100 * (compliantSystemCount / totalHostCount)))
    : '0';
  return (
    <Grid>
      <Grid>
        <GridItem span={7}>
          <Title
              headingLevel="h2"
              className="pf-u-danger-color-100 pf-u-font-size-lg pf-u-mt-sm"
            >
              Policy Details
            </Title>
            <TableComposable variant="compact">
              <Tbody>
                <Tr isStriped>
                  <Td>Policy type</Td>
                  <Td>{policy.name}</Td>
                </Tr>
                <Tr>
                  <Td>Operating System</Td>
                  <Td>{policy.osMajorVersion}</Td>
                </Tr>
                <Tr isStriped>
                  <Td>Compliance threshold</Td>
                  <Td>{policy.complianceThreshold}</Td>
                </Tr>
                <Tr>
                  <Td>Business objective</Td>
                  <Td>{policy.businessObjective || '--'}</Td>
                </Tr>
              </Tbody>
            </TableComposable>     
        </GridItem>
        <GridItem span={5}>
          <ChartDonut
            constrainToVisibleArea
            data={[
              {x: 'Compliant Systems:', y: policy.compliantHostCount},
              {x: 'Non-compliant Systems:', y: nonCompliantSystemsCount},
              {x: 'Unsupported Systems:', y: policy.unsupportedHostCount}
            ]}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            legendData={[
              {name: `${policy.compliantHostCount} compliant systems`},
              {name: `${nonCompliantSystemsCount} non-compliant systems`},
              {name: `${policy.unsupportedHostCount} unsupported systems`}
            ]}
            height={120}
            width={340}
            legendOrientation="vertical"
            legendPosition="right"
            padding={{
              bottom: 0,
              left: 0,
              right: 180,
              top: 0,
            }}
            title={compliantPercentage}
            subTitle="compliant"
          />
        </GridItem>
      </Grid>
    </Grid>
  );
};

export default PolicyDetailsTable;
