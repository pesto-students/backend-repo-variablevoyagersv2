const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TranspilePlugin = require('transpile-webpack-plugin');

module.exports = (env) => {
  const isProd = env.mode === 'production';
  const output = isProd
    ? {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
      }
    : {
        path: path.resolve(__dirname, './build'),
      };

  const plugins = [];

  if (!isProd) {
    plugins.push(new TranspilePlugin({ longestCommonDir: './src' }));
  }

  return {
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, './src/app.js'),
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins,
    output,
    stats: {
      colors: true,
    },
    mode: env.mode,
    devtool: isProd ? false : 'source-map',
  };
};
