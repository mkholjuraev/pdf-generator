import React from 'react'
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';

export interface RulesInterface {
  topRules: {
    compliant: boolean,
    identifier: string,
    refId: string,
    remediationAvailable: boolean,
    severity: string,
    systemsCount: number,
    title: string,
    _typename: string,
  }[]
}

const RulesTable: React.FC<RulesInterface & React.HTMLAttributes<HTMLDivElement>> = ({ topRules }) => {
  return (
    <TableComposable variant='compact' isStriped>
      <Thead>
        <Tr>
          <Th modifier="wrap">Rule name</Th>
          <Th modifier="wrap">ID</Th>
          <Th modifier="wrap">Severity</Th>
          <Th modifier="wrap">Failed systems</Th>
        </Tr>
      </Thead>
      <Tbody>
        {topRules.map((ruleObj, index) => (
          <Tr key={index}>
            <Td dataLabel="Rule name">{ruleObj.title}</Td>
            <Td dataLabel="ID">{ruleObj.refId}</Td>
            <Td dataLabel="Severity">{ruleObj.severity}</Td>
            <Td dataLabel="Failed systems">{ruleObj.systemsCount}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  )
}

export default RulesTable
