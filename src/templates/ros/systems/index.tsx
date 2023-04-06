import React from 'react';
import { Title, Text } from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';
import { rosSystemsData } from '../../../server/data-access/rosDescriptor/rosData';
import { pluralize } from '../executive-report';

const formatRowData = (rowValue: string | number | null, rowKey: string) => {
    const percentageKeys = ['performance_utilization.cpu', 'performance_utilization.memory'];
    
    rowValue = (rowValue == null || rowValue === -1) ?  'N/A' : rowValue.toString();
    rowValue = (rowValue !== 'N/A' && percentageKeys.includes(rowKey)) ? `${rowValue}%` : rowValue;

    return rowValue;
}


const RosSystemsTemplate = ({ data }: { data: typeof rosSystemsData }) => {
  const { 
    meta: { count: totalSystems },
  } = data;

  return (
    <div>
      <Title
        headingLevel="h1"
        className="pf-u-danger-color-100 pf-u-font-size-4xl pf-u-py-lg"
      >
        Insights Resource Optimization Systems Report
      </Title>
      <Text className="pf-u-py-sm">
        This report identified {totalSystems} {pluralize(totalSystems, 'RHEL system')}.
      </Text>
      <div className="pf-u-mt-lg">
        <TableComposable isStriped variant="compact">
          <Thead>
            <Tr>
              <Th modifier="wrap" style={{ fontSize: 12}}>Name</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>OS</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>CPU utilization</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>Memory utilization</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>I/O utilization</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>Suggestions</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>State</Th>
              <Th modifier="wrap" style={{ fontSize: 12}}>Last reported</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data?.map((system) => (
              <Tr key={system.inventory_id}>
                <Td>{formatRowData(system.display_name, 'display_name')}</Td>
                <Td>{formatRowData(system.os, 'os')}</Td>
                <Td>{formatRowData(system.performance_utilization.cpu, 'performance_utilization.cpu')}</Td>
                <Td>{formatRowData(system.performance_utilization.memory, 'performance_utilization.memory')}</Td>
                <Td>{formatRowData(system.performance_utilization.max_io, 'performance_utilization.max_io')}</Td>
                <Td>{formatRowData(system.number_of_suggestions, 'number_of_suggestions')}</Td>
                <Td>{formatRowData(system.state, 'state')}</Td>
                <Td>{formatRowData(system.report_date, 'report_date')}</Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </div>
    </div>
  );
};

export default RosSystemsTemplate;
