module.exports = {
  webpack: {
    configure: webpackConfig => {
      webpackConfig.ignoreWarnings = [{ module: /typescript/ }];
     // webpackConfig.module.rules.forEach((rule) => {
     //   rule.options.transpileOnly = true
     // })

      return webpackConfig;
    }
  }
};
