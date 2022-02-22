var path = require('path');
global.appRoot = path.resolve(__dirname);

export const replaceString = (string) => {
  return string.replace(/[-[\]{}()'`*+?.,\\^$|#]/g, '\\$&');
};
