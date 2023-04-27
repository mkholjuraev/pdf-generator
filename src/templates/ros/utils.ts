import { rosSystemFilters } from '../../server/data-access/rosDescriptor/rosData';

export const pluralize = (count: number, singular: string, plural?: string) => {
  if (!plural) {
    plural = `${singular}s`;
  }

  return `${count === 1 ? singular : plural}`;
};

export const dateString = (value: Date) =>
  `${value.toUTCString().split(',')[1].slice(0, -7).trim()} UTC`;

export const formatRowData = (
  rowValue: string | number | null,
  rowKey: string
) => {
  const percentageKeys = [
    'performance_utilization.cpu',
    'performance_utilization.memory',
  ];

  rowValue = rowValue == null || rowValue === -1 ? 'N/A' : rowValue.toString();
  rowValue =
    rowValue !== 'N/A' && percentageKeys.includes(rowKey)
      ? `${rowValue}%`
      : rowValue;

  rowValue =
    rowKey === 'report_date' ? dateString(new Date(rowValue)) : rowValue;

  return rowValue;
};

export const generateFilterText = (filters: typeof rosSystemFilters) => {
  let filterText = '';
  const filterSeparatorOnLine = `\n`;
  const hasStateFilter = filters?.state?.length > 0;
  const hasNameFilter = filters?.display_name?.length > 0;
  const hasOsFilter = filters?.os?.length > 0;

  if (hasStateFilter || hasNameFilter || hasOsFilter) {
    filterText = `Filters applied${filterSeparatorOnLine}`;
    filterText = hasNameFilter
      ? filterText.concat(
          `Name: ${filters.display_name}${filterSeparatorOnLine}`
        )
      : filterText;
    filterText = hasStateFilter
      ? filterText.concat(
          `State: ${filters.state.toString()}${filterSeparatorOnLine}`
        )
      : filterText;
    filterText = hasOsFilter
      ? filterText.concat(
          `Operating System: ${filters.os
            .map((os) => `RHEL ${os}`)
            .sort()
            .toString()}`
        )
      : filterText;
  }

  return filterText;
};
