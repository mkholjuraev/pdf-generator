import WP from 'workerpool';
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const pool = WP.pool('./dist/puppeteerWorker.js', {
  maxWorkers: 4,
  workerType: 'thread',
});

export default pool;
