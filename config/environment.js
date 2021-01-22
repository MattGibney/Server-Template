/**
 * @typedef {object} Config
 * @property {number} port Port the server should listen on.
 * @property {string} version Version number of the application according to the application package file.
 * @property {('error'|'warn'|'info'|'http'|'verbose'|'debug'|'silly')} loggingLevel Level at which to record events
 */

const packageFile = require('../package.json');

/** @type {Config} */
const ENV = {
  port: 3100,

  version: packageFile.version,

  loggingLevel: 'http',
};

module.exports = ENV;
