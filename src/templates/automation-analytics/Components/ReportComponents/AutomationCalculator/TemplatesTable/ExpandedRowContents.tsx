import React, { FunctionComponent } from 'react';
import { Td } from '@patternfly/react-table';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from '@patternfly/react-core';
import { Template } from '../../types';

interface Props {
  item: Template;
}

const ExpandedRowContents: FunctionComponent<Props> = ({ item }) => (
  <Td colSpan={5}>
    <DescriptionList isHorizontal isCompact isAutoFit>
      <DescriptionListGroup>
        <DescriptionListTerm style={{ marginLeft: '2em' }}>
          ID
        </DescriptionListTerm>
        <DescriptionListDescription style={{ marginLeft: '4em' }}>
          {item.id}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Elapsed</DescriptionListTerm>
        <DescriptionListDescription
          style={{ marginLeft: '3em', whiteSpace: 'nowrap' }}
        >
          {item.elapsed} seconds
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm
          style={{ whiteSpace: 'nowrap', marginLeft: '4em' }}
        >
          Host count
        </DescriptionListTerm>
        <DescriptionListDescription
          style={{ marginLeft: '8em', whiteSpace: 'nowrap' }}
        >
          {item.host_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm
          style={{ marginLeft: '4em', whiteSpace: 'nowrap' }}
        >
          Total count
        </DescriptionListTerm>
        <DescriptionListDescription style={{ marginLeft: '5em' }}>
          {item.total_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm
          style={{ marginLeft: '2em', whiteSpace: 'nowrap' }}
        >
          Total org count
        </DescriptionListTerm>
        <DescriptionListDescription style={{ marginLeft: '4em' }}>
          {item.total_org_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm style={{ whiteSpace: 'nowrap' }}>
          Total cluster count
        </DescriptionListTerm>
        <DescriptionListDescription style={{ marginLeft: '3em' }}>
          {item.total_cluster_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm
          style={{ whiteSpace: 'nowrap', marginLeft: '4em' }}
        >
          Total inventory count
        </DescriptionListTerm>
        <DescriptionListDescription style={{ marginLeft: '8em' }}>
          {item.total_inventory_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  </Td>
);

export type AutomationCalculatorExpandRowsComponentType =
  typeof ExpandedRowContents;

export default ExpandedRowContents;
