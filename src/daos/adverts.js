/**
 * @typedef {object} AdvertData
 * @property {number} id
 * @property {('boosting')} status
 * @property {string} jobRef
 * @property {string} jobTitle
 * @property {string} jobLocation
 * @property {number} viewEvents
 * @property {number} applyEvents
 */

/** @type {AdvertData[]} */
const mockAdverts = [
  {
    id: 1,
    status: 'boosting',
    jobRef: 'accman001',
    jobTitle: 'Account Manager',
    jobLocation: 'London, England',
    viewEvents: 100,
    applyEvents: 15,
  },
];

class AdvertDao {
  /**
   * Returns all Adverts.
   *
   * @returns {Promise<AdvertData[]>} - Array of advert data
   */
  async fetchAll() {
    return await mockAdverts;
  }
}

module.exports = AdvertDao;
