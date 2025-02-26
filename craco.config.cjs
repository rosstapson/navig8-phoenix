module.exports = {
  typescript: {
    // Visual Studio Code does type checking, so CRA doesn't need to:
    enableTypeChecking: false
  },
  webpack: {
    configure: config => {
      config.ignoreWarnings = [{ module: /typescript/ }];
      config.module.rules.forEach((rule) => {
       console.log(rule)
     })
     config.cache.type = "filesystem"
     config.plugins
        .filter((plugin) => plugin.constructor.name === 'ForkTsCheckerWebpackPlugin')
        .forEach((plugin) => {
            plugin.options.memoryLimit = plugin.memoryLimit = 4096;
        });

      return config;
    }
  }
};
