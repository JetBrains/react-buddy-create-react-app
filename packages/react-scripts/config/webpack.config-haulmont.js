const webpackConfig = require('./webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const less = require('less');
const path = require('path');
const fs = require('fs');
const os = require('os');
const isReactIdeDevmode = process.env.REACT_APP_IDE_DEVMODE === 'true';

module.exports = function (webpackEnv) {
  const craConfig = webpackConfig(webpackEnv);
  const { plugins } = craConfig;
  const [htmlWebpackPlugin] = plugins;
  htmlWebpackPlugin.options.isReactIdeDevmode = isReactIdeDevmode;

  if (isReactIdeDevmode) {
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

  generateCssAntdThemes('src/themes/antd-themes', plugins);

  return craConfig;
};

function getLessFiles(pathToAntdLessThemes) {
  const lessExtRegex = /\.less$/;
  return fs
    .readdirSync(pathToAntdLessThemes)
    .filter(fileName => {
      return lessExtRegex.test(fileName);
    })
    .map(lessFileName => {
      return {
        filePath: path.join(pathToAntdLessThemes, lessFileName),
        fileName: path.parse(lessFileName).name,
      };
    });
}

function createTmpDir(baseName) {
  return fs.mkdtempSync(path.join(os.tmpdir(), baseName));
}

function writeCss(dir, filename, cssContent) {
  fs.writeFileSync(path.join(dir, `${filename}.css`), cssContent);
}

function compileLess(lessFileContent, targetDir, themeFileName) {
  less.render(
    lessFileContent,
    { compress: true, javascriptEnabled: true },
    (lessError, { css }) => {
      if (lessError) {
        throw lessError;
      }
      writeCss(targetDir, themeFileName, css);
    }
  );
}

function setupPluginsToUseAntdThemes(antdThemesDir, plugins, isSuccessCompile) {
  if (isSuccessCompile) {
    const [htmlWebpackPlugin] = plugins;
    htmlWebpackPlugin.options.hasAntdThemes = true;
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: antdThemesDir,
            to: 'static/css',
          },
        ],
      })
    );
  }
}

function generateCssAntdThemes(srcThemesDir, plugins) {
  try {
    const pathToAntdLessThemes = path.resolve(srcThemesDir);
    if (fs.existsSync(pathToAntdLessThemes)) {
      const {
        antdLessThemesFiles,
        compiledThemesDir,
        isSuccessCompile,
      } = compileGeneralAntdLessThemes(pathToAntdLessThemes);
      const pathToAntdLessSizes = path.join(pathToAntdLessThemes, '/sizes');
      compileSizesAntdLessThemes(
        pathToAntdLessSizes,
        antdLessThemesFiles,
        compiledThemesDir
      );
      setupPluginsToUseAntdThemes(compiledThemesDir, plugins, isSuccessCompile);
    }
  } catch (error) {
    throw error;
  }
}

function compileGeneralAntdLessThemes(pathToAntdLessThemes) {
  const antdLessThemesFiles = getLessFiles(pathToAntdLessThemes);
  const tmpAntdThemesDir = createTmpDir('antd-themes');
  let isSuccessCompile = false;
  if (antdLessThemesFiles.length > 0) {
    antdLessThemesFiles.forEach(({ filePath, fileName }) => {
      const lessFileContent = fs.readFileSync(filePath);
      compileLess(lessFileContent.toString(), tmpAntdThemesDir, fileName);
    });
    isSuccessCompile = true;
  }
  return {
    antdLessThemesFiles,
    compiledThemesDir: tmpAntdThemesDir,
    isSuccessCompile,
  };
}

function compileSizesAntdLessThemes(
  pathToAntdLessSizes,
  antdLessThemesFiles,
  compiledThemesDir
) {
  if (fs.existsSync(pathToAntdLessSizes)) {
    const antdLessSizesFiles = getLessFiles(pathToAntdLessSizes);
    const shouldCompileSizesThemes =
      antdLessSizesFiles.length > 0 && antdLessThemesFiles.length > 0;

    if (shouldCompileSizesThemes) {
      antdLessSizesFiles.forEach(
        ({ filePath: sizeFilePath, fileName: sizeFileName }) => {
          const lessSizeFileContent = fs.readFileSync(sizeFilePath);

          antdLessThemesFiles.forEach(
            ({ filePath: themeFilePath, fileName: themeFileName }) => {
              const lessThemeFileContent = fs.readFileSync(themeFilePath);
              const resultLessContent =
                lessThemeFileContent.toString() +
                lessSizeFileContent.toString();
              compileLess(
                resultLessContent,
                compiledThemesDir,
                `${themeFileName}-${sizeFileName}`
              );
            }
          );
        }
      );
    }
  }
}
