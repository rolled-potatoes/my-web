const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const makeAliasPath = () => {
  const paths = ['pages', 'components', 'templates'];
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
