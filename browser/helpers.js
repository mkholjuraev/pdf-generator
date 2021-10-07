var fs = require('fs');
var path = require('path');
global.appRoot = path.resolve(__dirname);

const base64Encode = (file) => {
  return fs.readFileSync(file, { encoding: 'base64' });
}

export const getImg = (imgPath) => 
  `<img style="height: 1cm; margin: 0.5cm;"
    src="data:image/svg+xml;base64,${base64Encode(path.resolve(__dirname, imgPath))}"
  />`;
