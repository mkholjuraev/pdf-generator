import React, { FunctionComponent } from 'react';

import {
  TableComposable,
  TableVariant,
  Tbody,
  Th,
  Thead,
  Tr,
} from '../../../StyledPatternfly/Table';
import { Template } from '../types';
import Row from './Row';

interface Props {
  data: Template[];
}

const TopTemplates: FunctionComponent<Props> = ({ data = [] }) => (
  <TableComposable aria-label="ROI Table" variant={TableVariant.compact}>
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Time</Th>
        <Th>Savings</Th>
        <Th>Presence in the chart</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((template) => (
        <Row key={template.id} template={template} />
      ))}
    </Tbody>
  </TableComposable>
);

export default TopTemplates;
