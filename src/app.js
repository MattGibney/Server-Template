/**
 * @typedef {object} _CampaignRequest
 * @property {string} id UUIDv4
 * @property {import('../config/environment')} Config
 * @property {import('winston').Logger} Logger
 * @property {import('./modelFactory')} ModelFactory
 * @property {import('./daoFactory')} DaoFactory
 */

/**
 * @typedef {import('express').Request & _CampaignRequest} CampaignRequest
 */
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const ModelFactory = require('./modelFactory');
const DaoFactory = require('./daoFactory');
const apiRouter = require('./router');

/**
 * Application.
 *
 * @param {import('../config/environment')} Config -
 * @param {import('./daoFactory')} [daoFactory] -
 * @returns {express.Application} -
 */
module.exports = (Config, daoFactory = null) => {
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
      req.ModelFactory = ModelFactory;
      req.DaoFactory = daoFactory ? daoFactory : new DaoFactory();
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

  app.use(
    cors({
      origin(origin, callback) {
        if (
          Config.corsOriginWhitelist.indexOf(origin) !== -1 ||
          origin === undefined
        ) {
          callback(null, true);
        } else {
          callback({ message: 'CORS request from untrusted origin' });
        }
      },
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

  app.use(apiRouter);

  app.use(
    /**
     * Error Handler.
     *
     * @param {Error} err Error
     * @param {CampaignRequest} req Request Object
     * @param {*} res Response Object
     * @param {*} next Next Object
     */
    // eslint-disable-next-line no-unused-vars
    (err, req, res, next) => {
      res.status(500).json({ error: err.message });
    }
  );

  return app;
};
