const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  webpack: config => {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc;
    }, {});

    config.plugins.push(new webpack.DefinePlugin(env));

    return config;
  }
};

// const withCSS = require('@zeit/next-css')

// module.exports = withCSS({
//   webpack: function (config) {
//     config.module.rules.push({
//       test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
//       use: {
//         loader: 'url-loader',
//         options: {
//           limit: 100000,
//           name: '[name].[ext]'
//         }
//       }
//     })
//     return config
//   }
// })