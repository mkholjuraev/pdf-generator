import ServiceNames from './service-names';
import { ClowderEndpoint, Clowder } from './clowder';

export type ServicesEndpoints = Omit<
  {
    [key in ServiceNames]: ClowderEndpoint;
  } & { 'advisor-backend': ClowderEndpoint; 'ros-backend': ClowderEndpoint },
  'advisor' | 'ros'
>;

const defaultConfig: {
  webPort: number;
  metricsPort: number;
  metricsPath: string;
  endpoints: Partial<ServicesEndpoints>;
  APIPrefix: string;
  IS_PRODUCTION: boolean;
  IS_DEVELOPMENT: boolean;
  OPTIONS_HEADER_NAME: 'x-pdf-gen-options';
  IDENTITY_CONTEXT_KEY: 'identity';
  IDENTITY_HEADER_KEY: 'x-rh-identity';
} = {
  webPort: 8000,
  metricsPort: 8080,
  metricsPath: '/metrics',
  endpoints: {},
  APIPrefix: '/api/crc-pdf-generator/v1',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  OPTIONS_HEADER_NAME: 'x-pdf-gen-options',
  IDENTITY_CONTEXT_KEY: 'identity',
  IDENTITY_HEADER_KEY: 'x-rh-identity',
};

/**
 * 
 * endpoints: [
    {
      app: 'crc-pdf-generator',
      hostname: 'crc-pdf-generator-api.ephemeral-twdkua.svc',
      name: 'api',
      port: 8000
    },
    {
      app: 'compliance',
      hostname: 'compliance-service.ephemeral-twdkua.svc',
      name: 'service',
      port: 8000
    }
  ],
 */

function initializeConfig() {
  let isClowderEnabled = false;
  const endpoints: Partial<ServicesEndpoints> = {};
  try {
    let config: typeof defaultConfig = {
      ...defaultConfig,
    };
    /**
     * Has to be loaded like this because it crashes in dev enviroment because it does not have some files on filesystem
     * TODO: Open issue over at https://github.com/RedHatInsights/app-common-js
     */
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const clowder: Clowder = require('app-common-js');
    isClowderEnabled = clowder.IsClowderEnabled();
    if (isClowderEnabled) {
      const clowderConfig = clowder.LoadedConfig;
      if (clowderConfig.endpoints) {
        clowderConfig.endpoints.forEach((endpoint) => {
          endpoints[endpoint.app as keyof ServicesEndpoints] = endpoint;
        });
      }

      config = {
        ...defaultConfig,
        ...clowderConfig,
        endpoints,
      };
      return config;
    }
  } catch (error) {
    return defaultConfig;
  }
}

const instanceConfig: typeof defaultConfig = initializeConfig();

export default instanceConfig;
