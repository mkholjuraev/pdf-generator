import ServiceNames from './service-names';

export type PreviewReqBody = {
  orientation?: string;
};

export type PreviewReqQuery = {
  orientation?: string;
  template: string;
  service: ServiceNames;
};
