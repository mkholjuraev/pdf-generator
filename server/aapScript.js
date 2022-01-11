import { PDFNotImplementedError, PDFRequestError } from './errors';
import reports from '../src/schemas';
import axios from 'axios';

const getData = (baseURL, headers, queryParams) => {
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
  schemaParams,
  dataFetchingParams: {
    queryParams,
    showExtraRows,
    apiHost,
    apiPort,
    endpointUrl,
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

  const data = await getData(fastApiUrl, headers, queryParams);

  const extraDataLegend = showExtraRows
    ? await getExtraData(fastApiUrl, headers, queryParams, data.meta.count)
    : [];

  return {
    slug,
    data,
    extraData: { meta: { legend: extraDataLegend } },
    schemaParams,
  };
};

export default getParamsForGenerator;
