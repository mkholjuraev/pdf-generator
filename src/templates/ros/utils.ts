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
