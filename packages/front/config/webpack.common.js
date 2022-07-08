const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const makeAliasPath = () => {
  const paths = [
    'pages',
    'apis',
    'components',
    'templates',
    'icons',
    'constants',
  ];
  return paths.reduce((obj, p) => {
    obj[p] = path.join(__dirname, '../src/', p + '/');
    return obj;
  }, {});
};
const alias = makeAliasPath();

module.exports = {
  entry: `${path.resolve(__dirname, '../src')}/index.jsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                exportGlobals: true,
                localIdentName: '[path]__[local]--[hash:base64:5]',
                localIdentContext: path.resolve(__dirname, '../src'),
                localIdentHashSalt: 'my-custom-hash',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, '../public')}/index.html`,
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  resolve: {
    alias,
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
  },
};
