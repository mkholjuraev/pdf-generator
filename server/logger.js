import { createLogger, format, transports } from 'winston';

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

export default logger;
