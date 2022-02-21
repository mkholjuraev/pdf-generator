const { DefinePlugin } = require('webpack');
const {
  createJoinFunction,
  createJoinImplementation,
  asGenerator,
  defaultJoinGenerator,
} = require('resolve-url-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const searchIgnoredStyles = require('./search-ignored-styles');

// call default generator then pair different variations of uri with each base
const myGenerator = asGenerator((item, ...rest) => {
  const defaultTuples = [...defaultJoinGenerator(item, ...rest)];
  if (item.uri.includes('./assets')) {
    return defaultTuples.map(([base]) => {
      if (base.includes('@patternfly/patternfly')) {
        return [
          base,
          path.relative(
            base,
            path.resolve(
              __dirname,
              '../node_modules/@patternfly/patternfly',
              item.uri
            )
          ),
        ];
      }
    });
  }
  return defaultTuples;
});

const baseConfig = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
    alias: {
      ...searchIgnoredStyles(path.resolve(__dirname, '../')),
    },
  },
};

const stylesConfig = {
  mode: 'production',
  name: 'styles',
  entry: path.resolve(__dirname, '../styles/styles.scss'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'styles.css',
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              join: createJoinFunction(
                'myJoinFn',
                createJoinImplementation(myGenerator)
              ),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};

const serverConfig = {
  devtool: 'eval-source-map',
  name: 'server',
  target: 'node',
  externalsPresets: {
    node: true,
  },
  ignoreWarnings: [
    {
      /*
       * Express compilation issue:
       * WARNING in ../node_modules/express/lib/view.js 81:13-25 Critical dependency: the request of a dependency is an expression
       * more at: https://github.com/webpack/webpack/issues/1576
       */
      module: /express/,
      message:
        /Critical\sdependency:\sthe\srequest\sof\sa\sdependency\sis\san\sexpression/,
    },
  ],
  entry: path.resolve(__dirname, '../server/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    publicPath: './', // file-loader prepends publicPath to the emited url. without this, react will complain about server and client mismatch
  },
  module: {
    rules: [
      { test: /\.(js|tsx?)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.s?[ac]ss$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        // file-loader config must match client's (except 'emitFile' property)
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[contenthash].[ext]',
            emitFile: false,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['!public/**'],
    }),
    new DefinePlugin({
      __Server__: JSON.stringify(true),
    }),
  ],
};

const babelConfig = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};

// eslint-disable-next-line no-unused-vars
const clientConfig = {
  name: 'client',
  target: 'web',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  entry: {
    index: path.resolve(__dirname, '../templates/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist', 'public'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: babelConfig },
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images',
            name: '[name].[contenthash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'resources/favicon.ico' }],
    }),
    new DefinePlugin({
      __SERVER__: JSON.stringify(false),
    }),
  ],
};

// const clConfig = merge(baseConfig, clientConfig);
const srConfig = merge(baseConfig, serverConfig);

module.exports = [srConfig, stylesConfig];
