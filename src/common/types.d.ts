import ServiceNames from './service-names';

export type PreviewReqBody = {
  orientation?: string;
};

export type PreviewReqQuery = {
  orientation?: string;
  template: string;
  service: ServiceNames;
};

declare module 'http' {
  // globaly declare custom headers
  interface IncomingHttpHeaders {
    'x-pdf-gen-options'?: string;
  }
}
