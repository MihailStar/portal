import TerserPlugin from 'terser-webpack-plugin';
import { isDevelopment } from './gulp/configuration';

const development = {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  output: {
    filename: 'main.min.js',
  },
};

const production = {
  mode: 'production',
  module: {
    rules: [
      {
        exclude: /(dist|node_modules)/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /(dist|node_modules)/,
        test: /\.js$/,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  output: {
    filename: 'main.min.js',
  },
};

export default (isDevelopment ? development : production);
