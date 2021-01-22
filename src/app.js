/**
 * @typedef {import('../config/environment')} Config
 */

/**
 * @typedef {object} _CampaignRequest
 * @property {string} id UUIDv4
 * @property {Config} Config
 * @property {import('winston').Logger} Logger
 */

/**
 * @typedef {import('express').Request & _CampaignRequest} CampaignRequest
 */

module.exports = (Config) => {
  const express = require('express');
  const winston = require('winston');
  const expressWinston = require('express-winston');
  const { v4: uuidv4 } = require('uuid');

  const apiRouter = require('./router');

  const app = express();

  const logger = winston.createLogger({
    level: Config.loggingLevel,
    format: winston.format.json(),
    transports: [new winston.transports.Console({})],
  });

  app.use(
    /**
     * Adds resources to the request object.
     *
     * @param {CampaignRequest} req -
     * @param {*} res -
     * @param {*} next -
     */
    (req, res, next) => {
      const requestId = uuidv4();
      req.id = requestId;

      req.Config = Config;
      req.Logger = logger.child({ requestId: requestId });

      res.setHeader('X-Request-ID', requestId);
      next();
    }
  );

  app.use(
    /**
     * Add request logging.
     *
     * @param {CampaignRequest} req - USRequest
     * @param {*} res -
     * @param {import('express').NextFunction} next - Express Next object
     */
    (req, res, next) => {
      expressWinston.logger({
        winstonInstance: req.Logger,
        meta: false,
        metaField: null, // Not storing any meta information. This hides the field
        msg: 'HTTP {{req.method}} {{req.url}}',
        level: 'http',
      })(req, res, next);
    }
  );

  app.use(apiRouter);

  return app;
};