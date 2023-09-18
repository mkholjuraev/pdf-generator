import httpContext from 'express-http-context';
import type { Handler } from 'express';
import { apiLogger } from '../common/logging';

import config from '../common/config';

const identityMiddleware: Handler = (req, _res, next) => {
  try {
    const rhIdentity = req.headers[config?.IDENTITY_HEADER_KEY as string];
    if (rhIdentity) {
      const identityObject = JSON.parse(
        Buffer.from(rhIdentity as string, 'base64').toString()
      );
      apiLogger.debug(JSON.stringify(identityObject));
      // We are using ACCOUNT_ID here because it maps to that in the console shape
      // From the API token, the field matches the user.user_id field
      const accountID = identityObject?.identity?.user?.user_id;
      httpContext.set(config?.IDENTITY_HEADER_KEY as string, rhIdentity);
      httpContext.set(config?.IDENTITY_CONTEXT_KEY as string, identityObject);
      httpContext.set(config?.ACCOUNT_ID as string, accountID);
    }
    next();
  } catch (error) {
    apiLogger.error(error);
    next();
  }
};

export default identityMiddleware;
