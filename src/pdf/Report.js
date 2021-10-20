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
}) => (
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
    <PageCard>
      <CardBody>
        <Table
          legend={data.meta.legend}
          headers={tableHeaders}  
        />
      </CardBody>
    </PageCard>
  </>
);

export default Report;
