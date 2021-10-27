import React from 'react';
import ChartBuilder, { functions } from 'react-json-chart-builder';

import { CardBody, CardHeaderMain } from '@patternfly/react-core';
import PageCard from '../Components/PageCard';
import {
  CardTitle,
  CardSubtitle,
} from '../Components/StyledPatternfly';
import Table from './Table';

const customFunctions = (data) => ({
  ...functions,
  fetchFnc: () => Promise.resolve(data),
});

const Report = ({
  tableHeaders = [],
  data = { meta: { legend: [] } },
  schema,
  name,
  description,
  ExpandRowsComponent = null,
}) => {
  /* If the table is expanded render each row in its own page */
  const getTable = () => {
    if (ExpandRowsComponent)
      return data.meta.legend.map((item) => (
        <PageCard>
          <CardBody>
            <Table
              legend={[item]}
              headers={tableHeaders}
              ExpandRowsComponent={ExpandRowsComponent}
            />
          </CardBody>
        </PageCard>
      ));
    
    return (
      <PageCard>
        <CardBody>
          <Table
            legend={data.meta.legend}
            headers={tableHeaders}
            ExpandRowsComponent={ExpandRowsComponent}
          />
        </CardBody>
      </PageCard>
    );
  }

  return (
    <>
      <PageCard>
        <CardHeaderMain>
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{description}</CardSubtitle>
        </CardHeaderMain>
        <CardBody>
          <ChartBuilder schema={schema} functions={customFunctions(data)} />
        </CardBody>
      </PageCard>
      {getTable()}
    </>
  );
};

export default Report;
