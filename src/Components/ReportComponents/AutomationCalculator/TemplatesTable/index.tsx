import React, { FunctionComponent } from 'react';

import {
  TableComposable,
  TableVariant,
  Tbody,
  Th,
  Thead,
  Tr,
} from '../../../StyledPatternfly/Table';
import { AutomationCalculatorExpandRowsComponentType } from '../../types';
import { Template } from '../types';
import Row from './Row';

interface Props {
  data: Template[];
  ExpandRowsComponent?: AutomationCalculatorExpandRowsComponentType;
  showHeader?: boolean;
}

const TopTemplates: FunctionComponent<Props> = ({
  data = [],
  ExpandRowsComponent,
  showHeader,
}) => (
  <TableComposable aria-label="ROI Table" variant={TableVariant.compact}>
    {showHeader ? (
      <>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Time</Th>
            <Th>Savings</Th>
            <Th>Presence in the chart</Th>
          </Tr>
        </Thead>
        <Tbody style={{ borderBottomWidth: '0px' }}>
          {data.map((template) => (
            <Row
              key={template.id}
              template={template}
              ExpandRowsComponent={ExpandRowsComponent}
            />
          ))}
        </Tbody>
      </>
    ) : (
      <Tbody style={{ borderTopWidth: '0px', borderBottomWidth: '0px' }}>
        {data.map((template) => (
          <Row
            key={template.id}
            template={template}
            ExpandRowsComponent={ExpandRowsComponent}
          />
        ))}
      </Tbody>
    )}
  </TableComposable>
);

export default TopTemplates;
