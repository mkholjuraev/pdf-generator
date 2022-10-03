import httpContext from 'express-http-context';
import type { Handler } from 'express';

import config from '../common/config';

const identityMiddleware: Handler = (req, _res, next) => {
  try {
    const rhIdentity = req.headers[config?.IDENTITY_HEADER_KEY as string];
    if (rhIdentity) {
      const identityObject = JSON.parse(
        Buffer.from(rhIdentity, 'base64').toString()
      );
      httpContext.set(config?.IDENTITY_HEADER_KEY as string, rhIdentity);
      httpContext.set(config?.IDENTITY_CONTEXT_KEY as string, identityObject);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default identityMiddleware;
