import { ChartLegendEntry } from 'react-json-chart-builder';

export enum ApiType {
  nonGrouped = 'nonGrouped',
  grouped = 'grouped',
}

export interface NonGroupedApi {
  type?: ApiType.nonGrouped;
  items: Record<string, string | number>[];
  meta: {
    legend: ChartLegendEntry[];
    count: number;
  };
  filters: Record<string, boolean | string[] | number>;
}

export interface GroupedApi {
  type?: ApiType.grouped;
  dates: {
    date: string;
    items: Record<string, string | number>[];
  }[];
  meta: {
    legend: ChartLegendEntry[];
    count: number;
  };
  filters: Record<string, boolean | string | string[] | number[]>;
}

export type ApiReturnType = NonGroupedApi | GroupedApi;
