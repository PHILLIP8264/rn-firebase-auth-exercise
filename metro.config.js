const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...config.resolver.alias,
  "@react-native-async-storage/async-storage": require.resolve(
    "@react-native-async-storage/async-storage"
  ),
};

config.resolver.platforms = ["ios", "android", "native", "web"];

module.exports = config;
