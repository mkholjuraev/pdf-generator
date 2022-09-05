import axios, { AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import ServiceNames from '../../common/service-names';
import config from '../../common/config';
import { IS_DEVELOPMENT } from '../../common/consts';

export type APIDescriptor<T = any, R = unknown> = {
  service: ServiceNames;
  path: string;
  responseProcessor: (...args: any[]) => R;
  mock: (...args: any[]) => Promise<T>;
  request?: (
    headers: AxiosRequestHeaders,
    options: Record<string, any>
  ) => Promise<R>;
};

export type ServiceDescriptor = {
  templates: {
    [key: string]: APIDescriptor;
  };
};

export type ServiceCallFunction = (
  headers: AxiosRequestHeaders,
  options: Omit<AxiosRequestConfig, 'headers'>
) => Promise<unknown>;

function prepareServiceCall<T = Record<string, unknown>>(
  descriptor: APIDescriptor<T>
): ServiceCallFunction {
  // skip all and return mocked data
  if (IS_DEVELOPMENT && descriptor.mock) {
    return () => Promise.resolve(descriptor.mock());
  }
  const { service, path, responseProcessor, request } = descriptor;
  const serviceConfig = config.endpoints[service];
  if (!IS_DEVELOPMENT && !serviceConfig) {
    return () =>
      Promise.reject(`Trying to reach unusupported service ${service}!`);
  }

  if (request) {
    return (headers, options) => {
      return request(headers, options).catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
    };
  }
  const URL = `http://${serviceConfig?.hostname}:${serviceConfig?.port}${path}`;
  return async (headers, options) => {
    let data;
    try {
      data = await axios.get(URL, { ...options, headers });
    } catch (error) {
      console.log('Unable to get report data: ', error);
      return Promise.reject(error);
    }
    return responseProcessor(data);
  };
}

export default prepareServiceCall;
