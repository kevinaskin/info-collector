'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519353401699_2970';

  // add your config here
  config.middleware = [ 'errorHandler' ];

  config.security = {
    domainWhiteList: [ '' ],
    csrf: {
      ignoreJSON: true,
    },
  };

  config.session = {
    key: 'MINUS_SESS',
  };

  config.mongoose = {
    url: 'mongodb://127.0.0.1/infoCollector',
    options: {},
  };

  return config;
};
