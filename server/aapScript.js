import { PDFNotImplementedError, PDFRequestError } from './errors';
import reports from '../src/schemas';
import axios from 'axios';

const getFilterData = (queryParams, selectOptions) => {
  let params = {};
  let filters = {};
  for (const [key, val] of Object.entries(queryParams)) {
    if (typeof val === 'object' && val.length > 0) {
      params[key] = val.filter((v) => v.length > 0);
    }
  }

  for (const [key, val] of Object.entries(params)) {
    let item = val.map((x) => {
      if (!isNaN(x)) {
        return selectOptions[key].find((obj) => obj.key === parseInt(x));
      }
      return selectOptions[key].find((obj) => obj.key === x);
    });

    filters[key] = item;
  }
  return filters;
};

const getData = (baseURL, headers, queryParams, selectOptions) => {
  const { offset, limit, sort_options, sort_order, ...rest } = queryParams;
  const url = baseURL;

  url.search = new URLSearchParams({
    sort_by:
      sort_options && sort_order ? `${sort_options}:${sort_order}` : undefined,
    offset,
    limit,
  }).toString();

  return axios
    .post(url.toString(), rest, { headers })
    .then((response) => {
      const filters = getFilterData(queryParams, selectOptions);
      return { ...response.data, filters };
    })
    .catch((err) => {
      throw new PDFRequestError(err);
    });
};

const getExtraData = (baseUrl, headers, queryParams, dataSize, selectOptions) => {
  const maxOffset = dataSize - queryParams.limit > 100 ? 100 : dataSize;

  let promises = [];
  for (let offset = 0; offset < maxOffset; offset += 25) {
    promises = [
      ...promises,
      getData(baseUrl, headers, {
        ...queryParams,
        offset,
        limit: 25,
        include_others: false,
      }),
    ];
  }

  return Promise.all(promises)
    .then((responses) =>
      responses.map(({ meta }) => meta.legend).reduce((a, b) => a.concat(b), [])
    )
    .catch((err) => {
      throw new PDFRequestError(err);
    });
};

const getParamsForGenerator = async ({
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
}) => {
  if (!reports.find(({ layoutProps }) => layoutProps.slug === slug)) {
    throw new PDFNotImplementedError();
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-rh-identity': rhIdentity,
  };

  const fastApiUrl = new URL(endpointUrl, `http://${apiHost}:${apiPort}`);

  const data = await getData(fastApiUrl, headers, queryParams, selectOptions);

  const extraDataLegend =
    showExtraRows
      ? await getExtraData(fastApiUrl, headers, queryParams, data.meta.count, selectOptions)
      : [];

  return {
    slug,
    data,
    extraData: { meta: { legend: extraDataLegend } },
    schemaParams,
    chartSeriesHiddenProps,
  };
};

export default getParamsForGenerator;
