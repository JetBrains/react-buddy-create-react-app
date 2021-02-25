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
    const pathToReactDevtoolsScript = require.resolve(
      '@haulmont/react-ide-devtools'
    );
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
