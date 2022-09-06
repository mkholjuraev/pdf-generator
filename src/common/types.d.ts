import ServiceNames from './service-names';
import config from './config';

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
    // extra options for puppetter requests
    [config.OPTIONS_HEADER_NAME]?: string;
    // identity ehaders
    [config.IDENTITY_HEADER_KEY]: string;
  }
}
