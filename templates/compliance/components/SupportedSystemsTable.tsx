import React from 'react';
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';
import { complianceScoreData, fixedPercentage } from '../utils/utils';
import { SystemsTableProps } from '../utils/interfaces';

const SupportedSystemsTable: React.FC<SystemsTableProps & React.HTMLAttributes<HTMLDivElement>> = ({ systems }) => {
  return (
    <TableComposable variant='compact' isStriped>
      <Thead>
        <Tr>
          <Th modifier="wrap">System name</Th>
          <Th modifier="wrap">OS</Th>
          <Th modifier="wrap">Failed Rules</Th>
          <Th modifier="wrap">Compliance score</Th>
        </Tr>
      </Thead>
      <Tbody>
        {systems.map((systemObj, index) => (
          <Tr key={index}>
            <Td dataLabel="System name">{systemObj.name}</Td>
            <Td dataLabel='RHEL'>{`${systemObj.osMajorVersion}.${systemObj.osMinorVersion}`}</Td>
            <Td dataLabel='Failed Rules'>{complianceScoreData(systemObj.testResultProfiles).rulesFailed || ''}</Td>
            <Td dataLabel='Compliance Score'>{fixedPercentage(complianceScoreData(systemObj.testResultProfiles).score)}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};

export default SupportedSystemsTable;
