import React from 'react';
import ChartBuilder, { functions } from 'react-json-chart-builder';

import { CardBody, CardHeaderMain } from '@patternfly/react-core';
import { getText } from './helpers';
import PageCard from '../Components/PageCard';
import {
  CardTitle,
  CardSubtitle,
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '../Components/StyledPatternfly/';

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
        <TableComposable aria-label="Report Table" variant={TableVariant.compact}>
          <Thead>
            <Tr>
              {tableHeaders.map(({ key, value }) => (
                <Th modifier="wrap" key={key}>{value}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.meta.legend.map((item) => (
              <Tr key={item.id}>
                {tableHeaders.map(({ key }) => (
                  <Td key={`${item.id}-${key}`}>{getText(item, key)}</Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </CardBody>
    </PageCard>
  </>
);

export default Report;
