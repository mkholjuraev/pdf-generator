export type ClowderEndpoint = {
  app: string;
  hostname: string;
  name: string;
  port: number;
};

export interface Clowder {
  IsClowderEnabled: () => boolean;

  LoadedConfig: {
    webPort: number;
    metricsPort: number;
    metricsPath: string;
    endpoints: ClowderEndpoint[];
  };
}
