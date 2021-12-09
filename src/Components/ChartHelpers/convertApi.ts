import { v4 as uuid } from 'uuid';
import { ChartData, ChartDataSerie } from 'react-json-chart-builder';
import { ApiReturnType, ApiType, GroupedApi } from './types';

export const convertGroupedByData = (data: GroupedApi): ChartDataSerie[] => {
  const { dates } = data;
  const items: ChartDataSerie[] = [];
  dates.forEach((el) => {
    // Add items to the correct serie
    el.items.forEach((item, idx) => {
      if (!items[idx]) {
        items[idx] = {
          serie: [],
          hidden: false,
          name: uuid(),
        };
      }
      items[idx].serie.push({
        created_date: el.date,
        ...item,
      });
    });
  });
  return items;
};

export const convertApiToData = (result: ApiReturnType): ChartData => {
  const data: ChartData = {
    series: [],
    legend: [],
  };

  if ('dates' in result) {
    result.type = ApiType.grouped;
  } else {
    result.type = ApiType.nonGrouped;
  }

  switch (result.type) {
    case ApiType.grouped:
      data.series = convertGroupedByData(result);
      break;
    case ApiType.nonGrouped:
      data.series = [
        {
          serie: result.items,
          hidden: false,
          name: uuid(),
        },
      ];
      break;
  }

  // No need to remap the leged with names since the pdf is not interactive.
  data.legend = result.meta?.legend ?? [];
  return data;
};
