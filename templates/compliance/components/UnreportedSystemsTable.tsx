import React from 'react'
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';
import { SystemsTableProps } from '../utils/interfaces';

const UnreportedSystemsTable: React.FC<SystemsTableProps & React.HTMLAttributes<HTMLDivElement>> = ({ systems }) => {
  return (
    <TableComposable variant='compact' isStriped>
      <Thead>
        <Tr>
          <Th>System name</Th>
          <Th>OS</Th>
        </Tr>
      </Thead>
      <Tbody>
        {systems.map((systemObj, index) => (
          <Tr key={index}>
            <Td dataLabel="System name">{systemObj.name}</Td>
            <Td dataLabel='RHEL'>{`${systemObj.osMajorVersion}.${systemObj.osMinorVersion}`}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
}

export default UnreportedSystemsTable
