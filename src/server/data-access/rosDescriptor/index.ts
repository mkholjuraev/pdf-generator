import { ServiceCallFunction, ServiceDescriptor } from '../call-service';
import ServiceNames from '../../../common/service-names';
import config from '../../../common/config';
import { rosExecutiveData, rosSystemsData } from './rosData';
import axios, { AxiosRequestHeaders } from 'axios';

const BASE_URL = `http://${config?.endpoints['ros-backend']?.hostname}:${config?.endpoints['ros-backend']?.port}/api/ros/v1`;
const EXECUTIVE_REPORT_URL = `${BASE_URL}/executive_report`;
const SYSTEMS_URL = `${BASE_URL}/systems`;

const getExecutiveReport = async (headers: AxiosRequestHeaders) => {
  const { data } = await axios.get<{ data: typeof rosExecutiveData }>(
    EXECUTIVE_REPORT_URL,
    {
      headers,
    }
  );
  return { data };
};

const getSystemsReport = async (
  headers: AxiosRequestHeaders,
  { params }: Record<string, any>
) => {
  const defaultParams = {
    order_by: 'report_date',
    order_how: 'desc',
    limit: -1,
    ...params,
  };

  const data = await axios.get(SYSTEMS_URL, {
    headers,
    params: defaultParams,
  });

  return { data };
};

const executiveGetMock: ServiceCallFunction = () =>
  Promise.resolve({ data: rosExecutiveData });
const executiveResponseProcessor = (data: typeof rosExecutiveData) => data;

const systemsGetMock: ServiceCallFunction = () =>
  Promise.resolve({ data: rosSystemsData });
const systemsResponseProcessor = (data: typeof rosSystemsData) => data;

const rosDescriptor: ServiceDescriptor = {
  templates: {
    executiveReport: {
      service: ServiceNames.ros,
      responseProcessor: executiveResponseProcessor,
      path: '/',
      request: getExecutiveReport,
      mock: executiveGetMock,
    },
    systemsReport: {
      service: ServiceNames.ros,
      responseProcessor: systemsResponseProcessor,
      path: '/',
      request: getSystemsReport,
      mock: systemsGetMock,
    },
  },
};

export default rosDescriptor;
