/**
 * @typedef {import('../modelFactory')} ModelFactory
 * @typedef {import('../daoFactory')} DaoFactory
 * @typedef {import('winston').Logger} Logger
 *
 * @typedef {import('../daos/adverts').AdvertData} AdvertData
 */

class AdvertModel {
  /**
   * Creates a new instance of the AdvertModel.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {Logger} Logger - Instance of
   * @param {AdvertData} advertData -
   */
  constructor(ModelFactory, DaoFactory, Logger, advertData) {
    this.ModelFactory = ModelFactory;
    this.DaoFactory = DaoFactory;
    this.Logger = Logger;

    this.id = advertData.id;
    this.status = advertData.status;
    this.jobRef = advertData.jobRef;
    this.jobTitle = advertData.jobTitle;
    this.jobLocation = advertData.jobLocation;
    this.viewEvents = advertData.viewEvents;
    this.applyEvents = advertData.applyEvents;
  }

  static get JSONAPIMapper() {
    return {
      id: 'id',
      type: 'advert',
      attributes: {
        status: 'status',
        'job-ref': 'jobRef',
        'job-title': 'jobTitle',
        'job-location': 'jobLocation',
        'view-events': 'viewEvents',
        'apply-events': 'applyEvents',
      },
    };
  }

  /**
   * Returns all Adverts.
   *
   * @param {ModelFactory} ModelFactory - Instance of
   * @param {DaoFactory} DaoFactory - Instance of
   * @param {Logger} Logger - Instance of
   * @returns {Promise<AdvertModel[]|null>} - Instance of AdvertModel or null
   */
  static async fetchAll(ModelFactory, DaoFactory, Logger) {
    const advertsData = await DaoFactory.advert.fetchAll();
    if (!advertsData) {
      Logger.warn('AdvertDao failed to return');
      return null;
    }

    return advertsData.map(
      (adData) => new AdvertModel(ModelFactory, DaoFactory, Logger, adData)
    );
  }
}

module.exports = AdvertModel;
