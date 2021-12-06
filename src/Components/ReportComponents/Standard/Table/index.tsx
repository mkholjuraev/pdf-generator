import React, { FC } from 'react';
import {
  TableComposable,
  TableVariant,
  Tbody,
  Th,
  Thead,
  Tr,
} from '../../../StyledPatternfly';
import { ExpandRowsComponentType, LegendEntry, TableHeaders } from '../types';

import TableRow from './TableRow';

interface Props {
  legend: LegendEntry[];
  headers: TableHeaders;
  ExpandRowsComponent?: ExpandRowsComponentType;
}

const ReportTable: FC<Props> = ({ legend, headers, ExpandRowsComponent }) => (
  <TableComposable aria-label="Report Table" variant={TableVariant.compact}>
    <Thead>
      <Tr>
        {headers.map(({ key, value }) => (
          <Th key={key} data-testid={key}>
            {value}
          </Th>
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
