const path = require("path");

module.exports = {
  stories: ['../src/packages/@(atoms|molecules|organisms|primatives)/**/story.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  }
};