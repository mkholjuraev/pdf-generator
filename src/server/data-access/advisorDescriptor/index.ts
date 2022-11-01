import { ServiceCallFunction, ServiceDescriptor } from '../call-service';
import ServiceNames from '../../../common/service-names';
import config from '../../../common/config';
import advisorData from './advisorData';
import axios, { AxiosRequestHeaders } from 'axios';

const BASE_URL = `http://${config.endpoints['advisor-backend']?.hostname}:${config.endpoints['advisor-backend']?.port}/api/insights/v1`;
const STATS_SYSTEMS_FETCH_URL = `${BASE_URL}/stats/systems/`;
const STATS_REPORTS_FETCH_URL = `${BASE_URL}/stats/reports/`;
const RULES_FETCH_URL = `${BASE_URL}/rule/`;

const getAdvisorData = async (headers: AxiosRequestHeaders) => {
  const [
    { data: statsSystems },
    { data: statsReports },
    { data: topActiveRec },
  ] = await Promise.all([
    axios.get(STATS_SYSTEMS_FETCH_URL, { headers }),
    axios.get(STATS_REPORTS_FETCH_URL, { headers }),
    axios.get(RULES_FETCH_URL, {
      headers,
      params: {
        limit: 3,
        sort: '-total_risk,-impacted_count',
        impacting: true,
      },
    }),
  ]);

  return [
    {
      statsReports,
      statsSystems,
      topActiveRec,
    },
  ];
};

const getMock: ServiceCallFunction = () =>
  Promise.resolve({ data: advisorData });
const responseProcessor = (data: typeof advisorData) => data;

const advisorDescriptor: ServiceDescriptor = {
  templates: {
    advisor: {
      service: ServiceNames.advisor,
      responseProcessor,
      path: '/',
      request: getAdvisorData,
      mock: getMock,
    },
  },
};

export default advisorDescriptor;
