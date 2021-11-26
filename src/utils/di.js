'use strict';

const serviceLocator = require('./service-locator');
const logger = require('./log-client');
const validator = require('./validator');
const config = require('./config');
const router = require('./router');
const store = require('./store');
const responseHandler = require('./response-handler');
const errorClass = require('./custom-error');
const errorFormatterFn = require('./error-handler');
const validationSchema = require('./validation-schema');
const redis = require('./redis-client');
const http = require('./http-client');
const docs = require('./docs');

const express = require('express');
const joi = require('joi');

const controllers = require('../controllers');
const routes = require('../routes');
const services = require('../services');
const validations = require('../validations');

serviceLocator.registerSingleton({
  tag: 'express',
  handler: () => express,
});

serviceLocator.registerSingleton({
  tag: 'joi',
  handler: () => joi,
});

serviceLocator.registerSingleton({
  tag: 'httpClient',
  handler: http,
});

serviceLocator.registerValue({
  tag: 'services',
  handler: Object.keys(services).map((key) => key),
});

serviceLocator.registerValue({
  tag: 'errorClass',
  handler: errorClass,
});

serviceLocator.registerSingleton({
  tag: 'errorFormatterFn',
  handler: errorFormatterFn,
});

serviceLocator.registerSingleton({
  tag: 'responseHandler',
  handler: responseHandler,
});

serviceLocator.registerValue({
  tag: 'store',
  handler: store,
});

serviceLocator.registerValue({
  tag: 'config',
  handler: config,
});

Object.keys(validations).map((key) => serviceLocator.registerSingleton({
  tag: key,
  handler: validations[key],
}));

serviceLocator.registerSingleton({
  tag: 'validationSchema',
  handler: validationSchema,
});

serviceLocator.registerSingleton({
  tag: 'logger',
  handler: () => logger({
    name: 'logger',
    logToFile: true,
    fileLogLevel: 'debug',
  }),
});

serviceLocator.registerSingleton({
  tag: 'validator',
  handler: validator,
});

serviceLocator.registerSingleton({
  tag: 'redis',
  handler: redis,
});

serviceLocator.registerSingleton({
  tag: 'docs',
  handler: docs,
});

Object.keys(services).map((key) => serviceLocator.registerSingleton({
  tag: key,
  handler: services[key],
}));

Object.keys(controllers).map((key) => serviceLocator.registerSingleton({
  tag: key,
  handler: controllers[key],
}));

Object.keys(routes).map((key) => serviceLocator.registerSingleton({
  tag: key,
  handler: routes[key],
}));

serviceLocator.registerSingleton({
  tag: 'router',
  handler: router,
});

module.exports = serviceLocator.instance;
