module.exports = {
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: './',
        alias: require('./tsconfig.json').compilerOptions.paths,
      },
    ],
  ],
};
