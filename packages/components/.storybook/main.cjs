const webpack = require("webpack");

module.exports = {
  stories: ['../src/@(atoms|molecules|organisms|primal)/**/story.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
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

    return config;
  },
  core: {
    builder: 'webpack5',
  },
  framework: 'react'
};