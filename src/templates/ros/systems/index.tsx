import React from 'react';
import { Title, Text, TextContent } from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';
import {
  rosSystemFilters,
  rosSystemsData,
} from '../../../server/data-access/rosDescriptor/rosData';
import { formatRowData, generateFilterText, pluralize } from '../utils';

const RosSystemsTemplate = ({
  data,
  filters,
}: {
  data: typeof rosSystemsData;
  filters: typeof rosSystemFilters;
}) => {
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
      <TextContent>
        <Text className="pf-u-font-size-xs">
          This report identified {totalSystems}{' '}
          {pluralize(totalSystems, 'RHEL system')}.
        </Text>
        <Text
          style={{ fontFamily: 'RedHatText', fontSize: '12px' }}
          component="pre"
        >
          {generateFilterText(filters)}
        </Text>
      </TextContent>
      <div className="pf-u-mt-lg">
        <TableComposable isStriped variant="compact">
          <Thead>
            <Tr>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                Name
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                OS
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                CPU utilization
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                Memory utilization
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                I/O utilization
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                Suggestions
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                State
              </Th>
              <Th modifier="wrap" style={{ fontSize: 10 }}>
                Last reported
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data?.map((system) => (
              <Tr key={system.inventory_id}>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(system.display_name, 'display_name')}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(system.os, 'os')}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(
                    system.performance_utilization.cpu,
                    'performance_utilization.cpu'
                  )}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(
                    system.performance_utilization.memory,
                    'performance_utilization.memory'
                  )}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(
                    system.performance_utilization.max_io,
                    'performance_utilization.max_io'
                  )}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(
                    system.number_of_suggestions,
                    'number_of_suggestions'
                  )}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(system.state, 'state')}
                </Td>
                <Td modifier="wrap" style={{ fontSize: 10 }}>
                  {formatRowData(system.report_date, 'report_date')}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </div>
    </div>
  );
};

export default RosSystemsTemplate;
