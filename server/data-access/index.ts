import { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { IncomingHttpHeaders } from 'http';
// import * as getAutomationAnalyticsDescriptor from './automation-analytics';
import prepareServiceCall, { ServiceCallFunction } from './call-service';
import demoDescriptor from './demoDescriptor';
import complianceDescriptor from './complianceDescriptor';
import ServiceNames from './service-names';

const templateMapper: {
  [key in ServiceNames]: ServiceCallFunction;
} = {
  // 'automation-analytics': prepareServiceCall(getAutomationAnalyticsDescriptor),
  [ServiceNames.demo]: prepareServiceCall(demoDescriptor),
  [ServiceNames.compliance]: prepareServiceCall(complianceDescriptor),
};

async function getTemplateData(
  headers: IncomingHttpHeaders,
  template: ServiceNames,
  options?: Omit<AxiosRequestConfig, 'headers'>
): Promise<unknown> {
  const dataAccessor = templateMapper[template];

  if (typeof dataAccessor === 'function') {
    const data = await dataAccessor(headers as AxiosRequestHeaders, options);
    return data;
  } else {
    throw new Error(`Not API descriptor avaiable for ${template}!`);
  }
}

export default getTemplateData;
