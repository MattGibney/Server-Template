/**
 * @typedef {import('../app').CampaignRequest} CampaignRequest
 */

module.exports = {
  /**
   * Responds with the current application version.
   *
   * @openapi
   * /healthcheck:
   *  get:
   *    operationId: healthcheck
   *    description: Provides the health of the application
   *    tags:
   *      - '/healthcheck'
   *    responses:
   *      '200':
   *        description: Version of application
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                version:
   *                  type: 'string'
   *
   * @param {CampaignRequest} req - CampaignRequest
   * @param {any} res -
   * @returns {Promise<any>} -
   */
  async healthcheck(req, res) {
    return await res.status(200).json({ version: req.Config.version });
  },
};
