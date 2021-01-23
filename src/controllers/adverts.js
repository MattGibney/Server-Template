const jsonAPI = require('@moppler/jsonapi');

/**
 * @typedef {import('../app').CampaignRequest} CampaignRequest
 */

module.exports = {
  /**
   * Responds with an array of all adverts.
   *
   * @param {CampaignRequest} req - CampaignRequest
   * @param {any} res -
   * @returns {Promise<any>} -
   */
  async fetchAll(req, res) {
    const adverts = await req.ModelFactory.advert.fetchAll(
      req.ModelFactory,
      req.DaoFactory,
      req.Logger
    );
    return await res
      .status(200)
      .json(jsonAPI.serialise(req.ModelFactory.advert.JSONAPIMapper, adverts));
  },
};
