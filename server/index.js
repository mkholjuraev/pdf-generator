require('ignore-styles');
require('regenerator-runtime');

require('@babel/register')({
  ignore: [/(node_modules)/],
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('./server');
