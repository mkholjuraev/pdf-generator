import { ServiceCallFunction, ServiceDescriptor } from '../call-service';
import ServiceNames from '../service-names';

const demoData = {
  title: 'Foo',
  description: 'bar',
};

const getMock: ServiceCallFunction = () => Promise.resolve(demoData);
const responseProcessor = (data: typeof demoData) => data;

const demoDescriptor: ServiceDescriptor = {
  templates: {
    demo: {
      service: ServiceNames.demo,
      path: '/',
      mock: getMock,
      responseProcessor,
    },
  },
};

export default demoDescriptor;
