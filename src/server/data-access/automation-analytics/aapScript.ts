/* eslint-disable @typescript-eslint/no-unsafe-return */
import { PDFNotImplementedError, PDFRequestError } from '../../errors';
import reports from '../../../templates/automation-analytics/schemas';
import axios, { AxiosRequestHeaders } from 'axios';
import atob from 'atob';

type Queryparams = {
  sort_options: string | string[];
  sort_order: string | string[];
  limit: number;
  offset: number;
  include_others?: boolean;
};

type SelectOptions = {
  [key: string]: { key?: number }[];
};

const getFilterData = (
  queryParams: Queryparams,
  selectOptions: SelectOptions
) => {
  const params: { [key: string]: any[] } = {};
  const filters: SelectOptions = {};
  for (const [key, val] of Object.entries(queryParams)) {
    if (typeof val === 'object' && val?.length > 0) {
      params[key] = val?.filter((v) => v?.length > 0);
    }
  }

  for (const [key, val] of Object.entries(params)) {
    const item = val.map((x) => {
      if (selectOptions) {
        if (!isNaN(x)) {
          return selectOptions[key]?.find((obj) => obj?.key === parseInt(x));
        }
        return selectOptions[key]?.find((obj) => obj?.key === x);
      }
    });

    filters[key] = item;
  }
  return filters;
};

const getData = (
  baseURL: URL,
  headers: AxiosRequestHeaders,
  queryParams: Queryparams,
  selectOptions: SelectOptions
) => {
  const { offset, limit, sort_options, sort_order, ...rest } = queryParams;
  const url = baseURL;

  url.search = new URLSearchParams({
    sort_by:
      sort_options && sort_order ? `${sort_options}:${sort_order}` : undefined,
    offset: offset.toString(),
    limit: limit.toString(),
  }).toString();

  return axios
    .post(url.toString(), rest, { headers })
    .then((response: { data: Record<string, unknown> }) => {
      const filters = getFilterData(queryParams, selectOptions);
      return { ...response.data, filters };
    })
    .catch((err) => {
      throw new PDFRequestError(err);
    });
};

const getExtraData = (
  baseUrl: URL,
  headers: AxiosRequestHeaders,
  queryParams: Queryparams,
  dataSize: number,
  selectOptions: SelectOptions
) => {
  const maxOffset = dataSize - queryParams.limit > 100 ? 100 : dataSize;

  let promises: Promise<{
    filters: SelectOptions & { meta?: number };
    meta?: { legend: string };
  }>[] = [];
  for (let offset = 0; offset < maxOffset; offset += 25) {
    promises = [
      ...promises,
      getData(
        baseUrl,
        headers,
        {
          ...queryParams,
          offset,
          limit: 25,
          include_others: false,
        },
        selectOptions
      ),
    ];
  }

  return Promise.all(promises)
    .then((responses) =>
      responses
        .map(({ meta }) => meta?.legend)
        .reduce((a, b) => a.concat(b), [])
    )
    .catch((err) => {
      throw new PDFRequestError(err);
    });
};

const getParamsForGenerator = async (
  headers: AxiosRequestHeaders,
  {
    slug,
    schemaParams,
    dataFetchingParams: {
      queryParams,
      selectOptions,
      showExtraRows,
      apiHost,
      apiPort,
      endpointUrl,
      chartSeriesHiddenProps,
    },
    // Added by the electron server
    rhIdentity,
  }: {
    rhIdentity: string;
    slug: string;
    schemaParams: unknown;
    dataFetchingParams: {
      queryParams: Queryparams;
      selectOptions: SelectOptions;
      showExtraRows?: boolean;
      apiHost: string;
      apiPort: string;
      endpointUrl: URL;
      chartSeriesHiddenProps: unknown;
    };
  }
) => {
  if (!reports.find(({ layoutProps }) => layoutProps.slug === slug)) {
    throw new PDFNotImplementedError();
  }
  const fastApiUrl = new URL(endpointUrl, `http://${apiHost}:${apiPort}`);

  const calculateSize = (input: any) => {
    const str = JSON.stringify(input);
    const newStr = new TextEncoder().encode(str).length;
    return parseFloat((newStr / 1000).toFixed(2));
  };

  const data = await getData(fastApiUrl, headers, queryParams, selectOptions);
  const tenant = JSON.parse(atob(rhIdentity))['identity']['internal']['org_id'];
  const size = calculateSize(data);
  console.info('info', `Payload size of current page response is ${size} kb`, {
    tenant,
    slug,
    queryParams,
  });

  const extraDataLegend = showExtraRows
    ? await getExtraData(
        fastApiUrl,
        headers,
        queryParams,
        (data as unknown as { meta: { count: number } }).meta.count,
        selectOptions
      )
    : [];
  if (showExtraRows) {
    const size = calculateSize(data) + calculateSize(extraDataLegend);
    console.info('info', `Payload size of extra rows response is ${size} kb`, {
      tenant,
      slug,
      queryParams,
    });
  }

  return {
    slug,
    data,
    extraData: { meta: { legend: extraDataLegend } },
    schemaParams,
    chartSeriesHiddenProps,
  };
};

export default getParamsForGenerator;
