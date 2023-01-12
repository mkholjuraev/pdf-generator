import React, { Fragment } from 'react';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';
import { ExpandableRowContent, Td, Tr } from '@patternfly/react-table';

import Breakdown from './BreakdownChart';
import { categoryColor } from '../../../../../constants';

type CategoryCount = { [key: string]: number };

const TableExpandedRow = ({
  item,
}: {
  item: {
    successful_count?: number;
    skipped_count?: number;
    failed_count?: number;
    error_count?: number;
    average_host_task_ok_count_per_host?: number;
    average_host_task_skipped_count_per_host?: number;
    average_host_task_changed_count_per_host?: number;
    average_host_task_failed_count_per_host?: number;
    average_host_task_unreachable_count_per_host?: number;
    ok_host_count?: number;
    skipped_host_count?: number;
    changed_host_count?: number;
    failed_host_count?: number;
    unreachable_host_count?: number;
    total_count?: number;
    host_count?: number;
    host_task_count?: number;
    most_failed_tasks?: {
      label: string;
      value: string;
      task_name: string;
      module_name: string;
    }[];
    total_cluster_count?: number;
    total_org_count?: number;
  };
}) => {
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

  const taskInfo = (task: { task_name: string; module_name: string }) => {
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

  const expandedInfo = (item: {
    total_cluster_count?: number;
    total_org_count?: number;
  }) => {
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
    <Fragment>
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
        categoryCount={totalCount as CategoryCount}
        categoryColor={categoryColor}
        showPercent
      />
    </Fragment>
  );

  const hostStatusGridItem = (
    <Fragment>
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
        categoryCount={totalHostCount as CategoryCount}
        categoryColor={categoryColor}
        showPercent
      />
    </Fragment>
  );

  const taskStatusGridItem = (
    <Fragment>
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
        categoryCount={totalTaskCount as CategoryCount}
        categoryColor={categoryColor}
        showPercent
      />
    </Fragment>
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
                {item.most_failed_tasks && item.most_failed_tasks.length > 0 && (
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
                )}
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
