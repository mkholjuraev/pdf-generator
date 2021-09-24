import React from 'react';
import styled from 'styled-components';

import ChartBuilder, { functions } from 'react-json-chart-builder';

import { Card, CardBody, CardHeaderMain, CardTitle } from '@patternfly/react-core';
import {
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr as PFTr,
} from '@patternfly/react-table';

import { getText, getOthersStyle } from './helpers';

const Tr = styled(PFTr)`
  & td:first-child {
    width: 0;
  }
`;

const Title = styled(CardTitle)`
  font-size: 1.5rem;
  text-align: center;
`;

const Subtitle = styled(CardTitle)`
  text-align: center;
  font-weight: 100;
  padding-bottom: 0;
`;

const customFunctions = (data) => ({
  ...functions,
  fetchFnc: () => Promise.resolve(data),
});

const Report = ({
  tableHeaders = [],
  data = { meta: {}, items: [] },
  schema,
  name,
  description
}) => (
  <Card isPlain>
    <CardHeaderMain>
      <Title>{name}</Title>
      <Subtitle>{description}</Subtitle>
    </CardHeaderMain>
    <CardBody>
      <ChartBuilder schema={schema} functions={customFunctions(data)} />
      <TableComposable aria-label="Report Table" variant={TableVariant.compact}>
        <Thead>
          <Tr>
            {tableHeaders.map(({ key, value }) => (
              <Th modifier="wrap" key={key}>{value}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.meta?.legend.map((item) => (
            <Tr key={item.id} style={getOthersStyle(item, 'id')}>
              {tableHeaders.map(({ key }) => (
                <Td key={`${item.id}-${key}`}>{getText(item, key)}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </CardBody>
  </Card>
);

export default Report;
