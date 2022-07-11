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

interface UnsupportedSystemsProps extends SystemsTableProps{
  expectedSSGVersion: string,
};

const UnsupportedSystemsTable: React.FC<UnsupportedSystemsProps & React.HTMLAttributes<HTMLDivElement>> = ({ systems, expectedSSGVersion }) => {
  return (
    <TableComposable variant='compact' isStriped>
      <Thead>
        <Tr>
          <Th modifier="wrap">System name</Th>
          <Th modifier="wrap">OS</Th>
          <Th modifier="wrap">Running SSG version</Th>
          <Th modifier="wrap">Expected SSG version</Th>
        </Tr>
      </Thead>
      <Tbody>
        {systems.map((systemObj, index) => (
          <Tr key={index}>
            <Td dataLabel="System name">{systemObj.name}</Td>
            <Td dataLabel="OS">{`${systemObj.osMajorVersion}.${systemObj.osMinorVersion}`}</Td>
            <Td dataLabel="Running SSG version">{systemObj.testResultProfiles[0].ssgVersion}</Td>
            <Td dataLabel="Expected SSG version">{`${expectedSSGVersion}`}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};

export default UnsupportedSystemsTable;
