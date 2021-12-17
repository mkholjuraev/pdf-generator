import { PDFNotImplementedError, PDFRequestError } from './errors';
import reports from '../src/schemas';
import axios from 'axios';

const getData = (baseURL, headers, queryParams) => {
  const { offset, limit, ...rest } = queryParams;
  const url = baseURL;

  const urlQuery = new URLSearchParams(url.search);
  urlQuery.set('offset', offset);
  urlQuery.set('limit', limit);
  url.search = urlQuery.toString();

  return axios
    .post(url.toString(), rest, { headers })
    .then((response) => response.data)
    .catch((err) => {
      throw new PDFRequestError(err);
    });
};

const getExtraData = (baseUrl, headers, queryParams, dataSize) => {
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
  label,
  y,
  x_tick_format: xTickFormat,
  chartType,
  // For data fetching
  queryParams,
  showExtraRows,
  apiHost,
  apiPort,
  endpointUrl,
  // Added by the pdf server
  rhIdentity,
}) => {
  if (!reports.find(({ layoutProps }) => layoutProps.slug === slug)) {
    throw new PDFNotImplementedError();
  }

  const headers = {
    'Content-Type': 'application/json',
    'x-rh-identity': rhIdentity,
  };

  const { sort_options, sort_order, ...restQuery } = queryParams;
  const fastApiUrl = new URL(endpointUrl, `http://${apiHost}:${apiPort}`);
  fastApiUrl.search = new URLSearchParams({ sort_options, sort_order });

  const data = await getData(fastApiUrl, headers, restQuery);

  const extraDataLegend =
    showExtraRows === 'True'
      ? await getExtraData(fastApiUrl, headers, restQuery, data.meta.count)
      : [];

  return {
    slug,
    data,
    extraData: { meta: { legend: extraDataLegend } },
    schemaParams: {
      label,
      y,
      xTickFormat,
      chartType,
    },
  };
};

export default getParamsForGenerator;
