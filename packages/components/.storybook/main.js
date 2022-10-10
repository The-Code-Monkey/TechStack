const webpack = require("webpack");

module.exports = {
  stories: ['../src/@(atoms|molecules|organisms|primal)/**/story.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  plugins: [require('postcss-flexbugs-fixes'), require('autoprefixer')({
    flexbox: 'no-2009'
  })],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true // type-check stories during Storybook build
  },
  core: {
    builder: "webpack5"
  },
  framework: '@storybook/react'
};