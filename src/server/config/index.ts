import ServiceNames from '../data-access/service-names';
import { ClowderEndpoint, Clowder } from './clowder';

export type ServicesEndpoints = {
  [key in ServiceNames]: ClowderEndpoint;
};

const defaultConfig: {
  webPort: number;
  metricsPort: number;
  metricsPath: string;
  endpoints: Partial<ServicesEndpoints>;
} = {
  webPort: 8000,
  metricsPort: 8080,
  metricsPath: '/metrics',
  endpoints: {},
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
    let config = {
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
          endpoints[endpoint.app as ServiceNames] = endpoint;
        });
      }

      config = {
        ...clowderConfig,
        endpoints,
      };
      return config;
    }
  } catch (error) {
    return defaultConfig;
  }
}

const instanceConfig = initializeConfig();

export default instanceConfig;
