const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const makeAliasPath = () => {
  const paths = ['pages', 'components', 'templates','icons', 'constants'];
  return paths.reduce((obj, p) => {
    obj[p] = path.join(__dirname, 'src', p);
    return obj;
  }, {});
};

const alias = makeAliasPath();

module.exports = {
  mode: process.env.NODE_ENV ?? 'development',

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.scss', '.jsx'],
    alias,
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.bundle.js',
  },

  devServer: {
    port: 3000,
    liveReload: true,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader',
        },
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
                localIdentContext: path.resolve(__dirname, 'src'),
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
      template: './public/index.html',
    }),
  ],
};
