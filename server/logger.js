import { createLogger, format, transports } from 'winston';
import CloudWatchTransport from 'winston-aws-cloudwatch';
import fs from 'fs';

const clowderConfigJson = process.env.ACG_CONFIG;

const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ message, label, timestamp }) => {
  return `${timestamp} [${label}]: ${message}`;
});

let logger = createLogger({
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
      logger = createLogger({
        format: combine(
          label({ label: 'PDF API Server' }),
          timestamp(),
          myFormat
        ),
        transports: [
            new transports.Console(),
            new CloudWatchTransport({
              logGroupName: clowderConfig.logging.cloudwatch.logGroup,
              logStreamName: namespace,
              createLogGroup: true,
              createLogStream: true,
              submissionInterval: 2000,
              submissionRetryCount: 1,
              batchSize: 20,
              awsConfig: {
                accessKeyId: clowderConfig.logging.cloudwatch.accessKeyId,
                secretAccessKey: clowderConfig.logging.cloudwatch.secretAccessKey,
                region: clowderConfig.logging.cloudwatch.region
              },
              formatLog: item =>
                `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
            })
          ]
      })
  }
}

export default logger;
