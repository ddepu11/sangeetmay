const { merge } = require('webpack-merge');
const commonWebpackFile = require('./webpack.common');

module.exports = (envVars) => {
  const { env } = envVars;

  const choosenWEbpackFile = require(`./webpack.${env}.js`);

  return merge(commonWebpackFile, choosenWEbpackFile);
};
