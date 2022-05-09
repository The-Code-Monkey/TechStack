const webpack = require("webpack");

module.exports = {
  stories: ['../src/@(atoms|molecules|organisms|primal)/**/story.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  },
  webpackFinal: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true
      })
    );

    return config;
  }
};