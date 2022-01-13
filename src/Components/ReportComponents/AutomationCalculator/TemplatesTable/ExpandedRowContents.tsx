import React, { FunctionComponent } from 'react';
import { Td } from '@patternfly/react-table';
import {
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
} from '@patternfly/react-core';
import { Template } from '../types';

interface Props {
  item: Template;
}

const ExpandedRowContents: FunctionComponent<Props> = ({ item }) => (
  <Td colSpan={5}>
    <DescriptionList columnModifier={{ default: '3Col' }}>
      <DescriptionListGroup>
        <DescriptionListTerm>ID</DescriptionListTerm>
        <DescriptionListDescription>{item.id}</DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Elapsed</DescriptionListTerm>
        <DescriptionListDescription>
          {item.elapsed} seconds
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Host count</DescriptionListTerm>
        <DescriptionListDescription>
          {item.host_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Total count</DescriptionListTerm>
        <DescriptionListDescription>
          {item.total_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Total org count</DescriptionListTerm>
        <DescriptionListDescription>
          {item.total_org_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Total cluster count</DescriptionListTerm>
        <DescriptionListDescription>
          {item.total_cluster_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
      <DescriptionListGroup>
        <DescriptionListTerm>Total inventory count</DescriptionListTerm>
        <DescriptionListDescription>
          {item.total_inventory_count}
        </DescriptionListDescription>
      </DescriptionListGroup>
    </DescriptionList>
  </Td>
);

export default ExpandedRowContents;
