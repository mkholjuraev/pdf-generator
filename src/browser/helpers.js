var path = require('path');
global.appRoot = path.resolve(__dirname);

export const replaceString = (string) => {
  return string.replace(/[-[\]{}()'`*+?.,\\^$|#]/g, '\\$&');
};

export const processOrientationOption = (request) => {
  let orientationOption = '';
  if (request.query?.orientation) {
    orientationOption = request.query?.orientation;
  } else if (request.body?.orientation) {
    orientationOption = request.body?.orientation;
  }

  return orientationOption === 'landscape' ? true : false;
};
