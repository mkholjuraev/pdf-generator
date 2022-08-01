const defaultConfig = {
  webPort: 8000,
  metricsPort: 8080,
  metricsPath: '/metrics',
  COMPLIANCE_URL: '',
};

function initializeConfig() {
  let isClowderEnabled = false;
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

      config = {
        ...clowderConfig,
        COMPLIANCE_URL: process.env.COMPLIANCE_API_URL,
      };
      return config;
    }
  } catch (error) {
    return defaultConfig;
  }
}

const instanceConfig = initializeConfig();

export default instanceConfig;
