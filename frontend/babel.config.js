// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(false)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          verbose: false,
          moduleName: '@env',
        },
      ],
    ],
  }
}
