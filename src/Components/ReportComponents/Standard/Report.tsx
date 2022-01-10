import React, { FC } from 'react';
import { CardBody, CardHeaderMain } from '@patternfly/react-core';
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
                  // ExpandRowsComponent={ExpandRowsComponent}
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
