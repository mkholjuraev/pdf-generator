import React, { FC } from 'react';
import {
  CardBody,
  CardHeaderMain,
  Chip,
  ChipGroup,
} from '@patternfly/react-core';
import styled from 'styled-components';
import PageCard from '../../PageCard';
import { CardTitle, CardSubtitle } from '../../StyledPatternfly';
import Table from './Table';
import { ReportStandardProps } from './types';
import { expandedRowMapper } from './Components';
import Chart from '../../ChartHelpers/Chart';

const Report: FC<ReportStandardProps> = ({
  tableHeaders,
  data,
  extraData,
  schema,
  name,
  description,
  expandedRowComponent,
}) => {
  const ChipContainer = styled.div`
    display: flex;
    > * {
      &:nth-child(odd) {
        margin-right: 10px;
      }
    }
  `;

  const getFilterChips = (arr: [string, []]) => {
    const chipLabels: Record<string, string> = {
      org_id: 'Organization',
      cluster_id: 'Cluster',
      iventory_id: 'Inventory',
      template_id: 'Template',
      task_action_id: 'Module',
      job_type: 'Job',
      status: 'Status',
    };

    if (arr[0] != 'attributes') {
      arr[0] = arr[0].replace(`${arr[0]}`, `${chipLabels[arr[0]]}`);
      return (
        <div>
          <ChipGroup categoryName={arr[0]}>
            {arr[1].map((item: Record<string, string>) => (
              <Chip key={item.key}>{item.value}</Chip>
            ))}
          </ChipGroup>
        </div>
      );
    }
    return;
  };

  const ExpandRowsComponent = expandedRowMapper(expandedRowComponent);
  /* If the table is expanded render each row in its own page */

  const getTable = () => {
    if (ExpandRowsComponent)
      return (
        <>
          {data.meta.legend.map((item, idx) => (
            <PageCard key={idx}>
              <CardBody>
                <Table
                  legend={[item]}
                  headers={tableHeaders}
                  ExpandRowsComponent={ExpandRowsComponent}
                />
              </CardBody>
            </PageCard>
          ))}
          {extraData.meta.legend.length > 0 && (
            <PageCard>
              <CardHeaderMain>
                <CardTitle>{`${
                  extraData.meta.legend.length < 100
                    ? `All ${extraData.meta.legend.length} items`
                    : `Top 100 of ${data.meta.count}`
                }`}</CardTitle>
              </CardHeaderMain>
              <CardBody>
                <Table legend={extraData.meta.legend} headers={tableHeaders} />
              </CardBody>
            </PageCard>
          )}
        </>
      );

    return (
      <>
        <PageCard>
          <CardBody>
            <Table
              legend={data.meta.legend}
              headers={tableHeaders}
              ExpandRowsComponent={ExpandRowsComponent}
            />
          </CardBody>
        </PageCard>
        {extraData.meta.legend.length > 0 && (
          <PageCard>
            <CardHeaderMain>
              <CardTitle>{`${
                extraData.meta.legend.length < 100
                  ? `All ${extraData.meta.legend.length} items`
                  : `Top 100 of ${data.meta.count}`
              }`}</CardTitle>
            </CardHeaderMain>
            <CardBody>
              <Table legend={extraData.meta.legend} headers={tableHeaders} />
            </CardBody>
          </PageCard>
        )}
      </>
    );
  };

  return (
    <>
      <PageCard>
        <CardHeaderMain>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{description}</CardSubtitle>
          <ChipContainer>
            {Object.entries(data.filters).map((arr) => getFilterChips(arr))}
          </ChipContainer>
        </CardHeaderMain>
        <CardBody>
          <Chart schema={schema} data={data} />
        </CardBody>
      </PageCard>
      {getTable()}
    </>
  );
};

export default Report;
