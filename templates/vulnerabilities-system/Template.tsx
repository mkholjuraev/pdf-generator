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

const VulnerabilitiesSystemTemplate = ({
  data,
}: {
  data: [
    {
      attributes: {
        culled_timestamp: string;
        cve_count: number;
        display_name: string;
        insights_id: string;
        inventory_id: string;
        last_evaluation: string;
        last_upload: string;
        opt_out: boolean;
        os: string;
        rules_evaluation: string;
        stale_timestamp: string;
        stale_warning_timestamp: string;
        tags: Array<string>;
        updated: string;
      };
      id: string;
      type: string;
    }
  ];
}) => (
  <div>
    <Title
      headingLevel="h1"
      className="pf-u-danger-color-100 pf-u-mb-xl pf-u-mt-xl pf-u-ml-xl"
    >
      Insights Vulnerability Systems Report
    </Title>
    <p className="pf-u-mb-xl pf-u-mt-xl pf-u-ml-xl">
      This report includes systems included in Vulnerability analysis.
    </p>
    <div className="pf-u-m-xl">
      <TableComposable isStriped variant="compact">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Operating System</Th>
            <Th>Applicable CVEs</Th>
            <Th>Last seen</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map(({ attributes, id }) => (
            <Tr key={id}>
              <Td>{attributes.display_name}</Td>
              <Td>{attributes.os}</Td>
              <Td>{attributes.cve_count}</Td>
              <Td>{attributes.last_evaluation}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    </div>
  </div>
);

export default VulnerabilitiesSystemTemplate;
