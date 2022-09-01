import ServiceNames from '../service-names';
import { ServiceCallFunction } from '../call-service';
import { complianceData } from './complianceData';

const getMock: ServiceCallFunction = () => Promise.resolve(complianceData);
const responseProcessor = (data: typeof complianceData) => data;

const complianceDescriptor = {
  responseProcessor,
  path: '/api/compliance/v1/status',
  options: {
    method: 'get',
  },
  service: ServiceNames.compliance,
  mock: getMock,
};

export default complianceDescriptor;
