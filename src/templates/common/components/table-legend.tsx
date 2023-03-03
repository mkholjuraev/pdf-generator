import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@patternfly/react-table';
import React, { ReactNode } from 'react';

export type TableLegendProps = {
  columns: ReactNode[];
  rows: ReactNode[][];
};

const TableLegend: React.FC<TableLegendProps> = ({ rows, columns }) => (
  <TableComposable isStriped variant="compact">
    <Thead>
      <Tr>
        {columns.map((column, index) => (
          <Th key={index}>{column}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {rows.map((row, i) => (
        <Tr key={i}>
          {row.map((item, index) => (
            <Td className="pf-u-pt-xs pf-u-pb-xs" key={index}>
              {item}
            </Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </TableComposable>
);

export default TableLegend;
