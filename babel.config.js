module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          components: './src/components',
          screens: './src/screens',
          constants: './src/constants',
          store: './src/store',
        },
      },
    ],
  ],
};
