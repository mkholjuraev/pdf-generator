import React from 'react';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';
import { ExpandableRowContent, Td, Tr } from '@patternfly/react-table';

import Breakdown from './BreakdownChart';
import { categoryColor } from '../../../../../constants';

const TableExpandedRow = ({ item }) => {
  const totalCount = item
    ? {
        ok: item?.successful_count ?? 0,
        skipped: item?.skipped_count ?? 0,
        failed: item?.failed_count ?? 0,
        error: item?.error_count ?? 0,
      }
    : null;

  const totalTaskCount = item
    ? {
        ok: item?.average_host_task_ok_count_per_host ?? 0,
        skipped: item?.average_host_task_skipped_count_per_host ?? 0,
        changed: item?.average_host_task_changed_count_per_host ?? 0,
        failed: item?.average_host_task_failed_count_per_host ?? 0,
        unreachable: item?.average_host_task_unreachable_count_per_host ?? 0,
      }
    : null;

  const totalHostCount = item
    ? {
        ok: item?.ok_host_count ?? 0,
        skipped: item?.skipped_host_count ?? 0,
        changed: item?.changed_host_count ?? 0,
        failed: item?.failed_host_count ?? 0,
        unreachable: item?.unreachable_host_count ?? 0,
      }
    : null;

  const taskInfo = (task) => {
    return [
      {
        label: 'Task name',
        value: task.task_name,
      },
      {
        label: 'Module name',
        value: task.module_name,
      },
    ];
  };

  const expandedInfo = (item) => {
    return [
      {
        label: 'Clusters',
        value: item.total_cluster_count ?? 0,
      },
      {
        label: 'Organizations',
        value: item.total_org_count ?? 0,
      },
    ];
  };

  const jobStatusGridItem = (
    <>
      <Flex>
        <FlexItem>
          <strong>Job status</strong>
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <strong>Jobs</strong>
          {'  '}
          {item?.total_count ?? 0}
        </FlexItem>
      </Flex>
      <Breakdown
        categoryCount={totalCount}
        categoryColor={categoryColor}
        showPercent
      />
    </>
  );

  const hostStatusGridItem = (
    <>
      <Flex>
        <FlexItem>
          <strong>All Host status</strong>
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <strong>Hosts</strong>
          {'  '}
          {item?.host_count ?? 0}
        </FlexItem>
      </Flex>
      <Breakdown
        categoryCount={totalHostCount}
        categoryColor={categoryColor}
        showPercent
      />
    </>
  );

  const taskStatusGridItem = (
    <>
      <Flex>
        <FlexItem>
          <strong>All Task status</strong>
        </FlexItem>
        <FlexItem align={{ default: 'alignRight' }}>
          <strong>Tasks</strong>
          {'  '}
          {item?.host_task_count ?? 0}
        </FlexItem>
      </Flex>
      <Breakdown
        categoryCount={totalTaskCount}
        categoryColor={categoryColor}
        showPercent
      />
    </>
  );

  return (
    <Tr>
      <Td colSpan={5}>
        <ExpandableRowContent>
          <Grid>
            <GridItem span={12}>{jobStatusGridItem}</GridItem>
            <GridItem span={12}>{hostStatusGridItem}</GridItem>
            <GridItem span={12}>{taskStatusGridItem}</GridItem>
            <GridItem span={12}>
              <Flex>
                <FlexItem>
                  <p>
                    <strong>Most failed tasks</strong>
                  </p>
                  {item.most_failed_tasks &&
                    item.most_failed_tasks.map((task) =>
                      taskInfo(task).map(({ label, value }) => (
                        <p key={label}>
                          <strong>{label}:</strong> {value}
                        </p>
                      ))
                    )}
                </FlexItem>
                <FlexItem align={{ default: 'alignRight' }}>
                  {expandedInfo(item).map(({ label, value }) => (
                    <p
                      key={label}
                      style={{ textAlign: 'right', width: '100%' }}
                    >
                      <strong>{label}:</strong> {value}
                    </p>
                  ))}
                </FlexItem>
              </Flex>
            </GridItem>
          </Grid>
        </ExpandableRowContent>
      </Td>
    </Tr>
  );
};

export default TableExpandedRow;
