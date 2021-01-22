/**
 * @typedef {object} Config
 * @property {number} port Port the server should listen on.
 * @property {string} version Version number of the application according to the application package file.
 * @property {('error'|'warn'|'info'|'http'|'verbose'|'debug'|'silly')} loggingLevel Level at which to record events
 * @property {string[]} corsOriginWhitelist Array of valid cors origins
 */

const packageFile = require('../package.json');

/** @type {Config} */
const ENV = {
  port: 3100,

  version: packageFile.version,

  loggingLevel: 'http',

  corsOriginWhitelist: ['http://localhost:4200'],
};

module.exports = ENV;
