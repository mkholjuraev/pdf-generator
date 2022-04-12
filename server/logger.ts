import morgan from 'morgan';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const logger = morgan(
  process.env.NODE_ENV === 'production' ? 'combined' : 'dev'
);

export default logger;
