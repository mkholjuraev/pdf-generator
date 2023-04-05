import React from 'react';
import { Title } from '@patternfly/react-core';
import {
  TableComposable,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
} from '@patternfly/react-table';
import { rosSystemsData } from '../../../server/data-access/rosDescriptor/rosData';

const RosSystemsTemplate = ({ data }: { data: typeof rosSystemsData }) => {
  const {
    meta: { count: totalSystems },
  } = data;

  return (
    <div>
      <Title
        headingLevel="h1"
        className="pf-u-danger-color-100 pf-u-mb-xl pf-u-mt-xl pf-u-ml-xl"
      >
        Insights Resource Optimization Systems Report
      </Title>
      <p className="pf-u-mb-xl pf-u-mt-xl pf-u-ml-xl">
        This report identified {totalSystems}{' '}
        {totalSystems > 1 ? 'RHEL systems' : 'RHEL system'}.
      </p>
      <div className="pf-u-m-xl">
        <TableComposable isStriped variant="compact">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>OS</Th>
              <Th>CPU utilization</Th>
              <Th>Memory utilization</Th>
              <Th>I/O utilization</Th>
              <Th>Suggestions</Th>
              <Th>State</Th>
              <Th>Last reported</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.data?.map((system) => (
              <Tr key={system.inventory_id}>
                <Td>{system.display_name}</Td>
                <Td>{system.os}</Td>
                <Td>{system.performance_utilization.cpu}</Td>
                <Td>{system.performance_utilization.memory}</Td>
                <Td>{system.performance_utilization.max_io}</Td>
                <Td>{system.number_of_suggestions}</Td>
                <Td>{system.state}</Td>
                <Td>{system.report_date}</Td>
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </div>
    </div>
  );
};

export default RosSystemsTemplate;
