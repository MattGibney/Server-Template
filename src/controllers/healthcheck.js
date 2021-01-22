/**
 * @typedef {import('../app').CampaignRequest} CampaignRequest
 */

module.exports = {
  /**
   * Responds with the current application version.
   *
   * @param {CampaignRequest} req - CampaignRequest
   * @param {any} res -
   * @returns {Promise<any>} -
   */
  async healthcheck(req, res) {
    return await res.status(200).json({ version: req.Config.version });
  },
};
