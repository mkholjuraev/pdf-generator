import { createLogger, format, transports } from 'winston';
import { CloudWatchTransport } from 'winston-aws-cloudwatch';
import fs from 'fs';

const clowderConfigJson = process.env.ACG_CONFIG;

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ message, label, timestamp }) => {
  return `${timestamp} [${label}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'PDF API Server' }),
    timestamp(),
    myFormat
  ),
  transports: [new transports.Console()]
});

if (clowderConfigJson) {
  const clowderConfig = JSON.parse(fs.readFileSync(clowderConfigJson));

  if (clowderConfig.logging.cloudwatch.accessKeyId &&
      clowderConfig.logging.cloudwatch.secretAccessKey &&
      clowderConfig.logging.cloudwatch.region) {
      const namespace = fs.readFileSync("/var/run/secrets/kubernetes.io/serviceaccount/namespace").toString().trim();
      const config = {
        logGroupName: clowderConfig.logging.cloudwatch.logGroup,
        logStreamName: namespace,
        createLogGroup: false,
        createLogStream: true,
        awsConfig: {
          accessKeyId: clowderConfig.logging.cloudwatch.accessKeyId,
          secretAccessKey: clowderConfig.logging.cloudwatch.secretAccessKey,
          region: clowderConfig.logging.cloudwatch.region
        },
        formatLog: function (item) {
          return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
        }
      }
      logger.configure(CloudWatchTransport, config);
  }
}

logger.level = process.env.LOG_LEVEL || "info";

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

export default logger;
