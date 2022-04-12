declare interface Clowder {
  IsClowderEnabled: () => boolean;
  LoadedConfig: {
    webPort: number;
    metricsPort: number;
    metricsPath: string;
  };
}
