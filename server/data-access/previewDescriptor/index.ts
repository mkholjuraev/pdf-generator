import { ServiceCallFunction } from '../call-service';
import ServiceNames from '../service-names';

const previewData = {
  template: 'demo',
};

const getMock: ServiceCallFunction = () => Promise.resolve(previewData);
const responseProcessor = (data: typeof previewData) => data;

const previewDescriptor = {
  responseProcessor,
  path: '/',
  service: ServiceNames.preview,
  mock: getMock,
};

export default previewDescriptor;
