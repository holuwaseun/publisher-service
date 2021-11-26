'use strict';

const _exports = require('../utils/exports');

module.exports = _exports({
  pattern: './*.js',
  options: {
    cwd: './src/services',
    exportKey: 'pascal-case',
    append: 'service',
  },
});
