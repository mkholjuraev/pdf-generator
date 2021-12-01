import React, { FC } from 'react';
import ChartBuilder, { functions } from 'react-json-chart-builder';

import { CardBody, CardHeaderMain } from '@patternfly/react-core';
import PageCard from '../../PageCard';
import { CardTitle, CardSubtitle } from '../../StyledPatternfly';
import Table from './Table';
import { ComponentProps } from '../types';
import { convertApiToData } from '../../ChartHelpers/convertApi';
import { ApiReturnType } from '../../ChartHelpers/types';

interface Props extends Omit<ComponentProps, 'data' | 'extraData'> {
  data: ApiReturnType;
  extraData?: ApiReturnType;
}

const Report: FC<Props> = ({
  tableHeaders = [],
  data,
  extraData,
  schema,
  name,
  description,
  ExpandRowsComponent = undefined,
}) => {
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
          {extraData && (
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
        {extraData && (
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
          <ChartBuilder
            schema={schema}
            functions={functions}
            dataState={[
              convertApiToData(data),
              () => {
                return;
              },
            ]}
          />
        </CardBody>
      </PageCard>
      {getTable()}
    </>
  );
};

export default Report;
