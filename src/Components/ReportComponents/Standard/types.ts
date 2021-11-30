import { ApiReturnType } from 'react-json-chart-builder';

export type LegendEntry = Record<string, string | number>;

export interface DataType extends Omit<ApiReturnType, 'meta' | 'items'> {
  items: any[];
  meta: {
    count: number;
    legend: LegendEntry[];
  };
}
