const webpack = require("webpack");
const path = require('path');

module.exports = {
  stories: ['../src/@(atoms|molecules|organisms|primal)/**/story.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions', "storybook-addon-pseudo-states"],
  features: {
    interactionsDebugger: true, // 👈 Enable playback controls
  },
  babel: async (options) => {
    return {
      ...options,
      presets: [...options.presets, '@babel/preset-react'],
    };
  },
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  // typescript: {
  //   check: true, // type-check stories during Storybook build
  // },
  webpackFinal: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        SC_DISABLE_SPEEDY: true
      })
    );

    config.plugins.push(
      new webpack.ProvidePlugin({
        "React": "react",
      }),
    )

    config.module.rules.push({
      test: /.storybook\/preview.js/,
      resolve: { fullySpecified: false },
    })

    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../')
    })

    return config;
  },
  core: {
    builder: 'webpack5',
  },
  framework: 'react'
};