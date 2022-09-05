import { toMatchImageSnapshot } from 'jest-image-snapshot';
global.SEVER_HOST = 'http://localhost:8000';
expect.extend({ toMatchImageSnapshot });
