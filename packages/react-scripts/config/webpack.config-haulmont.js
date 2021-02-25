const { join } = require('path');
const webpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevMode = process.env.IS_DEVMODE === 'true';

module.exports = function (webpackEnv) {
  const craConfig = webpackConfig(webpackEnv);
  const { plugins } = craConfig;
  const [htmlWebpackPlugin] = plugins;

  htmlWebpackPlugin.options.isDevMode = isDevMode;

  if (isDevMode) {
    const pathToReactDevtools = join(
      '@haulmont',
      'react-ide-devtools',
      'dist',
      'devtools-no-server.js'
    );
    const pathToReactDevtoolsScript = require.resolve(pathToReactDevtools);

    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: pathToReactDevtoolsScript,
            to: 'static/js',
          },
        ],
      })
    );
  }

  return craConfig;
};
