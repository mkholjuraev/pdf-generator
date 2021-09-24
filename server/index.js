require('ignore-styles');
require('regenerator-runtime');

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('./server');
