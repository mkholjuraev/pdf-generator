import React from 'react';
import {
  TableComposable,
  TableVariant,
  Tbody,
  Th,
  Thead,
  Tr,
} from '../../Components/StyledPatternfly/';

import TableRow from './TableRow';

const ReportTable = ({
  legend,
  headers,
  ExpandRowsComponent = null,
}) => (
  <TableComposable aria-label="Report Table" variant={TableVariant.compact}>
    <Thead>
      <Tr>
        {ExpandRowsComponent && <Th />}
        {headers.map(({ key, value }) => (
          <Th key={key} data-testid={key}>{value}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {legend.map((entry) => (
        <TableRow
          key={entry.id}
          legendEntry={entry}
          headers={headers}
          ExpandRowsComponent={ExpandRowsComponent}
        />
      ))}
    </Tbody>
  </TableComposable>
);

export default ReportTable;
